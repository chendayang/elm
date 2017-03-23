<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <vheader v-bind:seller="seller">
    </vheader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
    <router-view v-bind:seller="seller" v-bind:ratings="ratings"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import vheader from './components/header/header.vue'
let ERR_OK = 0
export default {
  name: 'app',
  data () {
    return {
      seller: {},
      ratings:[]
    }
  },
  created() {
    this.$http.get('/api/seller').then(
      (res) => {
        res = res.body
        if(res.errno === ERR_OK) {
          this.seller = res.data
          // console.log(this.seller)
        }
      }, () => {}
    )
    this.$http.get('/api/ratings').then(
      (res)=>{
        res=res.body
        if(res.errno===ERR_OK){
          this.ratings=res.data
          // console.log(this.ratings)
        }
      }
    )
  },
  components: {
    vheader: vheader
  }
}
</script>

<style lang="less"  rel="stylesheet/css" scoped>
@import './common/css/icon.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
.tab{
    display:flex;
    width:100%;
    height:40px;
    line-height:40px;
    border-bottom:1px solid rgba(7,17,27,0.1);
    .tab-item{
      display:flax-item;
      flex:1;
      text-align: center;
      >a{
      display:block;
      font-size:14px;
      color:rgb(77,85,93);
      &.router-link-active{
        color:rgb(240,20,20)
      }
      }
    }
  }
}
</style>
