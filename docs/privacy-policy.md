# Privacy policy — CRM Interface Switcher

Effective 24 November 2026.
Last updated 24 November 2026.
Maintainer: Vinod M E.

## Data handling

The extension processes the active page URL locally to identify supported Salesforce interfaces, including Classic, Lightning Experience and Lightning Setup, and construct a same-org navigation destination.

The popup displays the active page hostname. The extension stores only a numeric dock position in chrome.storage.local; it is retained until removed/reset by the browser or extension storage is cleared.

No developer-operated server, telemetry, analytics, advertising, sale or sharing of user data is implemented.

The extension does not read passwords, session cookies or business records.

Ordinary browser navigation communicates with Salesforce, whose own privacy practices apply. Browser/store services may process data independently.

## Permissions and website access

- activeTab: Supports popup interface detection and navigation.
- storage: Retains the numeric dock position locally.
- Static content scripts: Display the floating dock on supported HTTPS Salesforce pages.

The extension's content scripts match the following domain patterns:

- *.my.salesforce.com
- *.lightning.force.com
- *.my.salesforce-setup.com

Version 1.6.3 extends website access to Lightning Setup domains. This change does not introduce new data collection or named browser permissions.

The extension uses the existing authenticated Salesforce session without OAuth or separate authentication.

## Data retention and deletion

Removal of the extension normally removes its local storage; browser behavior may vary.

No developer-held user data exists to request deletion of.

## Support and contact

Support requests submitted voluntarily to public GitHub Issues are governed by GitHub's policies; do not include private information.

Contact:
https://github.com/vinod4658/crm-interface-switcher/issues

## Policy updates

Policy updates will be published here.

## Trademark disclaimer

Salesforce and Lightning are trademarks of Salesforce, Inc. This independent project is not affiliated with, endorsed by, or sponsored by Salesforce, Inc.
