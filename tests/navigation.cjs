const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
for (const file of ['popup.js','floating.js']) {
 const source = fs.readFileSync(path.join(__dirname,'..',file),'utf8');
 const code = source.slice(source.indexOf('function orgDomain'), source.indexOf(file==='popup.js'?'async function initialize':'const url = new URL(location.href)'));
 const ctx = vm.createContext({URL}); vm.runInContext(code,ctx);
 for (const org of ['demo','demo--dev.sandbox','demo-dev-ed.trailblaze']) {
  const c = new URL(`https://${org}.my.salesforce.com/home/home.jsp`), l = new URL(`https://${org}.lightning.force.com/lightning/page/home`);
  assert.equal(ctx.detectInterface(c),'classic'); assert.equal(ctx.detectInterface(l),'lightning');
  assert.equal(ctx.switchTarget(c,'classic'),`${c.origin}/ltng/switcher?destination=lex-campaign`);
  assert.equal(ctx.switchTarget(l,'lightning'),`${l.origin}/ltng/switcher?destination=classic&referrer=%2Flightning%2Fpage%2Fhome`);
  const record = new URL('/lightning/r/Account/example/view?private=value',l.origin);
  assert.equal(ctx.switchTarget(record,'lightning'),ctx.switchTarget(l,'lightning'));
  assert.throws(()=>ctx.switchTarget(l,'classic'));
  assert.throws(()=>ctx.switchTarget(c,'lightning'));
 }
 for(const s of ['http://demo.my.salesforce.com','https://demo.my.salesforce.com.evil.test','https://user:pass@demo.my.salesforce.com','https://demo.my.salesforce.com:444','https://demo.my.salesforce.com/secur/login','https://demo.my.salesforce.com/services/data','https://demo.other.my.salesforce.com']) { assert.equal(ctx.detectInterface(new URL(s)),null,s); assert.throws(()=>ctx.switchTarget(new URL(s),'classic')); }
 console.log(file+': navigation regression tests passed');
}
const m=JSON.parse(fs.readFileSync(path.join(__dirname,'..','manifest.json')));assert.equal(m.manifest_version,3);assert.deepEqual(m.permissions,['activeTab','storage']);assert.equal(m.content_scripts[0].all_frames,false);

assert.equal(m.version,'1.6.2');
