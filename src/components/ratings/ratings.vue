<template>
  <div class="ratings">
    <div>
      <div class="ratings-contnet">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star v-bind:size="24" v-bind:score="seller.score"></star>
            <span class="score">{{seller.score}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">食物评分</span>
            <star v-bind:size="24" v-bind:score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
    </div>
    <split></split>
    <ratingselect v-bind:selectType="selectType" v-bind:onlyContent="onlyContent" v-bind:ratings="ratings" v-on:ratingChange="ratingChange"></ratingselect>
    <div class="rating-wrapper">
      <ul>
        <li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item"
        >
          <div class="avatar">
            <img width="28" height="28" v-bind:src="rating.avatar">
          </div>
          <div class="content">
            <h1 class="name">{{rating.username}}</h1>
            <div class="star-wrapper">
              <star size="24" v-bind:score="rating.score"></star>
              <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
            </div>
            <p class="text">{{rating.text}}</p>
            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
              <span class="icon-thumb_up"></span>
              <span class="item" v-for="item in rating.recommend">{{item}}</span>
            </div>  
            <div class="time">{{realtime(rating.rateTime)}}</div>
          </div>
        </li>
      </ul>
    </div>
    </div>
  </div>
</template>

<script>
import star from 'components/star/star.vue'
import split from 'components/split/split.vue'
import Bscroll from 'better-scroll'
import ratingselect from 'components/ratingselect/ratingselect.vue'
const ALL=2
// const ERR_OK=0
export default {
  props:{
    seller:{
      type:Object
    },
    ratings:{
      type:Object
    }
  },
  components:{
    star,
    split,
    ratingselect
  },
  data(){
    return{
      // ratings:[],
      showFlag:false,
      selectType:ALL,
      onlyContent:true
    }
  },
  created(){
    this.$nextTick(()=>{
      this.scroll=new Bscroll(this.$el,{
        click:true
      })
    })
  },
  methods:{
    ratingChange(type,data){
      this[type]=data
      this.$nextTick(()=> {
      this.scroll.refresh()
      })
    },
    needShow(type,text){
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    realtime(time){
      let date =new Date(time)
      let str=''
      str+=date.getFullYear()+'-'
      str+=(date.getMonth()+1)+'-'
      str+=date.getDate()+' '
      str+=date.getHours()+':'
      str+=date.getSeconds()
      return str
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/css" scoped>
.ratings{
  position:absolute;
  top:174px;
  bottom:0;
  left:0;
  width:100%;
  overflow:hidden;
  .overview{
    display:flex;
    padding:18px 0 18px 18px;
    .overview-left{
      flex:0 0 137px;
      width:137px;
      padding:6px 0px;
      border-right:1px solid rgba(7,17,27,0.1);
      text-align:center;
      .score{
        margin-bottom:12px;
        margin-top:8px;
        line-height:28px;
        font-size:24px;
        color:rgb(255,153,0);
      }
      .title{
        margin-bottom:12px;
        line-height:12px;
        font-size:12px;
        color:rgb(7,17,27);
      }
      .rank{
        line-height:10px;
        font-size:12px;
        color:rgb(147,153,159);
      }
    }
    .overview-right{
      flex:1;
      padding:6px 0 6px 24px;
      .score-wrapper{
        line-height: 18px;
        margin-top:8px;
        font-size:0;
        .title{
          font-weight:700;
          display: inline-block;
          vertical-align: top;
          line-height: 22px;
          font-size: 12px;
          color:rgb(7,17,27);
        }
        .star{
          display:inline-block;
          margin:0 12px;
          vertical-align:top;
        }
        .score{
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          font-size:14px;
          color:rgb(266,153,0);
        }
      }
      .delivery-wrapper{
        font-size:0;
        margin-top:8px;
        .title{
          font-weight:700;
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          font-size: 12px;
          color:rgb(7,17,27);
        }
        .delivery{
          display: inline-block;
          margin-left:12px;
          vertical-align:top;
          line-height: 18px;
          font-size:12px;
          color:rgb(147,153,159);
        }
      }
    }
  }
  .rating-wrapper{
    padding:0 18px;
    .rating-item{
      display:flex;
      padding:18px 0;
      border-bottom:1px solid rgba(7,17,27,0.1);
      .avatar{
        flex:0 0 28px;
        width:28px;
        margin-right:12px;
        img{
          border-radius:50%;
        }
      }
      .content{
        position:relative;
        flex:1;
        .name{
          margin-bottom:4px;
          line-height: 12px;
          font-size:10px;
          color:rgb(7,17,27);
        }
        .star-wrapper{
          margin-bottom:6px;
          font-size:0;
          .star{
            display: inline-block;
            margin-right:6px;
            vertical-align: top;
          }
          .delivery{
            display: inline-block;
            vertical-align: top;
            line-height: 12px;
            font-size:10px;
            color:rgb(147,153,159);
          }
        }
        .text{
          margin-bottom:8px;
          line-height:18px;
          color:rgb(7,17,27);
          font-size:12px;
        }
        .recommend{
          line-height: 16px;
          font-size:0;
          .icon-thumb_up, .item{
            display: inline-block;
            margin:0 8px 4px 0;
            font-size:9px;
          }
          .icon-thumb_up{
            color:rgb(0,160,220);
          }
          .item{
            padding:0 6px;
            border:1px solid rgba(7,17,27,0.1);
            border-radius:1px;
            color:rgb(147,153,159);
            background:#fff;
          }
        }
        .time{
          position:absolute;
          top:0;
          right:0;
          line-height: 12px;
          font-size:10px;
          color:rgb(147,153,159);
        }
      }
    }
  }
}
</style>
