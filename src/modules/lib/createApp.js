import { createRouter } from '../router/index.js'
import { initOptimize } from '../optimize/index.js'
import { loadModels } from './model.js'
import { loadAllComponents } from './layout.js'

export function createApp({ childrens, config, root }) {
  return {
    mount() {
      if (!root) return

      initOptimize()

      const router = createRouter({
        childrens,
        config,
        root,
      })

      router.init()

      // 🔥 PRIMEIRA EXECUÇÃO (FALTAVA ISSO)
      loadModels(document, config)
      loadAllComponents(document)

      document.addEventListener('spa:pageLoaded', (e) => {
        const container = document

        loadModels(container, config)
        loadAllComponents(container)
      })
    },
  }
}
