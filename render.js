import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { imageMap } from './src/assets.js'
import { routes } from './src/path.js'

// ------------------
// PATH FIX
// ------------------

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function matchRoute(url) {
  return routes.find((r) => r.path.test(url))
}

// ------------------
// LOAD HTML FILE
// ------------------

async function loadHTML(file) {
  const filePath = path.join(__dirname, 'pages', file)
  return await fs.readFile(filePath, 'utf-8')
}

// ------------------
// SSR IMAGE RESOLVER
// ------------------

function resolveImages(html) {
  return html.replace(/data-image="(.*?)"/g, (_, name) => {
    const src = imageMap[name]
    if (!src) return ''
    return `src="${src}"`
  })
}

// ------------------
// TEMPLATE FINAL
// ------------------

async function buildHTML(content) {
  const template = await fs.readFile(
    path.join(__dirname, 'index.html'),
    'utf-8'
  )

  return template.replace(
    /(<main\s+id=["']route["'][^>]*>)[\s\S]*?(<\/main>)/i,
    `$1${content}$2`
  )
}

// ------------------
// MAIN SSR
// ------------------

export async function renderPage(url) {
  const route = matchRoute(url)

  if (!route) {
    return `<h1>404</h1><p>${url}</p>`
  }

  const pageFile = route.page.replace(/^\/pages\//, '')
  let html = await loadHTML(`${pageFile}.html`)

  html = resolveImages(html)

  return await buildHTML(html)
}
