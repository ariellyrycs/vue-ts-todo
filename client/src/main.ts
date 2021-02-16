import VueCompositionAPI from '@vue/composition-api';
import Vue from 'vue';

import App from './App.vue';
import * as recipeHelpers from './helpers.ts';

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI);

type MyFn = (...args: any[]) => any;
type MyMap = { [key: string]: MyFn };
const helpers: MyMap = recipeHelpers as MyMap;

Object.keys(helpers).forEach((key) => Vue.filter(key, helpers[key]));

new Vue({
  render: (h) => h(App),
}).$mount('#app');
