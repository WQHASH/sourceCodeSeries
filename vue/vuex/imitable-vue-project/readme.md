#学习vue时的笔记：	
#####关于vue中的 watch用法
	new Vue({
		data:{
			firstName: 'Dawei',
		    lastName: 'Lou',
		    fullName: ''
		},
		watch: {
			firstName(nv, ov){}
		}
	});
	//这种是简单的监听

	###立即执行回调
	vue的监听类似Angular中的，只有当监听对象发生改变时才会执行之前定义的回调函数 (这里Ng可以用时间戳来处理)

	vue自己内部定义了 immediate 该属性值为Boolean 默认fasle 不立即执行
	As: 
		watch: {
		 firstName: {
		  handler(newName, oldName) {
		   this.fullName = newName + ' ' + this.lastName;
		  },
		  // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
		  immediate: true
		 }
		}

	###深度监听（监听对象类型）
		watch: {
			 obj: {
			  handler(newName, oldName) {
			   console.log('obj.a changed');
			  },
			  immediate: true,
			  deep: true   
			  // 这样只要obj 对象中每一个值有改变，监听器就会一层层遍历，
			  // 如果只是要监听obj.a这一个可以 写成  watch("obj.a":{})这种字符串的形式
			  // 减小性能开销
			 }
		}

#####vue 监听$route的方式
	 vue中watch能监听的 => 只要可以动过this的方式拿到的属性，watch 就可以监听到


#####关于路由的跳转的使用：
	有两种： 
		第一： <router-link :to="path"> </router-link> 在页面中的跳转
		第二： this.$router.push('path')  在js中的跳转
		个人理解这2中的用法，页面跳转的对于有v-for在页面中配合使用效果很好
		js中跳转的可能在配合某个方法中跳转单个路由，