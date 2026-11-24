# Changelog

## 1.6.3 — 2026-11-24
- Add support for Salesforce Lightning Setup domains (`*.my.salesforce-setup.com`).
- Enable interface switching from Lightning Setup using both the popup and floating dock.
- Support Production, Sandbox and Trailhead Setup domain patterns.
- Route Setup switching through the corresponding same-org Lightning domain.
- Preserve existing Classic and Lightning switching functionality.
- Retain existing extension permissions while extending content script domain matching.
- Extend automated navigation and security regression tests.
- Verify Lightning Setup switching through live Trailhead browser testing.

## 1.6.2 — 2026-11-24
- Use native same-origin Salesforce switching endpoints in popup and dock.
- Fix first-time switching in newly created Trailhead Playgrounds (verified in browser testing).
- Retain existing permissions and interface controls. Update navigation regression tests.

## 1.6.1 — 2026-11-24
- Support trailblaze My Domain formats in both popup and dock.
- Preserve 1.6.0 independent branding and 1.5 security controls.
- Public-release preparation: license, documentation, packaging and automated regression checks.

## 1.6.0
- Independent CRM Interface Switcher branding.

## 1.5.x
- Narrow domain matching, remove tabs permission, validate navigation, trusted clicks, DOM-created SVG.

## 1.4
- Draggable dock, hover effect and local position memory.
