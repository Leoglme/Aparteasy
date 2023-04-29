import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/*SCSS*/
import "./assets/style/main.scss";

/*vee-validate*/
import { localize } from '@vee-validate/i18n';
import fr from '@vee-validate/i18n/dist/locale/fr.json';
import { configure, defineRule } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules';

/*EVENTS*/
import './events/socket'

// define global rules
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

localize({ fr });

// Activate the locale
configure({
    generateMessage: localize('fr', {
        names: {},
    }),
});

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
