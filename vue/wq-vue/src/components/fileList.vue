<template>
  <div class='fileList'>
		<ul>
			<li v-for="item in fileListData">
				{{item.showname}}
			</li>
		</ul>


	</div>
</template>

<script>
import { Navbar, TabItem } from "mint-ui"
import {mapGetters} from 'vuex'
export default {
  name: "fileList",
  data() {
    return {
			selected: 1,
			fileListData: [],
    };
  },
  components: {
    Navbar: Navbar.name,
    TabItem: TabItem.name
	},
	mounted(){
		this.fileListData = this.fileList;
		console.log(this.fileListData)
	},
  computed: {
    ...mapGetters(["fileList"])
	},
	methods: {
		add(){}

	},
};
</script>

<style lang="scss">
$color:red;
	ul, li{
		list-style-type: none;
		color:$color;
		font-size: 18px;
		text-align: left
	}
</style>