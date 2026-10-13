from pathlib import Path
import json
import re

base = Path(__file__).parent
audit = json.loads((base.parents[1] / 'reports/2026-10-03-mochacord-acrylic/native-audit.json').read_text(encoding='utf-8-sig'))
native = '\n'.join(r['selector'] + '{' + r['css'] + '}' for r in audit['rules'] if r['source'] == 'native')
css = native + '\n' + (base / 'midnight-verification.css').read_text() + '\n' + (base / 'MochaCord.css').read_text()
css = re.sub(r'@import\s+url\([^;]+;', '', css)
(base / 'acrylic-fixture-css.txt').write_text(css, encoding='utf-8')
print(len(css))
