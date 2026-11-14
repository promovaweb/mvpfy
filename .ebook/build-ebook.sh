#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOCS="$ROOT/docs/user"
EBOOKS="$ROOT/ebooks"
FRAMEWORK_VERSION="$(tr -d '[:space:]' < "$ROOT/VERSION")"
EBOOK_VERSION="$(tr -d '[:space:]' < "$EBOOKS/VERSION")"
test "$FRAMEWORK_VERSION" = "$EBOOK_VERSION" || {
  echo "Versões divergentes: framework $FRAMEWORK_VERSION, ebook $EBOOK_VERSION" >&2
  exit 1
}
VERSION="$FRAMEWORK_VERSION"
BUILD="$ROOT/.ebook/build"
STEM="MVPFy-Guia-do-Usuario-v$VERSION"
PDF="$EBOOKS/$STEM.pdf"
EPUB="$EBOOKS/$STEM.epub"
HTML="$BUILD/$STEM.html"
COVER="$BUILD/$STEM-cover.png"
MANIFEST="$EBOOKS/build.json"

for arquivo in "$DOCS/reading-order.txt" "$ROOT/.ebook/pdf.css" "$ROOT/.ebook/epub.css" "$ROOT/.ebook/template.html" "$ROOT/.ebook/metadata.yaml" "$ROOT/.ebook/cover.svg" "$ROOT/.ebook/manifest.mjs" "$ROOT/.ebook/fonts/inter-latin.woff2" "$ROOT/.ebook/fonts/manrope-latin.woff2" "$ROOT/brand/logo/icon.png" "$ROOT/brand/logo/logo-light.png"; do
  test -f "$arquivo" || { echo "Fonte ausente: $arquivo" >&2; exit 1; }
done

mapfile -t PAGINAS < <(sed -e '/^[[:space:]]*#/d' -e '/^[[:space:]]*$/d' "$DOCS/reading-order.txt")
test "${#PAGINAS[@]}" -gt 0
for pagina in "${PAGINAS[@]}"; do test -f "$ROOT/$pagina" || { echo "Página ausente: $pagina" >&2; exit 1; }; done

SOURCE_SHA="$(
  for arquivo in "$ROOT/.ebook/build-ebook.sh" "$ROOT/.ebook/pdf.css" "$ROOT/.ebook/epub.css" "$ROOT/.ebook/template.html" "$ROOT/.ebook/metadata.yaml" "$ROOT/.ebook/cover.svg" "$ROOT/.ebook/manifest.mjs" "$ROOT/.ebook/fonts/inter-latin.woff2" "$ROOT/.ebook/fonts/manrope-latin.woff2" "$ROOT/brand/logo/icon.svg" "$ROOT/brand/logo/icon.png" "$ROOT/brand/logo/logo-light.png" "$ROOT/ebooks/VERSION" "${PAGINAS[@]/#/$ROOT/}"; do
    printf '%s\0%s\n' "${arquivo#$ROOT/}" "$(sha256sum "$arquivo" | cut -d' ' -f1)"
  done | sha256sum | cut -d' ' -f1
)"

check() {
  test -f "$PDF" && test -f "$EPUB" && test -f "$EBOOKS/ebook-mvpfy.pdf" && test -f "$EBOOKS/ebook-mvpfy.epub"
  cmp -s "$PDF" "$EBOOKS/ebook-mvpfy.pdf"
  cmp -s "$EPUB" "$EBOOKS/ebook-mvpfy.epub"
  node "$ROOT/.ebook/manifest.mjs" check "$MANIFEST" "$VERSION" "$SOURCE_SHA" "$PDF" "$EPUB"
  pdfinfo "$PDF" | grep -Eq '^Pages:[[:space:]]+[1-9]'
  PDF_TEXT="$(pdftotext "$PDF" -)"
  grep -Fq "MVPFy" <<<"$PDF_TEXT"
  unzip -tqq "$EPUB"
  echo "OK: ebook MVPFy v$VERSION verificado."
}

if [ "${1:-}" = "--check" ]; then check; exit 0; fi
test "$#" -eq 0 || { echo "Uso: ./.ebook/build-ebook.sh [--check]" >&2; exit 1; }
for bin in pandoc weasyprint node magick pdfinfo pdftotext unzip; do command -v "$bin" >/dev/null || { echo "Comando ausente: $bin" >&2; exit 1; }; done

mkdir -p "$BUILD" "$EBOOKS"
ln -sfn "$ROOT/brand" "$BUILD/brand"
ln -sfn "../brand" "$ROOT/.ebook/brand"
FONT="$(fc-match -f '%{file}\n' 'DejaVu Sans' | head -1)"
FONT_BOLD="$(fc-match -f '%{file}\n' 'DejaVu Sans:style=Bold' | head -1)"
magick -size 1600x2560 xc:'#FFFFFF' \
  \( "$ROOT/brand/logo/logo-light.png" -resize 560x \) -geometry +150+170 -composite \
  -font "$FONT_BOLD" -fill '#00161E' -pointsize 124 -gravity northwest -annotate +150+700 'Primeiro' -annotate +150+850 'MVP SaaS' \
  -font "$FONT" -fill '#2D4C58' -pointsize 48 -annotate +150+1040 'Entrevista, produto, preço e tecnologia' \
  -stroke '#C9D6DC' -strokewidth 4 -draw 'line 150,2200 1450,2200' \
  -stroke none -fill '#B45309' -pointsize 38 -annotate +150+2310 'GUIA DO USUÁRIO' "$COVER"

INPUTS=()
for pagina in "${PAGINAS[@]}"; do INPUTS+=("${pagina#docs/user/}"); done
(
  cd "$DOCS"
  pandoc "${INPUTS[@]}" --from=gfm --to=html5 --standalone --toc --toc-depth=2 \
    --template="$ROOT/.ebook/template.html" --css="$ROOT/.ebook/pdf.css" \
    --resource-path="$ROOT/.ebook:$ROOT:$DOCS" --metadata-file="$ROOT/.ebook/metadata.yaml" \
    --metadata title="MVPFy — Guia do usuário · v$VERSION" --metadata version="$VERSION" \
    --metadata date="$(date +%d/%m/%Y)" --variable brand_name="MVPFy" \
    --variable document_type="Guia do usuário" \
    --variable tagline="Defina o primeiro MVP SaaS" \
    --variable description="Percurso do usuário para transformar uma ideia em um plano de MVP SaaS." \
    --variable source_label="docs/user/" --variable footer_label="MVPFy — Guia do usuário" \
    --variable logo="$ROOT/brand/logo/icon.png" --output="$HTML"
)
weasyprint "$HTML" "$PDF"
(
  cd "$DOCS"
  pandoc "${INPUTS[@]}" --from=gfm --to=epub3 --standalone --toc --toc-depth=2 \
    --epub-cover-image="$COVER" --css="$ROOT/.ebook/epub.css" \
    --resource-path="$ROOT/.ebook:$ROOT:$DOCS" --metadata-file="$ROOT/.ebook/metadata.yaml" \
    --metadata title="MVPFy — Guia do usuário · v$VERSION" --metadata version="$VERSION" --output="$EPUB"
)
cp "$PDF" "$EBOOKS/ebook-mvpfy.pdf"
cp "$EPUB" "$EBOOKS/ebook-mvpfy.epub"
node "$ROOT/.ebook/manifest.mjs" write "$MANIFEST" "$VERSION" "$SOURCE_SHA" "$PDF" "$EPUB"
check
