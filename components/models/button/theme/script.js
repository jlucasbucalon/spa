const isBrowser = typeof window !== 'undefined'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light'
}

function getSavedTheme() {
  return localStorage.getItem('theme')
}

function applyTheme(theme) {
  const html = document.documentElement
  const safeTheme = theme === 'dark' ? 'dark' : 'light'

  html.dataset.theme = safeTheme
  localStorage.setItem('theme', safeTheme)

  document
    .querySelectorAll('.button-theme')
    .forEach((toggle) => {
      toggle.setAttribute(
        'aria-pressed',
        String(safeTheme === 'dark')
      )
    })
}

function initTheme() {
  const saved = getSavedTheme()
  applyTheme(saved || getSystemTheme())
}

function bindThemeToggle(root = document) {
  if (!root || !root.querySelectorAll) return

  root.querySelectorAll('.button-theme').forEach((toggle) => {
    if (toggle.dataset.themeBound === 'true') return

    toggle.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme || 'light'
      const next = current === 'dark' ? 'light' : 'dark'
      applyTheme(next)
    })

    toggle.dataset.themeBound = 'true'
  })
}

if (isBrowser) {
  document.addEventListener('DOMContentLoaded', () => {
    bindThemeToggle()
    initTheme()
  })

  document.addEventListener('spa:pageLoaded', (event) => {
    bindThemeToggle(event?.target || document)
  })
}
