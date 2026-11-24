# Security policy
Supported release: 1.6.2. Report vulnerabilities privately using the repository Security tab (maintainer must enable private vulnerability reporting). If unavailable, open a minimal [issue](https://github.com/vinod4658/crm-interface-switcher/issues) requesting a private channel; do not disclose exploit details or sensitive information publicly.

## Design and residual risks
- activeTab grants temporary access to the active tab for the popup; storage saves the relative dock position (dockPositionV14).
- Static content scripts run on HTTPS subdomains of my.salesforce.com and lightning.force.com, top frame only. Host matching is broader than runtime validation; code can access page DOM. No cookies permission, API requests, telemetry, remote scripts or background worker are present.
- Runtime hostname parser allows an org label and optional sandbox/trailblaze segment; HTTPS only, no credentials or nondefault port. Rejects common auth/service paths, not an exhaustive list. Native switching endpoint is constructed on the current HTTPS origin and validated against the same org and origin; validation does not control server-side redirects. The Lightning-to-Classic referrer is a fixed home path, not the current record URL. Native endpoints may change.
- Trusted event checks reject synthetic DOM clicks; not a complete defense against hostile pages or other extensions. Closed shadow DOM isolates styling, not security. Popup rechecks tab URL before navigation. Local position is not secret.
- Unsaved edits may be lost. Navigation can change server-side interface preference; it is not a guarantee of zero state change. Salesforce handles access restrictions and sessions. No independent penetration test or certification performed.
- Unpacked source can be modified locally. Review changes, protect publisher accounts with MFA and compare release hashes. Corporate approval may be required.
