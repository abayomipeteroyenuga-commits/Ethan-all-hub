# ETHAN HUB v6.5 — ETHAN TUTOR AI HUB UPDATE

This build is based directly on the uploaded ETHAN-HUB-v6.0-APP-LAUNCH-FIXED build.

The JavaScript app registry itself now contains exactly 14 apps (not just a changed visual counter). Ethan Cloud retains the existing SSO route; other cards remain Hub Access.

Build marker: 13 APPS v6.4

# ETHAN HUB v5.0 — Ecosystem + Premium Framework

Upgraded from the user's working v4.3 Supabase Verify / Auto Login build.

## Dashboard apps
- Ethan ERP & LMS — Ethan ID SSO
- Ethan Learn — Hub Access
- Ethan AI — Ethan ID SSO
- Ethan Office — Ethan ID SSO
- Ethan Cloud — Hub Access
- Ethan GPS — Hub Access
- Ethan Games — Hub Access
- NEON BIKE RIDE — Ethan ID SSO
- Super Kingdom — Hub Access

**Ethan ID SSO** means the existing Hub ticket flow is enabled for that app target in this build.
**Hub Access** means the service is available from the authenticated Hub dashboard, but true cross-domain auto-login still requires that destination app to implement/accept Ethan SSO tickets.

## Premium framework
The dashboard now supports Free / Plus / Pro plan display. It safely defaults to Free if the database migration has not been run.

To store plans centrally, run `PREMIUM-PLAN-MIGRATION.sql` once in the Ethan Hub Supabase project. This does not connect payments and does not automatically upgrade users.

## Deployment
Replace the existing GitHub repository files with this package and redeploy on Vercel. Keep the existing Supabase Auth redirect for the production Hub domain.


## v5.2
Ethan Cloud is now an Ethan ID SSO target (`cloud`) and opens through the existing secure ticket handoff.


## ETHAN ID NEW SUPABASE (v5.3)
This build points Ethan Hub authentication to project `hrymakhatxjitbgpdbjk`.
The supplied REST endpoint was normalized to the Supabase project base URL; the JavaScript client adds REST/Auth paths itself.

Required Supabase Authentication URL Configuration:
- Site URL: https://hub.ethandigitalacademy.org
- Redirect URL: https://hub.ethandigitalacademy.org/**

Run PREMIUM-PLAN-MIGRATION.sql in this new ETHAN ID project if Free / Plus / Pro storage is required.
Deploy the `ethan-sso` Edge Function in this same project before relying on one-click SSO into connected apps.

## v5.5 dashboard layout fix
- Preserves the working Ethan ID/Supabase authentication and callback handling from v5.4.
- Desktop dashboard uses a compact 3 x 3 ecosystem grid so all 9 app cards are presented together.
- Reduces card height, spacing and typography on desktop without changing mobile/tablet responsiveness.

## v6.0 app launcher fix
- Only Ethan Cloud uses Ethan ID SSO while its integration is being tested.
- All other Ethan apps open directly instead of getting stuck on Connecting.
- Cloud SSO has a 6-second timeout and automatically opens Cloud normally if SSO is unavailable.


## v6.5
Added Ethan Tutor AI (`https://tutor.ethandigitalacademy.org`) to the Hub registry as HUB ACCESS. Dashboard count updated to 14 apps. Existing Ethan Cloud SSO behavior is unchanged.


## Battle Arena update

18 apps in the registry, including the new bundled ETHAN BATTLE ARENA. Existing ERP and Wave Rush preserved. See BATTLE-ARENA-DEPLOY.md.


## v12.1 verification update
- Verified Ethan Kids: https://kids.ethandigitalacademy.org
- Verified Ethan Creator: https://create.ethandigitalacademy.org
- Both are visible dashboard cards.
- Ethan Kids now opens as Hub Access instead of requiring the unfinished SSO handoff.
- The Hub app counter and build marker are derived from the actual registry length.
- Current unique dashboard registry: 18 apps.


## v12.4 Hub update
- Hub now renders 22 unique app cards.
- Added Neon Bike Ride, Ethan Galaxy Defender, Ethan Treasure Island and Ethan Skybound Quest.
- Wave Rush and ETHAN BATTLE ARENA remain included.
- Every Hub card opens its destination in a separate browser tab/window (subject to browser popup settings).


### v12.4 packaging
- Repackaged to exactly 91 files for a lighter GitHub/Vercel deployment package.
- Hub remains 21 apps.
- ERP is not exposed as a Hub app.
- All Hub cards remain HUB ACCESS and open in separate tabs/windows.


## v12.5 PWA upgrade
- Ethan Hub is installable as a PWA.
- All 21 Hub app cards include an Install action opening an installable Ethan launcher.
- Every launcher has a distinct manifest identity and standalone start URL.
- Open actions continue to launch the live app in a separate tab/window.
- External apps still require their own origin-level manifest/service worker for fully native offline PWA behavior; Hub launchers provide installable access from the Hub origin.
