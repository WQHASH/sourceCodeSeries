import IconSvg from 'components/Icon-svg/';

//注册全局组件
const install = Vue => {
	Vue.component("Icon", IconSvg)
};

export default install