from pathlib import Path
import json
from zipfile import ZipFile, ZIP_DEFLATED
root = Path(__file__).resolve().parents[1]
out = root / 'dist'; out.mkdir(exist_ok=True)
version = json.loads((root / 'manifest.json').read_text())['version']
with ZipFile(out / f'crm-interface-switcher-v{version}-store.zip', 'w', ZIP_DEFLATED) as z:
    for name in ['manifest.json','floating.js','popup.js','popup.html','popup.css','LICENSE']:
        z.write(root/name,name)
    for f in sorted((root/'icons').glob('*.png')):
        z.write(f,f.relative_to(root))
