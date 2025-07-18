import { createApp } from 'vue'
import './style.css'
import './spacing.css'
import './theme.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faR } from '@fortawesome/free-solid-svg-icons/faR'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { router } from './router'

setupFontAwesome()

// Create the app instance
const app = createApp(App)
app.use(router)

// Mount the app
app.mount('#app')

function setupFontAwesome() {
  library.add(fas)
  library.add(faR)
  library.add(fab) // fontawesome brands
}
