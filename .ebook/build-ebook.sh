#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOCS="$ROOT/docs"
EBOOKS="$ROOT/ebooks"
VERSION="$(tr -d '[:space:]' < "$EBOOKS/VERSION")"
BUILD="$ROOT/.ebook/build"
STEM="MVPFy-Documentacao-Completa-v$VERSION"
PDF="$EBOOKS/$STEM.pdf"
EPUB="$EBOOKS/$STEM.epub"
HTML="$BUILD/$STEM.html"
COVER="$BUILD/$STEM-cover.png"
MANIFEST="$EBOOKS/build.json"

for arquivo in "$ROOT/docs/reading-order.txt" "$ROOT/.ebook/pdf.css" "$ROOT/.ebook/epub.css" "$ROOT/.ebook/template.html" "$ROOT/.ebook/metadata.yaml" "$ROOT/.ebook/cover.svg" "$ROOT/.ebook/fonts/inter-latin.woff2" "$ROOT/.ebook/fonts/manrope-latin.woff2" "$ROOT/brand/logo/icon.png"; do
  test -f "$arquivo" || { echo "Fonte ausente: $arquivo" >&2; exit 1; }
done

mapfile -t PAGINAS < <(sed -e '/^[[:space:]]*#/d' -e '/^[[:space:]]*$/d' "$DOCS/reading-order.txt")
test "${#PAGINAS[@]}" -gt 0
for pagina in "${PAGINAS[@]}"; do test -f "$ROOT/$pagina" || { echo "Página ausente: $pagina" >&2; exit 1; }; done

SOURCE_SHA="$(
  for arquivo in "$ROOT/.ebook/build-ebook.sh" "$ROOT/.ebook/pdf.css" "$ROOT/.ebook/epub.css" "$ROOT/.ebook/template.html" "$ROOT/.ebook/metadata.yaml" "$ROOT/.ebook/cover.svg" "$ROOT/.ebook/fonts/inter-latin.woff2" "$ROOT/.ebook/fonts/manrope-latin.woff2" "$ROOT/brand/logo/icon.svg" "$ROOT/brand/logo/icon.png" "$ROOT/ebooks/VERSION" "${PAGINAS[@]/#/$ROOT/}"; do
    printf '%s\0%s\n' "${arquivo#$ROOT/}" "$(sha256sum "$arquivo" | cut -d' ' -f1)"
  done | sha256sum | cut -d' ' -f1
)"

check() {
  test -f "$PDF" && test -f "$EPUB" && test -f "$EBOOKS/ebook-mvpfy.pdf" && test -f "$EBOOKS/ebook-mvpfy.epub"
  cmp -s "$PDF" "$EBOOKS/ebook-mvpfy.pdf"
  cmp -s "$EPUB" "$EBOOKS/ebook-mvpfy.epub"
  python3 - "$MANIFEST" "$VERSION" "$SOURCE_SHA" "$PDF" "$EPUB" <<'PY'
import hashlib, json, sys
from pathlib import Path
manifest = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
if manifest.get("version") != sys.argv[2] or manifest.get("source_sha256") != sys.argv[3]:
    raise SystemExit("Manifesto desatualizado; execute npm run ebook.")
for kind, filename in (("pdf", sys.argv[4]), ("epub", sys.argv[5])):
    record = manifest["artifacts"][kind]
    digest = hashlib.sha256(Path(filename).read_bytes()).hexdigest()
    if record["file"] != Path(filename).name or record["sha256"] != digest:
        raise SystemExit(f"Hash inválido para {filename}")
PY
  pdfinfo "$PDF" | grep -Eq '^Pages:[[:space:]]+[1-9]'
  PDF_TEXT="$(pdftotext "$PDF" -)"
  grep -Fq "MVPFy" <<<"$PDF_TEXT"
  unzip -tqq "$EPUB"
  echo "OK: ebook MVPFy v$VERSION verificado."
}

