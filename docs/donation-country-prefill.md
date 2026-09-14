# Donation country prefill

The editable billing **Country** field defaults to the visitor's network country.
Browser timezone and language are fallbacks. They must not outvote a valid network
country: a person visiting the US can still have Canadian device settings.

`GET /api/donate/country` is an uncached, independent request so country lookup
cannot delay monthly-giving settings or prevent a donation. A country supplied by
the edge is preferred. Otherwise the server looks up the public visitor IP from
the rightmost `X-Forwarded-For` entry supplied/appended by Caddy (or `X-Real-IP`
when XFF is absent). The application must remain behind that proxy. This is only
a form convenience, never an authorization, eligibility or fraud check.

The fallback provider is [IPWhois](https://ipwhois.io/documentation), using HTTPS
and requesting only `success,country_code`. No donor or billing fields are sent.
Its free endpoint currently allows 1,000 requests/day; no account or paid plan is
enabled. Results are cached in bounded process memory, simultaneous requests for
the same IP are deduplicated, timeouts return no country, and 429 responses pause
new provider requests. Device hints and manual selection still work on failure.
The privacy notice explains this use of IP addresses.

An explicit billing-country choice is remembered for the tab session. A lookup
arriving after any billing edit cannot overwrite the donor's country/address.
Production never looks up the server's own IP when the visitor IP is unknown.
For a development request from loopback to localhost only, the preview can look
up this machine's outgoing network, allowing the owner to review the behavior.

Run `node scripts/check-donation-geo.mjs` for simulated countries, IPv6, failures,
cache isolation and rate-limit handling. The local form can be verified behind
a temporary loopback-only proxy supplying a test public IP; do not add a public
query parameter that overrides visitor country. No payment is needed.
