// Run: node scripts/check-donation-fee.mjs   (Node 22.23 strips .ts types natively)
import assert from "node:assert/strict";
import {
  DESIGNATIONS,
  feeCentsFor,
  getDesignation,
  isSelectableDesignation,
} from "../src/content/donation-designations.ts";

// 2.7% + 30¢
assert.equal(feeCentsFor(500), 44); // $5      -> $0.44
assert.equal(feeCentsFor(2_500), 98); // $25     -> $0.98
assert.equal(feeCentsFor(10_000), 300); // $100    -> $3.00
assert.equal(feeCentsFor(25_000), 705); // $250    -> $7.05
assert.equal(feeCentsFor(2_500_000), 67_530); // $25,000 -> $675.30
assert.equal(getDesignation("nope").id, "general");
assert.equal(getDesignation(undefined).id, "general");
assert.equal(getDesignation("vidya").id, "general"); // hidden -> general
assert.equal(getDesignation("sanjeevani").id, "sanjeevani");
assert.equal(isSelectableDesignation("vidya"), false);
assert.equal(new Set(DESIGNATIONS.map((d) => d.id)).size, DESIGNATIONS.length);
for (const d of DESIGNATIONS) {
  assert.ok(!/tax|deduct|501\(c\)|%/i.test(d.thankYouNote + d.caption + d.label + d.receiptLabel), d.id);
}
console.log("donation-designations OK");
