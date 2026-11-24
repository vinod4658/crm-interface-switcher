# CRM Interface Switcher

![Project icon](icons/icon128.png)

Free, MIT-licensed browser extension compatible with Salesforce Classic and Lightning Experience. Switch interfaces with one click using a compact draggable right-edge dock or the toolbar popup.

## Install locally
1. Download or clone this repository and extract it if needed.
2. Open `chrome://extensions` or `edge://extensions` and enable Developer mode.
3. Select Load unpacked and choose the folder containing manifest.json.
4. Refresh your signed-in CRM tab. Pin the toolbar action if desired.

## Use
Click the dock to switch. Drag vertically to move it; hover to enlarge it. The position is saved locally. The toolbar popup is an alternative. Production, sandbox and trailblaze My Domain formats are supported. Version 1.6.2 uses native Salesforce switching endpoints on the current origin; Salesforce controls the final redirect. The first-time switching fix was verified in a fresh Trailhead Playground. These endpoints may change; the current record is not necessarily preserved. Save changes before switching. Access to both interfaces must be permitted by your administrator. Private browsing requires explicit browser permission.

## Development
No build dependencies. Run `node tests/navigation.cjs` and `node --check floating.js && node --check popup.js`. Build the store archive using `python scripts/package.py`. See [security notes](SECURITY.md), [privacy policy](docs/privacy-policy.md), and [contributing](CONTRIBUTING.md).

## Support
[GitHub Issues](https://github.com/vinod4658/crm-interface-switcher/issues) — never post credentials, session URLs or customer data.

## License and attribution
MIT; copyright 2026 Vinod M E. Third-party marks and software screenshots are excluded from the license. Salesforce and Lightning are trademarks of Salesforce, Inc. This independent project is not affiliated with, endorsed by, or sponsored by Salesforce, Inc.
