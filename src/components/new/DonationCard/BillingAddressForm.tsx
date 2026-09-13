"use client";
import { useEffect, useRef, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { BILLING_COUNTRIES, type BillingAddress, type AddressSuggestion } from "@/lib/donations/billing";
import styles from "./DonationPage.module.css";
export default function BillingAddressForm({ value, onChange, searchEnabled }: { value: BillingAddress; onChange: (value: BillingAddress) => void; searchEnabled: boolean }) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [searching, setSearching] = useState(false);
  const [typed, setTyped] = useState(false);
  const [active, setActive] = useState(-1);
  const [message, setMessage] = useState("");
  const sequence = useRef(0);
  const countryName = BILLING_COUNTRIES.find((country) => country.code === value.countryCode)?.name;
  const update = (key: keyof BillingAddress, text: string) => {
    ++sequence.current;
    setSuggestions([]); setActive(-1); setSearching(false); setMessage("");
    if (key === "countryCode") setTyped(false);
    onChange({ ...value, [key]: text });
  };
  useEffect(() => {
    const version = ++sequence.current;
    setSuggestions([]); setActive(-1);
    if (!searchEnabled || !value.countryCode || !typed || value.line1.trim().length < 3) { setSearching(false); return; }
    const abort = new AbortController();
    const timer = setTimeout(async () => {
      setSearching(true); setMessage("");
      try {
        const res = await fetch("/api/donate/address", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: value.line1, countryCode: value.countryCode }), signal: abort.signal });
        const data = await res.json();
        if (version !== sequence.current) return;
        if (!res.ok || !Array.isArray(data.suggestions)) throw new Error("Search unavailable");
        setSuggestions(data.suggestions);
        if (!data.suggestions.length) setMessage("No matching address? Complete the fields below.");
      } catch { if (!abort.signal.aborted && version === sequence.current) setMessage("You can enter your address manually below."); }
      finally { if (version === sequence.current) setSearching(false); }
    }, 450);
    return () => { ++sequence.current; clearTimeout(timer); abort.abort(); };
  }, [value.line1, value.countryCode, searchEnabled, typed]);

  function choose(s: AddressSuggestion) {
    ++sequence.current;
    setSuggestions([]); setActive(-1); setSearching(false); setTyped(false);
    if (s.address?.countryCode !== value.countryCode) { setMessage("Please choose an address in your selected country."); return; }
    onChange({ ...s.address, countryCode: value.countryCode, line1: s.address.line1 || value.line1, line2: value.line2 });
    setMessage("Address filled in. Please check your street number and the details below.");
  }
  return <section className={styles.formSection} aria-labelledby="billing-heading">
    <div className={styles.sectionTitle}><h3 id="billing-heading">Billing information</h3><MapPin size={16} aria-hidden="true" /></div>
    <p className={styles.sectionNote}>Choose your country, then enter the address associated with your card.</p>
    <div className={styles.fieldGrid}>
      <div className={styles.fullField}><label htmlFor="billing-country">Country / region</label><select id="billing-country" name="billing-country" autoComplete="billing country" value={value.countryCode} onChange={(e) => update("countryCode", e.target.value)}><option value="">Select your country</option>{BILLING_COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}</select></div>
      <div className={styles.fullField}>
        <label htmlFor="billing-line1">Street address</label>
        <div className={styles.addressSearch}>
          {searchEnabled && <Search size={16} aria-hidden="true" />}
          <input id="billing-line1" name="billing-line1" value={value.line1} autoComplete="billing address-line1" maxLength={150} placeholder={!value.countryCode ? "Select your country first" : searchEnabled ? "Start typing your address…" : "House number and street"} aria-describedby="billing-address-help" role={searchEnabled ? "combobox" : undefined} aria-autocomplete={searchEnabled ? "list" : undefined} aria-expanded={searchEnabled ? suggestions.length > 0 : undefined} aria-controls={suggestions.length ? "billing-suggestions" : undefined} aria-activedescendant={active >= 0 ? `billing-suggestion-${active}` : undefined} onChange={(e) => { setTyped(true); update("line1", e.target.value); }} onKeyDown={(e) => {
            if (e.key === "Escape") { ++sequence.current; setSuggestions([]); setActive(-1); setSearching(false); setTyped(false); }
            if (!suggestions.length) return;
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % suggestions.length); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => a <= 0 ? suggestions.length - 1 : a - 1); }
            if (e.key === "Enter" && active >= 0) { e.preventDefault(); void choose(suggestions[active]); }
          }} onBlur={(e) => { if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) { ++sequence.current; setSuggestions([]); setActive(-1); setSearching(false); setTyped(false); } }} />
          {!!suggestions.length && <div className={styles.addressDropdown}>
            <ul id="billing-suggestions" role="listbox" aria-label="Address suggestions">{suggestions.map((s, i) => <li id={`billing-suggestion-${i}`} key={s.id} role="option" aria-selected={active === i} onMouseDown={(e) => e.preventDefault()} onClick={() => void choose(s)}><MapPin size={15} aria-hidden="true" /><span>{s.label}</span></li>)}</ul>
            <p className={styles.addressAttribution}>Powered by <a href="https://www.geoapify.com/" target="_blank" rel="noopener noreferrer">Geoapify</a></p>
          </div>}
        </div>
        <p id="billing-address-help" className={styles.fieldHelp} aria-live="polite">{!value.countryCode ? "Select your country above to get started." : searching ? "Finding your address…" : message || (searchEnabled ? `Search for your address in ${countryName}. You can also enter it manually.` : "Your browser can fill a saved address, or you can enter it below.")}</p>
      </div>
      <div className={styles.fullField}><label htmlFor="billing-line2">Apartment, suite, etc. <span>Optional</span></label><input id="billing-line2" autoComplete="billing address-line2" maxLength={150} value={value.line2} onChange={(e) => update("line2", e.target.value)} placeholder="Apartment, suite or unit" /></div>
      <div><label htmlFor="billing-city">City / locality</label><input id="billing-city" autoComplete="billing address-level2" maxLength={150} value={value.city} onChange={(e) => update("city", e.target.value)} /></div>
      <div><label htmlFor="billing-region">State / province <span>Optional</span></label><input id="billing-region" autoComplete="billing address-level1" maxLength={150} value={value.region} onChange={(e) => update("region", e.target.value)} /></div>
      <div className={styles.fullField}><label htmlFor="billing-postal">Postal / ZIP code</label><input id="billing-postal" autoComplete="billing postal-code" maxLength={24} value={value.postalCode} onChange={(e) => update("postalCode", e.target.value)} /><p className={styles.fieldHelp}>Leave blank if your country does not use postal codes.</p></div>
    </div>
  </section>;
}
