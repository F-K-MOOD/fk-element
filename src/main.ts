import './styles/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { createApp } from 'vue'

library.add(far, fas)


import App from './App.vue'

const app = createApp(App)

app.config.globalProperties.$sayHello = () => {
  console.log('hello')
}

app.mount('#app')