if [ "${1:-}" = "--check" ]; then check; exit 0; fi
test "$#" -eq 0 || { echo "Uso: ./.ebook/build-ebook.sh [--check]" >&2; exit 1; }
for bin in pandoc weasyprint python3 magick pdfinfo pdftotext unzip; do command -v "$bin" >/dev/null || { echo "Comando ausente: $bin" >&2; exit 1; }; done

mkdir -p "$BUILD" "$EBOOKS"
ln -sfn "$ROOT/brand" "$BUILD/brand"
ln -sfn "../brand" "$ROOT/.ebook/brand"
FONT="$(fc-match -f '%{file}\n' 'DejaVu Sans' | head -1)"
FONT_BOLD="$(fc-match -f '%{file}\n' 'DejaVu Sans:style=Bold' | head -1)"
magick -size 1600x2560 xc:'#ffffff' \
  \( "$ROOT/brand/logo/icon.png" -resize 220x220 \) -geometry +150+170 -composite \
  -font "$FONT_BOLD" -fill '#0f766e' -pointsize 54 -gravity northwest -annotate +150+350 'MVPFy' \
  -fill '#12213e' -pointsize 124 -annotate +150+700 'Primeiro' -annotate +150+850 'MVP SaaS' \
  -font "$FONT" -fill '#334155' -pointsize 48 -annotate +150+1040 'Entrevista, produto, preço e tecnologia' \
  -stroke '#cbd5e1' -strokewidth 4 -draw 'line 150,2200 1450,2200' \
  -stroke none -fill '#64748b' -pointsize 38 -annotate +150+2310 'DOCUMENTAÇÃO COMPLETA' "$COVER"

INPUTS=()
for pagina in "${PAGINAS[@]}"; do INPUTS+=("${pagina#docs/}"); done
(
  cd "$DOCS"
  pandoc "${INPUTS[@]}" --from=gfm --to=html5 --standalone --toc --toc-depth=2 \
    --template="$ROOT/.ebook/template.html" --css="$ROOT/.ebook/pdf.css" \
    --resource-path="$ROOT/.ebook:$ROOT:$DOCS" --metadata-file="$ROOT/.ebook/metadata.yaml" \
    --metadata title="MVPFy — Documentação completa · v$VERSION" --metadata version="$VERSION" \
    --metadata date="$(date +%d/%m/%Y)" --variable brand_name="MVPFy" \
    --variable document_type="Documentação completa" \
    --variable tagline="Entrevista e plano do primeiro SaaS" \
    --variable description="Guia do usuário e referência técnica para transformar uma ideia em um plano de MVP SaaS." \
    --variable source_label="docs/" --variable footer_label="MVPFy — Documentação" \
    --variable logo="$ROOT/brand/logo/icon.png" --output="$HTML"
)
weasyprint "$HTML" "$PDF"
(
  cd "$DOCS"
  pandoc "${INPUTS[@]}" --from=gfm --to=epub3 --standalone --toc --toc-depth=2 \
    --epub-cover-image="$COVER" --css="$ROOT/.ebook/epub.css" \
    --resource-path="$ROOT/.ebook:$ROOT:$DOCS" --metadata-file="$ROOT/.ebook/metadata.yaml" \
    --metadata title="MVPFy — Documentação completa · v$VERSION" --metadata version="$VERSION" --output="$EPUB"
)
cp "$PDF" "$EBOOKS/ebook-mvpfy.pdf"
cp "$EPUB" "$EBOOKS/ebook-mvpfy.epub"
python3 - "$MANIFEST" "$VERSION" "$SOURCE_SHA" "$PDF" "$EPUB" <<'PY'
import hashlib, json, sys
from datetime import datetime, timezone
from pathlib import Path
manifest = {
    "schema_version": 1,
    "version": sys.argv[2],
    "edition": f"v{sys.argv[2]}",
    "generated_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
    "source_sha256": sys.argv[3],
    "artifacts": {},
}
for kind, filename in (("pdf", sys.argv[4]), ("epub", sys.argv[5])):
    path = Path(filename)
    manifest["artifacts"][kind] = {"file": path.name, "sha256": hashlib.sha256(path.read_bytes()).hexdigest()}
Path(sys.argv[1]).write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
PY
check
