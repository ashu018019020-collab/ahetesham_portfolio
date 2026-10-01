// Minimal static file server for the Next.js `out/` export. Used by
// playwright.config.ts as its webServer (no extra dependency, MIME-correct).
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('../out', import.meta.url))
const PORT = 4173

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain',
  '.woff2': 'font/woff2',
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`)
    // Work in URL space (forward slashes on every OS), then resolve traversal
    // segment-by-segment — normalize() would produce backslashes on Windows.
    const parts = decodeURIComponent(url.pathname)
      .split('/')
      .filter((p) => p && p !== '.' && p !== '..')
    let rel = parts.join('/')
    if (rel === '' || rel.endsWith('/')) rel += 'index.html'
    if (!extname(rel)) rel += '.html'
    const file = join(ROOT, rel)
    if (!file.startsWith(ROOT)) throw new Error('outside root')
    const body = await readFile(file)
    res.writeHead(200, { 'content-type': MIME[extname(rel)] || 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('Not found')
  }
}).listen(PORT, () => console.log(`static server on http://localhost:${PORT}`))
