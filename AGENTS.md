# Nivaran agent working guide

## Start here

- This repository belongs to Nivaran Foundation. Keep its code, accounts, and infrastructure separate from unrelated projects.
- On the owner's Mac, first read `$HOME/NIVARAN_HANDOFF.md`. It is the private operational handoff, including the canonical checkout, live release, deployment procedure, and known issues. Do not commit or paste its contents into a public issue or pull request.
- Read `docs/rendering-and-releases.md` before changing rendering, content, shared layouts, or deployment behavior.
- The integration and release branch is **`deploy/2026-09-12`**, not `main`. Verify the latest remote state before starting. Never deploy `main` or push the server's own branch.
- If the private handoff is unavailable, work from the verified source branch and prepare a reviewable change. Obtain the missing operational information before deploying; do not guess servers, accounts, credentials, or older checkouts.

## Keep each agent's work separate

1. Fetch the integration branch and inspect Git status and existing worktrees. Preserve other agents' and the owner's edits.
2. Create a task branch and a separate worktree from `origin/deploy/2026-09-12`. Concurrent agents must not edit the same checkout or share a development server that serves different source trees.
3. Make the requested change with a focused diff. Avoid unrelated redesigns, dependency upgrades, content changes, or infrastructure changes.
4. Review the diff, run checks appropriate to the affected behavior, and commit explicit reviewed files. Do not use a blanket add that could include credentials or unrelated work.
5. Push the task branch. Integrate reviewed changes into `deploy/2026-09-12` before a release, preferably through a pull request targeting that branch. Do not force-push or discard unknown work. Reconcile concurrent changes rather than overwriting them.
6. Report the commit, remote branch, checks performed, and whether the result is a preview or a live release. A Git push alone does not deploy the website.

## Preserve working behavior

- Preview interface edits with a development server. Documentation-only changes need no application rebuild. For code changes, use focused checks during iteration and the existing staging checks before release.
- Keep the root layout independent of request headers. Preserve bounded main-site prerendering, on-demand article caching, direct article file reads, and persistent compiler caches. Do not restore whole-archive generation for a small edit.
- The homepage sits outside the main route group. Preserve its schema, appeal popup, language links, and refresh behavior as well as the distinct main, Global, and USA branding.
- Keep payment APIs and private pages uncached. Preserve campaign selection, donor-supplied amounts, one-time/monthly choices, explicit recurring authorization, visible optional gift checkboxes, and country-first billing with manual address fallback.
- Leave payment credentials, the encrypted donation journal, encryption keys, renewal schedule, and mail configuration alone unless the task specifically requires those changes. Never automatically retry an uncertain payment result. Use simulated tests; do not submit a real payment or send a receipt as a routine check.
- Program availability comes from the current designation configuration and owner instructions. Active health camps are not paused because a flood appeal exists. Do not enable an unavailable fund as part of a styling change.
- Do not invent donor popularity statistics, impact figures, or operational claims. The owner has requested no tax-status claims or disclaimers in either direction; preserve that wording policy.
- This repository is public. Keep credentials, runtime environment files, donor records, private deployment scripts, and private handoff notes outside Git. Identify private operational changes separately in the handoff; do not imply that they were pushed to this repository.

## Release and handoff

- Deploy only when deployment is within the owner's authorized task. Existing authorization for the same action does not need to be requested again.
- Use the existing private deployment procedure. It builds and checks an isolated staging artifact, preserves compiler caches, prevents overlapping releases, and retains the previous build for rollback. Do not bypass its checks or replace the live build with a development server.
- Prepare once, then publish the same verified artifact. Check the live affected pages after publication. For shared layout or caching changes, also check main, Global, USA, and the donation form without submitting payment.
- After a release, update the private handoff with the source revision, live build identifier, verification results, and rollback location. Leave the task's committed work traceable on the remote.
- These instructions are a working procedure, not an access-control mechanism. Agents working without production authorization should hand off a branch or pull request to the person responsible for releases.
