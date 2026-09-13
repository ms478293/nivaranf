import { DatabaseSync } from "node:sqlite";
import { mkdirSync, chmodSync } from "node:fs";
import { join } from "node:path";
import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

// Durable payment journal. Never retry an uncertain charge automatically.
// Tokens, donor details and response payloads are encrypted before storage.
let database;
export function storeConfigured() { return !!process.env.DONATION_DATA_DIR && /^[a-f0-9]{64}$/i.test(process.env.DONATION_ENCRYPTION_KEY || ""); }
function secret() {
  if (!storeConfigured()) throw new Error("Donation storage is not configured");
  return Buffer.from(process.env.DONATION_ENCRYPTION_KEY, "hex");
}
function seal(value) {
  const iv = randomBytes(12), cipher = createCipheriv("aes-256-gcm", secret(), iv);
  const data = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), data]).toString("base64");
}
function open(value) {
  const b = Buffer.from(value, "base64"), decipher = createDecipheriv("aes-256-gcm", secret(), b.subarray(0, 12));
  decipher.setAuthTag(b.subarray(12, 28));
  return JSON.parse(Buffer.concat([decipher.update(b.subarray(28)), decipher.final()]).toString());
}
function db() {
  if (database) return database;
  secret();
  mkdirSync(process.env.DONATION_DATA_DIR, { recursive: true, mode: 0o700 });
  chmodSync(process.env.DONATION_DATA_DIR, 0o700);
  const path = join(process.env.DONATION_DATA_DIR, "donations.sqlite");
  database = new DatabaseSync(path);
  chmodSync(path, 0o600);
  database.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS attempts (id TEXT PRIMARY KEY, fingerprint TEXT NOT NULL, state TEXT NOT NULL, result TEXT, created_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS subscriptions (id TEXT PRIMARY KEY, state TEXT NOT NULL, payload TEXT NOT NULL, next_at TEXT, created_at TEXT NOT NULL, cancelled_at TEXT);
    CREATE INDEX IF NOT EXISTS due_subscriptions ON subscriptions(state, next_at);`);
  return database;
}
function transaction(fn) {
  const d = db(); d.exec("BEGIN IMMEDIATE");
  try { const r = fn(d); d.exec("COMMIT"); return r; } catch (e) { d.exec("ROLLBACK"); throw e; }
}
export function fingerprint(value) { return createHash("sha256").update(JSON.stringify(value)).digest("hex"); }
export function claimAttempt(id, hash) {
  return transaction((d) => {
    const row = d.prepare("SELECT * FROM attempts WHERE id=?").get(id);
    if (row) return { claimed: false, conflict: row.fingerprint !== hash, state: row.state, result: row.result ? open(row.result) : null };
    d.prepare("INSERT INTO attempts(id,fingerprint,state,created_at) VALUES(?,?,'pending',?)").run(id, hash, new Date().toISOString());
    return { claimed: true };
  });
}
export function prepareSubscription(id, payload) {
  db().prepare("INSERT INTO subscriptions(id,state,payload,created_at) VALUES(?,'pending',?,?)").run(id, seal(payload), new Date().toISOString());
}
export function finishAttempt(id, state, result, subscriptionId = null, nextAt = null) {
  transaction((d) => {
    d.prepare("UPDATE attempts SET state=?,result=? WHERE id=?").run(state, seal(result), id);
    if (subscriptionId) {
      // Cancellation can win while a payment is in flight; never reactivate it.
      const nextState = state === "approved" ? "active" : state === "declined" ? "past_due" : "review";
      d.prepare("UPDATE subscriptions SET state=?,next_at=? WHERE id=? AND state!='cancelled'").run(nextState, nextAt, subscriptionId);
    }
  });
}
export function nextMonthlyDate(anchor, after = new Date().toISOString()) {
  const a = new Date(anchor), n = new Date(after);
  const day = a.getUTCDate();
  let year = n.getUTCFullYear(), month = n.getUTCMonth();
  const candidate = () => new Date(Date.UTC(year, month, Math.min(day, new Date(Date.UTC(year, month + 1, 0)).getUTCDate()), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds(), a.getUTCMilliseconds()));
  let next = candidate();
  if (next <= n) { month++; next = candidate(); }
  return next.toISOString();
}
export function managementToken(id) { return `${id}.${createHmac("sha256", secret()).update(`cancel-monthly:${id}`).digest("base64url")}`; }
export function verifiedId(token) {
  if (typeof token !== "string" || !/^[a-f0-9-]{36}\.[A-Za-z0-9_-]{43}$/.test(token)) return null;
  const id = token.split(".")[0], expected = managementToken(id);
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected)) ? id : null;
}
export function getSubscription(id) {
  const r = db().prepare("SELECT * FROM subscriptions WHERE id=?").get(id);
  return r ? { id: r.id, state: r.state, nextAt: r.next_at, payload: open(r.payload) } : null;
}
export function cancelSubscription(id) {
  // Erase the saved payment token when the donor cancels; keep the receipt record.
  return transaction((d) => {
    const row = d.prepare("SELECT payload FROM subscriptions WHERE id=?").get(id);
    if (!row) return false;
    const payload = open(row.payload); delete payload.paymentToken;
    d.prepare("UPDATE subscriptions SET state='cancelled',next_at=NULL,cancelled_at=?,payload=? WHERE id=?").run(new Date().toISOString(), seal(payload), id);
    return true;
  });
}
export function claimDue(now = new Date().toISOString()) {
  return transaction((d) => {
    const r = d.prepare("SELECT * FROM subscriptions WHERE state='active' AND next_at<=? ORDER BY next_at LIMIT 1").get(now);
    if (!r) return null;
    const digest = createHash("sha256").update(`renew:${r.id}:${r.next_at}`).digest("hex");
    const attemptId = `${digest.slice(0, 8)}-${digest.slice(8, 12)}-4${digest.slice(13, 16)}-8${digest.slice(17, 20)}-${digest.slice(20, 32)}`;
    d.prepare("INSERT INTO attempts(id,fingerprint,state,created_at) VALUES(?,?,'pending',?)").run(attemptId, fingerprint({ subscriptionId: r.id, due: r.next_at }), now);
    d.prepare("UPDATE subscriptions SET state='processing' WHERE id=?").run(r.id);
    return { id: r.id, attemptId, payload: open(r.payload) };
  });
}
export function reviewCount() {
  const stale = new Date(Date.now() - 15 * 60000).toISOString();
  return Number(db().prepare("SELECT count(*) AS n FROM attempts WHERE state='review' OR (state='pending' AND created_at<?)").get(stale).n);
}
