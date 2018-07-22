<template>
	<div class="sidebar">
		<!--router: 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
		<!-- :default-active 当前激活菜单的 index [所有这里的 router 和 ：default-active是配合一起使用的] -->
		<el-menu router class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened >
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-submenu :index="item.index" :key="item.index">
						<template slot="title">
	                        <i :class="item.icon"></i>
	                        <span slot="title">{{ item.title }}</span>
	                    </template>
	                    <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
	                        {{ subItem.title }}
	                    </el-menu-item>
					</el-submenu>
				</template>

				<template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
			</template>
			

		</el-menu>
	</div>
</template>
<script>
	import bus from '../common/bus.js';
	export default {
		data(){
			return {
				collapse: false,
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'dashboard',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'table',
                        title: '基础表格'
                    },
                    {
                        icon: 'el-icon-message',
                        index: 'tabs',
                        title: 'tab选项卡'
                    },
                    {
                        icon: 'el-icon-date',
                        index: '3',
                        title: '表单相关',
                        subs: [
                            {
                                index: 'form',
                                title: '基本表单'
                            },
                            {
                                index: 'editor',
                                title: '富文本编辑器'
                            },
                            {
                                index: 'markdown',
                                title: 'markdown编辑器'
                            },
                            {
                                index: 'upload',
                                title: '文件上传'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'charts',
                        title: 'schart图表'
                    },
                    {
                        icon: 'el-icon-rank',
                        index: 'drag',
                        title: '拖拽列表'
                    },
                    {
                        icon: 'el-icon-warning',
                        index: 'permission',
                        title: '权限测试'
                    },
                    {
                        icon: 'el-icon-error',
                        index: '404',
                        title: '404页面'
                    }
                ]
			}
		},
		computed: {
			onRoutes(){
				return this.$route.path.replace('/','');
			},
		},
		create(){
			// bus.$on('collapse', (msg) => {
			// 	this.collapse = msg;
			// 	console.log(this.collapse, "sidebar-collapse");
			// })
			// 
			bus.$on('collapse', msg => {
                this.collapse = msg;
            });
		},

	};
</script>
<style scoped>
	.sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>