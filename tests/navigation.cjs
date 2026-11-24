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
  assert.equal(ctx.switchTarget(c,'classic'),l.href); assert.equal(ctx.switchTarget(l,'lightning'),`https://${org}.my.salesforce.com/?isdtp=p1`);
  assert.throws(()=>ctx.switchTarget(c,'lightning'));
 }
 for(const s of ['http://demo.my.salesforce.com','https://demo.my.salesforce.com.evil.test','https://user:pass@demo.my.salesforce.com','https://demo.my.salesforce.com:444','https://demo.my.salesforce.com/secur/login','https://demo.my.salesforce.com/services/data','https://demo.other.my.salesforce.com']) assert.equal(ctx.detectInterface(new URL(s)),null,s);
 console.log(file+': navigation regression tests passed');
}
const m=JSON.parse(fs.readFileSync(path.join(__dirname,'..','manifest.json')));assert.equal(m.manifest_version,3);assert.deepEqual(m.permissions,['activeTab','storage']);assert.equal(m.content_scripts[0].all_frames,false);
