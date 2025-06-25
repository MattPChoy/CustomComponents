import { createApp } from 'vue'
import './style.css'
import './spacing.css'
import './theme.css'
import App from './App.vue'
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {faR} from "@fortawesome/free-solid-svg-icons/faR";

setupFontAwesome();

// Create the app instance
const app = createApp(App)


// Mount the app
app.mount('#app')

function setupFontAwesome() {
    library.add(fas);
    library.add(faR);
}