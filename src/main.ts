import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '/src/style.css'

console.log('Vue app is mounting...')

try {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)
  app.mount('#app')
} catch (err) {
  console.error('Error mounting Vue:', err)
}
