<template>
  <div class="problemList">
   	我是问题列表
  </div>
</template>


<script>

	export default{
		name:"problemList",
		data(){ return {}},
		created(){
				function* add(){
					yield 123+1;		//yield表达式，定义不同的内部状态，能暂停函数下面内容，能返回表达式值
					yield "xixi";
					console.log(11)
					return 12				//return 在这里也和yield一样，区别是，return只能执行一次
				}
				let fun = add();	//返回遍历器对象，只有调用next() 方法才会遍历下一个内部状态

				// console.log(fun.next())
				// console.log(fun.next())
				// console.log(fun.next())

			function time(){
				return new Promise((res, rej)=>{
					setTimeout(()=>{
						console.log("等待");
						res();
					})
				})
			}
			 async function AsyncFun(){
				 await time();
				 console.log("最后执行");
			 };
			 AsyncFun();

		},
		mounted(){},

	};
</script>