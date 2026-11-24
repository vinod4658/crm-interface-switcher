# Security policy

Supported release: 1.6.3.

Report vulnerabilities privately using the repository Security tab (maintainer must enable private vulnerability reporting). If unavailable, open a minimal [issue](https://github.com/vinod4658/crm-interface-switcher/issues) requesting a private channel; do not disclose exploit details or sensitive information publicly.

## Design and residual risks

- `activeTab` grants temporary access to the active tab for the popup; `storage` saves the relative dock position (`dockPositionV14`).

- Static content scripts run on HTTPS subdomains of:
  - `my.salesforce.com`
  - `lightning.force.com`
  - `my.salesforce-setup.com`

- Content scripts run in the top frame only. Host matching is broader than runtime validation; code can access the page DOM. Version 1.6.3 extends domain matching to support Lightning Setup without adding new named browser permissions.

- No cookies permission, API requests, telemetry, remote scripts or background worker are present.

- Runtime hostname parsing allows an org label and optional sandbox/trailblaze segment. HTTPS is required; embedded credentials and nondefault ports are rejected.

- Common authentication and service paths are rejected, but the exclusion list is not exhaustive.

- Native Salesforce switching endpoints are constructed on the current HTTPS origin for regular Classic and Lightning pages.

- For Lightning Setup pages, the switching endpoint is constructed on the corresponding same-org `lightning.force.com` origin.

- Navigation destinations are validated against the expected org, origin and switching endpoint path. This validation does not control subsequent server-side redirects.

- The Lightning-to-Classic referrer parameter is a fixed home path, not the current record or Setup URL. Native switching endpoints may change.

- Trusted event checks reject synthetic DOM clicks; this is not a complete defense against hostile pages or other extensions.

- Closed shadow DOM isolates styling, not security. The popup rechecks the active tab URL before navigation. The locally stored dock position is not secret.

- The extension relies on the existing authenticated Salesforce session. It does not extract session tokens or collect login credentials.

- Unsaved edits may be lost. Navigation can change server-side interface preference; it is not a guarantee of zero state change.

- Salesforce handles access restrictions and sessions. No independent penetration test or security certification has been performed.

- Unpacked source can be modified locally. Review changes, protect publisher accounts with MFA and compare release hashes. Corporate approval may be required.
