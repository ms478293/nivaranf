// Campaign presentation must stay aligned with the payment/receipt registry.
// Run with Node 22+: node scripts/check-donation-campaigns.mjs
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { DONATION_CAMPAIGNS, campaignDonationPath, getDonationCampaign } from "../src/content/donation-campaigns.ts";
import { NEPAL_RESPONSE } from "../src/content/nepal-response.ts";
import { DESIGNATIONS, getDesignation, isSelectableDesignation } from "../src/content/donation-designations.ts";

assert.deepEqual(
  new Set(DONATION_CAMPAIGNS.map((campaign) => campaign.id)),
  new Set(DESIGNATIONS.map((designation) => designation.id)),
  "Every designation needs a campaign, including appeals not yet open",
);
assert.equal(DONATION_CAMPAIGNS.length, new Set(DONATION_CAMPAIGNS.map((campaign) => campaign.id)).size);
assert.equal(new Set(DONATION_CAMPAIGNS.map((campaign) => campaignDonationPath(campaign.id))).size, DONATION_CAMPAIGNS.length);
for (const campaign of DONATION_CAMPAIGNS) {
  assert.ok(existsSync(new URL(`../public${campaign.image}`, import.meta.url)), `${campaign.id}: missing campaign image`);
  assert.equal(campaign.amounts.length, 5, `${campaign.id}: five preset amounts plus Other`);
  assert.ok(campaign.amounts.includes(campaign.defaultAmount), `${campaign.id}: default must be a preset`);
  assert.ok(campaign.amounts.every((amount) => Number.isInteger(amount) && amount >= 5 && amount <= 25_000));
}
for (const id of ["vidya"]) {
  assert.equal(getDonationCampaign(id)?.id, id, "Closed campaigns must not resolve to general giving");
  assert.equal(isSelectableDesignation(id), false, "A presentation change must not enable fundraising");
}
assert.equal(isSelectableDesignation("nepal-flood-recovery"), true);
assert.equal(getDesignation("nepal-flood-recovery").id, "nepal-flood-recovery", "Flood gifts must not fall back to general giving");
assert.equal(getDesignation("nepal-flood-recovery").status, "planned", "Opening gifts does not claim field deployment");
assert.equal(NEPAL_RESPONSE.floodFundUrl, "/donate/nepal-flood-recovery#flood-giving");
assert.equal(getDonationCampaign("unknown"), undefined);
assert.equal(campaignDonationPath("general"), "/donate");
console.log("Donation campaigns: registry, assets, amounts, and closed-fund safeguards passed.");
