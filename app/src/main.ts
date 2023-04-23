import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/*SCSS*/
import "./assets/style/main.scss";
import { defineRule } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules';

// define global rules
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
