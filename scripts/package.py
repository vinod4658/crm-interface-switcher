from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root = Path(__file__).resolve().parents[1]
out = root / 'dist'; out.mkdir(exist_ok=True)
with ZipFile(out / 'crm-interface-switcher-v1.6.1-store.zip', 'w', ZIP_DEFLATED) as z:
    for name in ['manifest.json','floating.js','popup.js','popup.html','popup.css','LICENSE']:
        z.write(root/name,name)
    for f in sorted((root/'icons').glob('*.png')):
        z.write(f,f.relative_to(root))
