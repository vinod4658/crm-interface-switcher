# CRM Interface Switcher

![Project icon](icons/icon128.png)

Free, MIT-licensed browser extension compatible with Salesforce Classic and Lightning Experience. Switch interfaces with one click using a compact draggable right-edge dock or the toolbar popup.

## Features

- One-click switching between Salesforce Classic and Lightning Experience.
- Support for Lightning Setup pages.
- Automatic detection of the current interface.
- Compact draggable floating dock.
- Hover enlargement and locally saved dock position.
- Alternative switching through the browser toolbar popup.
- No OAuth or separate authentication required.
- No analytics or external data transmission.

## Supported environments

The extension supports the following Salesforce domain patterns:

| Domain pattern | Purpose |
| --- | --- |
| `*.my.salesforce.com` | Salesforce My Domain |
| `*.lightning.force.com` | Lightning Experience |
| `*.my.salesforce-setup.com` | Lightning Setup |

Production, Sandbox, Developer Edition and Trailhead My Domain formats are supported by the domain detection logic.

Version 1.6.3 adds Lightning Setup domain compatibility. Switching through both the popup and floating dock has been verified through live Trailhead browser testing. Production and Sandbox domain patterns are covered by automated regression tests.

## Install locally

1. Download or clone this repository and extract it if needed.
2. Open `chrome://extensions` or `edge://extensions` and enable Developer mode.
3. Select Load unpacked and choose the folder containing manifest.json.
4. Refresh your signed-in CRM tab. Pin the toolbar action if desired.

## Use

Click the dock to switch. Drag vertically to move it; hover to enlarge it. The position is saved locally. The toolbar popup is an alternative.

The extension uses native Salesforce switching endpoints. When switching from Lightning Setup, navigation is routed through the corresponding same-org Lightning domain.

Salesforce controls the final redirect. These endpoints may change, and the current record or Setup page is not necessarily preserved.

Save changes before switching. Access to both interfaces must be permitted by your administrator. Private browsing requires explicit browser permission.

## Security and privacy

- Uses the existing authenticated Salesforce session.
- Does not collect credentials or session tokens.
- Does not use OAuth or remote extension code.
- Restricts content script access to supported Salesforce domain patterns.
- Validates navigation destinations to prevent cross-org redirects initiated by the extension.
- Uses local browser storage for the dock position.
- Does not transmit data to developer-operated servers.

See [security notes](SECURITY.md) and [privacy policy](docs/privacy-policy.md) for additional information.

## Development

No build dependencies.

Run the navigation regression tests:

```sh
node tests/navigation.cjs
```

Validate JavaScript syntax:

```sh
node --check floating.js
node --check popup.js
```

Build the store archive:

```sh
python scripts/package.py
```

The packaging script automatically reads the version from manifest.json.

See [contributing](CONTRIBUTING.md) and [changelog](CHANGELOG.md).

## Support

[GitHub Issues](https://github.com/vinod4658/crm-interface-switcher/issues) — never post credentials, session URLs or customer data.

## License and attribution

MIT; copyright 2026 Vinod M E.

Third-party marks and software screenshots are excluded from the license.

Salesforce and Lightning are trademarks of Salesforce, Inc. This independent project is not affiliated with, endorsed by, or sponsored by Salesforce, Inc.
