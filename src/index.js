import Vue from 'vue'
import App from './app.vue'
import './assets/styles/style.css'
import './assets/styles/test.less'
import './assets/images/logo192.png'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
          render: h => h(App),
        }).$mount(root)
