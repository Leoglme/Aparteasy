import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VCalendar from 'v-calendar';
import App from './App.vue'
import router from './router'
import 'v-calendar/style.css';
/*SCSS*/
import "./assets/style/main.scss";

/*vee-validate*/
import { localize } from '@vee-validate/i18n';
import fr from '@vee-validate/i18n/dist/locale/fr.json';
import { configure, defineRule } from 'vee-validate'
import { required, email, min, confirmed, url, numeric } from '@vee-validate/rules';

/*EVENTS*/
import './events/socket'


// define global rules
defineRule('required', required);
defineRule('email', email);
defineRule('confirmed', confirmed);
defineRule('min', min);
defineRule('url', url);
defineRule('numeric', numeric);

localize({ fr });

// Activate the locale
configure({
    generateMessage: localize('fr', {
        names: {},
    }),
});

const app = createApp(App)

/*Directives*/
import clickOutSide from "@/directives/clickOutSide";
app.directive("clickOutSide", clickOutSide)
app.use(createPinia())
app.use(router)
app.use(VCalendar);


app.mount('#app')
