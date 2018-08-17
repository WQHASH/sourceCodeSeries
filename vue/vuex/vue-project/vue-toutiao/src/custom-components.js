import IconSvg from 'components/Icon-svg'
import Github from 'components/Github'
import NoneData from 'components/NoneData/index'
import NoneData2 from 'components/NoneData/index2'
import HeaderBar from 'components/HeaderBar'
import SwitchCheck from 'components/Switch'
import CircleLoading from 'components/CircleLoading/index.vue'
import FullCircleLoading from 'components/CircleLoading/full-loading.vue'
import DefaultLoading from 'components/DefaultLoading/index.vue'
import Alert from 'components/Dialog/index.js'
import { showLoading, hideLoading } from './components/DefaultLoading/index.js'
import { showCircleLoading, hideCircleLoading } from './components/CircleLoading/full-loading.js'

// const insta = function(Vue){return {Vue.component('','')}}

//  Vue.component('tagName', options) => 来创建一个全局组件这些组件全部挂载在与根实例同级下
//  但是这种方法是与根实例写在同一个文件中，如果要同时注册多个全局组件，就会使根实例文件过重，因此使用Vue.use()来“安装”全局组件，就显得更轻一些。 
const install = Vue => {
    Vue.component('Icon', IconSvg)
    Vue.component('Github', Github)
    Vue.component('NoneData', NoneData)
    Vue.component('NoneData2', NoneData2)
    Vue.component('HeaderBar', HeaderBar)
    Vue.component('SwitchCheck', SwitchCheck)
    Vue.component('CircleLoading', CircleLoading)
    Vue.component('FullCircleLoading', FullCircleLoading)
    Vue.component('DefaultLoading', DefaultLoading)

    Vue.prototype.$alert = Alert
    Vue.prototype.$showLoading = showLoading
    Vue.prototype.$hideLoading = hideLoading
    Vue.prototype.$showCircleLoading = showCircleLoading
    Vue.prototype.$hideCircleLoading = hideCircleLoading
}

export default install
