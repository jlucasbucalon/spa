export function handleNavigation(resolveRoute) {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a')

    if (!link) return

    const href = link.getAttribute('href')

    if (!href) return

    // Navegação entre páginas da SPA
    if (link.hasAttribute('page')) {
      event.preventDefault()

      if (window.location.hash !== href) {
        window.location.hash = href
      } else {
        resolveRoute()
      }

      return
    }

    // Navegação dentro da página
    if (link.hasAttribute('move')) {
      event.preventDefault()

      const target = document.querySelector(href)

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }

      return
    }
  })
}
