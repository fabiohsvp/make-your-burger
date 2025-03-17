// Main application entry point
// Initializes Vue application and sets up global configurations
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import apiCache from './mixins/apiCache'

// Create Vue application instance
const app = createApp(App)
// Add global mixin for API caching functionality
app.mixin(apiCache)
// Register router for navigation
app.use(router)
// Mount application to DOM element with id 'app'
app.mount('#app')
