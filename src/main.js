/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import './assets/main.css'
import './style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';
import Button from 'primevue/button'
import MultiSelect from 'primevue/multiselect'
import Select from 'primevue/select'
import FloatLabel from 'primevue/floatlabel'
import { InputNumber, InputText} from 'primevue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
 })
app.component('Button', Button)
app.component('MultiSelect', MultiSelect)
app.component('Select', Select)
app.component('FloatLabel', FloatLabel)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.use(router)

app.mount('#app')
