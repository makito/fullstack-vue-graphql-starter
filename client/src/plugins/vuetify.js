import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  theme:  {
    primary: '#4caf50',
    secondary: '#ff5722',
    accent: '#009688',
    error: '#f44336',
    warning: '#ffc107',
    info: '#2196f3',
    success: '#8bc34a'
  }
});

export default new Vuetify({
});
