import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.scss';

const app = createApp(App);

app.use(router);
// app.use(PrimeVue); // Uncomment if needed

app.mount('#app'); // Mount only once

