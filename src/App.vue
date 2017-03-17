<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <vheader>
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
    <router-view></router-view>
  </div>
</template>

<script>
import vheader from './components/header/header.vue'
export default {
  name: 'app',
  components: {
    vheader: vheader
  }
}
</script>

<style  rel="stylesheet/css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;


}
#app .tab{
    display:flex;
    width:100%;
    height:40px;
    line-height:40px;
  }
#app .tab .tab-item{
  display:flax-item;
  flex:1;
  text-align: center;
}
</style>
