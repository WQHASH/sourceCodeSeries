import IconSvg from 'components/Icon-svg/';
import CircleLoading from 'components/CircleLoading/index.vue';

//注册全局组件
const install = Vue => {
	Vue.component("Icon", IconSvg)
	Vue.component("CircleLoading", CircleLoading)
	
};

export default install