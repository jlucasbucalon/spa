import {
  bindThemeToggle,
  initTheme,
} from './src/modules/core/theme.js'

function bootstrap() {
  initTheme()
  bindThemeToggle()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap)
} else {
  bootstrap()
}
