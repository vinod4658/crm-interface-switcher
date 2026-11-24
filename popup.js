'use strict';

const statusEl = document.getElementById('status');
const orgEl = document.getElementById('org');
const switchButton = document.getElementById('switch');
const messageEl = document.getElementById('message');

function orgDomain(url) {
  if (url.protocol !== 'https:' || url.port || url.username || url.password) return null;
  const match = /^([a-z0-9-]+(?:\.(?:sandbox|trailblaze))?)\.(my\.salesforce\.com|lightning\.force\.com)$/.exec(url.hostname);
  return match ? {org: match[1], lightning: match[2] === 'lightning.force.com'} : null;
}
function detectInterface(url) {
  const domain = orgDomain(url);
  if (!domain || /^\/(?:secur|services|login)(?:[/.]|$)/i.test(url.pathname)) return null;
  return domain.lightning || /^\/lightning(?:\/|$)/.test(url.pathname) || url.pathname === '/one/one.app' ? 'lightning' : 'classic';
}
function switchTarget(url, currentInterface) {
  const source = orgDomain(url);
  if (!source || detectInterface(url) !== currentInterface) throw new Error('Unsupported Salesforce page.');
  const toClassic = currentInterface === 'lightning';
  const target = new URL('/ltng/switcher', url.origin);
  target.searchParams.set('destination', toClassic ? 'classic' : 'lex-campaign');
  if (toClassic) target.searchParams.set('referrer', '/lightning/page/home');
  const destination = orgDomain(target);
  if (!destination || destination.org !== source.org || target.origin !== url.origin || target.pathname !== '/ltng/switcher') throw new Error('Invalid destination.');
  return target.href;
}

async function initialize() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id || !tab.url) throw new Error('Cannot access the active tab.');
    const url = new URL(tab.url);
    const current = detectInterface(url);
    if (!current) {
      statusEl.textContent = 'Not a Salesforce page';
      orgEl.textContent = url.hostname;
      switchButton.textContent = 'Open a Salesforce tab';
      messageEl.textContent = 'Open Salesforce Classic or Lightning, then try again.';
      return;
    }
    statusEl.textContent = current === 'lightning' ? 'Lightning Experience' : 'Salesforce Classic';
    orgEl.textContent = url.hostname;
    switchButton.textContent = current === 'lightning' ? 'Switch to Classic' : 'Switch to Lightning';
    switchButton.disabled = false;
    switchButton.addEventListener('click', async (event) => {
      if (!event.isTrusted) return;
      switchButton.disabled = true;
      switchButton.textContent = 'Switching…';
      try {
        const latest = await chrome.tabs.get(tab.id);
        if (!latest.url || latest.url !== tab.url) throw new Error('The tab changed. Reopen the popup.');
        await chrome.tabs.update(tab.id, { url: switchTarget(new URL(latest.url), current) });
        window.close();
      } catch (err) {
        switchButton.disabled = false;
        switchButton.textContent = current === 'lightning' ? 'Switch to Classic' : 'Switch to Lightning';
        messageEl.classList.add('error');
        messageEl.textContent = err.message || 'Could not navigate to Salesforce.';
      }
    });
  } catch (err) {
    statusEl.textContent = 'Unable to detect interface';
    messageEl.classList.add('error');
    messageEl.textContent = err.message || 'Please retry.';
  }
}

initialize();
