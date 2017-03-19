<template>
  <div class="header">
    <div class="content-wrapper">

      <div class="avatar">
        <img width="64" height="64" v-bind:src="seller.avatar">
      </div>

      <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            <span>{{seller.description}} / {{seller.deliveryTime}}分钟送达</span>
          </div>
          <div v-if="seller.supports" class="support">
            <span class="icon" v-bind:class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
          <div v-if="seller.supports" class="support-count" v-on:click="showDetail">
            <span class="count">
              {{seller.supports.length}}个
            </span>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
      
      </div>

    </div>
    <div class="bulletin-wrapper" v-on:click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img v-bind:src="seller.avatar">
    </div>
    <transition name="fade">
      <div  class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star v-bind:size="24" v-bind:score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="content">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports">
                <span class="icon" v-bind:class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{item.description}}</span></li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="content">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" v-on:click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from 'components/star/star.vue'
export default {
  components: {
    star
  },
  data () {
    return {
      detailShow:false
    }
  },
  methods:{
    showDetail:function(){
      this.detailShow = true
    },
    hideDetail:function(){
      this.detailShow = false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap= ['decrease','discount','special','invoice','guarantee']
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less"  rel="stylesheet/css" scoped>
@import '../../common/css/icon.css';

.header{
  position:relative;
  background:rgba(7,17,27,0.5);
  color:#fff;
  .content-wrapper{
    position:relative;
    padding:24px 12px 18px 24px;
    font-size:0;
    .avatar{
      display:inline-block;
      vertical-align:top;
      img{
        border-radius:2px;
      }
    }
    .content{
      display:inline-block;
      text-align:left;
      font-size:14px;
      margin-left:16px;
      .title{
        margin:2px 0 8px 0;
        .brand{
          display:inline-block;
          vertical-align:top;
          width:30px;
          height:18px;
          background-image: url('./brand@2x.png');
          background-size:30px 18px;
          background-repeat:no-repeat;
        }
        .name{
          margin-left:6px;
          font-size:16px;
          line-height:18px;
          font-weight:bold;
        }
      }
      .description{
        margin-bottom:10px;
        font-size:12px;
        line-height:12px;
      }
      .support{
        .icon{
          display:inline-block;
          width:15px;
          height:15px;
          // margin-right:4px;
          background-size:15px 15px;
          background-repeat:no-repeat;
          &.decrease{
            background-image:url('./decrease_1@2x.png')
          };
          &discount{
            background-image:url('./decrease_1@2x.png')
          };
          &.guarantee{
            background-image:url('./guarantee_1@2x.png')
          };
          &.invoice{
            background-image:url('./invoice_1@2x.png')
          };
          &.special{
            background-image:url('./special_1@2x.png')
          }
        }
        .text{
        vertical-align:top;
          line-height:15px;
          height:15px;
          display:inline-block;
        }
      }
    }
    .support-count{
      position:absolute;
      right:12px;
      bottom:18px;
      padding:0 8px;
      height:24px;
      line-height:24px;
      border-radius:14px;
      background:rgba(0,0,0,0.2);
      .count{

      };
      .icon-keyboard_arrow_right{
        font-size:10px;
      }
    }
  }
  .bulletin-wrapper{
    background-color:rgba(7,17,27,0.2);
    height:28px;
    line-height:28px;
    position:relative;
    padding:0 22px 0 12px;
    white-space: nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    .bulletin-title{
      background-image:url('./bulletin@2x.png');
      background-size:22px 12px;
      background-repeat:no-repeat;
      display:inline-block;
      height:12px;
      vertical-align:top;
      width:22px;
      margin-top:7px;
    }
    .bulletin-text{
      font-size:10px;
      vertical-align:top;
    }
    .icon-keyboard_arrow_right{
      position:absolute;
      font-size:10px;
      top:8px;
      right:8px;
    }

  }
  .background{
    width:100%;
    height:100%;
    img{
      height:100%;
      width:100%;
    }
    position:absolute;
    top:0;
    left:0;
    z-index:-1;
    filter:blur(10px)
  }
  .detail{
    position:fixed;
    top:0;
    left:0;
    z-index:100;
    width:100%;
    height:100%;
    overflow:auto;
    transition:all 0.5s;
    opacity:1;
    background:rgba(7,17,27,0.8);
    -webkit-backdrop-filter: blur(50px);
    &.fade-enter,&.fade-leave-active{
      opacity:0;
      background:rgba(7,17,27,0);
    }
    .detail-wrapper{
      min-height:100%;
      width:100%;
      .detail-main{
        margin-top:64px;
        padding-bottom:64px;
        .name{
          line-height:16px;
          text-align:center;
          font-size:16px;
          font-weight:700;
        }
        .star-wrapper{
          margin-top:18px;
          padding:2px 0;
        }
        .title{
          display:flex;
          width:80%;
          margin:28px auto 24px auto;
          .line{
            position:relative;
            flex:1;
            top:-6px;
            flex:auto;
            border-bottom:1px solid rgba(255,255,255,0.2);
          }
          .content{
            font-weight:700;
            padding:0 12px;
            font-size:14px;

          }
        }
        .supports{
          width:80%;
          margin:0 auto;
          .support-item{
            padding:0 12px;
            margin-bottom:12px;
            font-size:0;
            &:last-child{margin-bottom:0;}
            .icon{
              display:inline-block;
              width:16px;
              height:16px;
              vertical-align: top;
              margin-right:6px;
              background-size:16px 16px;
              background-repeat:no-repeat;
              &.decrease{
               background-image:url('./decrease_1@2x.png')
              };
              &.discount{
                background-image:url('./discount_1@2x.png')
              };
              &.guarantee{
                background-image:url('./guarantee_1@2x.png')
              };
              &.invoice{
                background-image:url('./invoice_1@2x.png')
              };
              &.special{
                background-image:url('./special_1@2x.png')
              }
            }
            .text{
              font-size:12px;
              line-height:16px;
            }
          }
        }
        .bulletin{
          width:80%;
          margin:0 auto;
          .content{
            padding:0 12px;
            line-height: 24px;
            font-size: 12px;
          }
          
        }
      }
    }
    .detail-close{
      position:relative;
      width:32px;
      height:32px;
      margin:-64px auto 0 auto;
      clear:both;
      font-size:32px;
    }
  }
}

</style>
