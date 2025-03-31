import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.scss';

const app = createApp(App).use(router);

// app.use(PrimeVue);
app.mount('#app');

createApp(App).use(router).mount('#app');
