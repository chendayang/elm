<template>
<div class="goods">
  <div class="menu-wrapper" ref="menuWrapper">
    <ul>
      <li v-for="(item,index) in goods" class="menu-item" v-bind:class="{'current':currentIndex === index}" v-on:click="selectMenu(index,$event)">
        
        <span class="text"><span v-show="item.type>0" class="icon" v-bind:class="classMap[item.type]"></span>{{item.name}}</span>
      </li>
    </ul>
  </div>
  <div class="foods-wrapper" ref="foodsWrapper">
    <ul>
      <li v-for="item in goods" class="food-list food-list-hook">
        <h1 class="title">{{item.name}}</h1>
        <ul>
          <li v-for="food in item.foods" class="food-item" v-on:click="selectFood(food,$event)">
            <div class="icon">
              <img v-bind:src="food.icon">
            </div>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="desc">{{food.description}}</p>
              <div class="extra">
                <span class="count">月售{{food.sellCount}}份</span>
                <span>好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="now">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice>0">{{food.oldPrice}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol v-bind:food="food" v-on:increment="incrementTotal"></cartcontrol>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <shopcart ref=shopcart v-bind:delivery-price="seller.deliveryPrice" v-bind:minPrice="seller.minPrice" v-bind:select-foods="selectFoods"></shopcart>
  <food v-bind:food="selectedFood" ref="food"></food>
</div>
</template>

<script>
import Bscroll from 'better-scroll'
import shopcart from 'components/shopcart/shopcart.vue'
import cartcontrol from 'components/cartcontrol/cartcontrol.vue'
import food from 'components/food/food.vue'
let ERR_OK= 0
export default {
  props:{
    seller:{
      type:Object
    }
  },
  events:{
    'cart.add' (target){
      this._drop(target)
    }
  },
  components:{
    shopcart,
    cartcontrol,
    food
  },
  data () {
    return {
      goods: {},
      listHeight: [],
      scrollY: 0,
      selectedFood:{}
    }
  },
  computed:{
    currentIndex () {
      for (let i = 0; i< this.listHeight.length; i++){
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i+1]
        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
          return i
        }
      }
      return 0
    },
    selectFoods() {
      let foods = []
      this.goods.forEach((good)=>{
        good.foods.forEach((food)=>{
          if(food.count){
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created () {
    this.$http.get('/api/goods').then(
      (res)=>{
        res=res.body
        if(res.errno === ERR_OK) {
          this.goods =res.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
      })
        }
      }
    )
    this.classMap= ['decrease','discount','special','invoice','guarantee']
  },
  methods: {
    incrementTotal(target) {
      this.$nextTick(()=> {
        this.$refs.shopcart.drop(target)
      })
    },
    _initScroll() {
      this.meunScroll = new Bscroll(this.$refs.menuWrapper,{
        click: true
      })
      this.foodsScroll = new Bscroll(this.$refs.foodsWrapper,{
        probeType: 3,
        click:true
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight() {
      let foodList =this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for(let i = 0; i<foodList.length; i++){
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu(index, event) {
      if(!event._constructed){
        return
      }
      // console.log(index)
      let foodList= this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el,300)
    },
    selectFood(food,event) {
      if(!event._constructed){
        return
      }
      this.selectedFood = food
      this.$refs.food.show()
      console.log('a')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/css" scoped>
.goods{
  position:absolute;
  width:100%;
  top:177px;
  bottom:46px;
  display:flex;
  overflow:hidden;
  .menu-wrapper{
    flex:0 0 80px;
    width:80px;
    background:#f3f5f7;
    .menu-item{
      display:table;
      padding:0 12px;
      // text-align:center;
      width:56px;
      line-height:14px;
      height:54px;
      border-bottom: 1px solid rgba(7,17,27,0.2);
      &.current{
        background:#fff;
        font-weight:700;
        border:none;
        position:relative;
        margin-top:-1px;
        z-index:10;
      }
      .icon{
        display:inline-block;
        width:12px;
        height:12px;
        vertical-align: top;
        margin-right:2px;
        background-size:12px 12px;
        background-repeat:no-repeat;
        &.decrease{
          background-image:url('./decrease_3@2x.png')
        };
        &.discount{
          background-image:url('./discount_3@2x.png')
        };
        &.guarantee{
          background-image:url('./guarantee_3@2x.png')
        };
        &.invoice{
          background-image:url('./invoice_3@2x.png')
        };
        &.special{
          background-image:url('./special_3@2x.png')
        }
      } 
      .text{
        display:table-cell;
        vertical-align:middle;
        font-size:12px;
        width:56px;
        // vertical-align:middle;
      }
    }
  }
  .foods-wrapper{
    flex:1 1 auto;
    .title{
      padding-left:14px;
      border-left:2px solid #d9dde1;
      height:26px;
      line-height:26px;
      font-size:12px;
      color:rgb(147,153,159);
      background:#f3f5f7;
    }
    .food-item{
      display:flex;
      margin:18px;
      padding-bottom:18px;
      border-bottom:1px solid rgba(7,17,27,0.1);
      &:last-child{
        border:none;
        margin-bottom:0;
      }
      .icon{
        flex:0 0 57px;
        margin-right:10px;
        img{
          width:57px;
          heigth:57px;
        }
      };
      .content{
        flex:1 1 auto;
        position:relative;
        .name{
          margin:2px 0 8px 0;
          height:14px;
          line-height:14px;
          font-size:14px;
          color:rgb(7,17,27);
          font-weight:700;
        }
        .desc{
          margin-bottom:8px;
          
        }
        .desc, .extra{
          line-height:10px;
          font-size:10px;
          color:rgb(147,153,159);
        }
        .extra{
          .count{
            margin-right:5px;
          }
        }
        .price{
          font-weight:700;
          line-height:24px;
          .now{
            font-size:14px;
            color:rgb(240,20,20);
            margin-right:8px;
          }
          .old{
            text-decoration:line-through;
            font-size:10px;
            color:rgb(147,153,159);
          }

        }
        .cartcontrol-wrapper{
          position:absolute;
          right:0;
          bottom:12px;
        }
      };
    }

  }
}

</style>
