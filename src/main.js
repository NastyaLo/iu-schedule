import '@babel/polyfill'

import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import DaySpanVuetify from './plugin'

import 'vuetify/dist/vuetify.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'dayspan-vuetify/dist/lib/dayspan-vuetify.min.css'
import ru from './locales/ru';

Vue.config.productionTip = false;

Vue.use(Vuetify);

Vue.use(DaySpanVuetify, {
    data: { locales: {ru} },
    methods: {
        getDefaultEventColor: function() {
            return '#1976d2';
        }
    }
});

new Vue({
  el: '#app',
    components: { App },
    template: '<App/>',
})
