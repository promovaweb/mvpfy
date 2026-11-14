/**
 * Grava e confere o manifesto `ebooks/build.json` do ebook do MVPFy.
 *
 * Uso:
 *   node .ebook/manifest.mjs write <manifest> <versão> <sha-das-fontes> <pdf> <epub>
 *   node .ebook/manifest.mjs check <manifest> <versão> <sha-das-fontes> <pdf> <epub>
 *
 * `write` registra versão, edição, data UTC, hash das fontes e o SHA-256 de
 * cada artefato. `check` sai com código 1 quando a versão, o hash das fontes
 * ou o hash de um artefato diverge do que está gravado.
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';

const [mode, manifestPath, version, sourceSha, pdf, epub] = process.argv.slice(2);
const artifacts = [['pdf', pdf], ['epub', epub]];

/** SHA-256 hexadecimal do arquivo informado. */
const sha256 = (file) => createHash('sha256').update(readFileSync(file)).digest('hex');

if (mode === 'write') {
  const manifest = {
    schema_version: 1,
    version,
    edition: `v${version}`,
    generated_at: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
    source_sha256: sourceSha,
    artifacts: Object.fromEntries(artifacts.map(([kind, file]) => [kind, { file: basename(file), sha256: sha256(file) }])),
  };
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
} else if (mode === 'check') {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  if (manifest.version !== version || manifest.source_sha256 !== sourceSha) {
    console.error('Manifesto desatualizado; execute npm run ebook.');
    process.exit(1);
  }
  for (const [kind, file] of artifacts) {
    const record = manifest.artifacts?.[kind];
    if (!record || record.file !== basename(file) || record.sha256 !== sha256(file)) {
      console.error(`Hash inválido para ${file}`);
      process.exit(1);
    }
  }
} else {
  console.error('Uso: node .ebook/manifest.mjs write|check <manifest> <versão> <sha> <pdf> <epub>');
  process.exit(1);
}
