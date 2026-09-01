export function handleNavigation(resolveRoute) {
  function smoothScrollTo(target, duration = 800) {
    const start = window.scrollY
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY

    const distance = targetPosition - start
    let startTime = null

    function animation(currentTime) {
      if (startTime === null) {
        startTime = currentTime
      }

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease-in-out
      const easing =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2

      window.scrollTo(0, start + distance * easing)

      if (progress < 1) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a')

    if (!link) return

    const href = link.getAttribute('href')

    if (!href) return

    // =========================
    // NAVEGAÇÃO SPA
    // =========================

    if (link.hasAttribute('page')) {
      event.preventDefault()

      if (window.location.hash !== href) {
        window.location.hash = href
      } else {
        resolveRoute()
      }

      return
    }

    // =========================
    // SCROLL INTERNO
    // =========================

    if (link.hasAttribute('move')) {
      event.preventDefault()

      const target = document.querySelector(href)

      if (!target) return

      const duration = Number(link.dataset.duration) || 800

      smoothScrollTo(target, duration)

      return
    }
  })
}
