<template>
  <div class="">
    <h2>vuex 学习</h2>
    <div>
    </div>  
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methond(){},
  computed: mapState({
    count: state => state.count,
    countAlias: 'count',
    countPlusLocalState (state) {
      return state.count + this.localCount
    },
  }),
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
