<template>
<transition name="move">
<div v-show="showFlag" class="food">
    <div class="food-wrapper">
        <div class="image-header">
            <img v-bind:src="food.image">
            <div class="back" v-on:click="hide">
                <i class="icon-arrow_lift"></i>
            </div>            
        </div>
        <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
                <span class="sell-count">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
                <span class="now">￥ {{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥ {{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
                <cartcontrol v-bind:food="food"></cartcontrol>
            </div>
            <transition name="buy">
                <div class="buy" v-show="!food.count || food.count === 0" v-on:click.stop.prevent="addFirst($event)">加入购物车</div>
            </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
            <h1 class="title">商品介绍</h1>
            <div class="text">{{food.info}}</div>
        </div>
        <split></split>
        <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect v-bind:selectType="selectType" v-bind:onlyContent="onlyContent" v-bind:desc="desc" v-bind:ratings="food.ratings" v-on:ratingChange="ratingChange"></ratingselect>
            <div class="rating-wrapper">
                <ul v-show="food.ratings && food.ratings.length">
                    <li v-for="rating in food.ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
                        <div class="user">
                            <span class="name">{{rating.username}}</span>
                            <img class="avatar" width="12" height="12" v-bind:src="rating.avatar">
                        </div>
                        <div class="time">{{realtime(rating.rateTime)}}</div>
                        <p class="text">
                            <span v-bind:class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                        </p>
                    </li>
                </ul>
                <div class="no-rating" v-show="!food.ratings || food.ratings.length===0">暂无评价</div>
                
            </div>
        </div>

    </div>
</div>
</transition>
</template>

<script>
import Bscroll from 'better-scroll'
import Vue from 'vue'
import cartcontrol from 'components/cartcontrol/cartcontrol.vue'
import split from 'components/split/split.vue'
import ratingselect from 'components/ratingselect/ratingselect.vue'
import {formatDate} from 'common/js/date'
// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
export default{
    props:{
        food:{
            type:Object
        }
    },
    components:{
        cartcontrol,
        split,
        ratingselect
    },
    data() {
        return{
            showFlag: false,
            selectType: ALL,
            onlyContent:true,
            desc:{
                all:'全部',
                positive:'推荐',
                negative:'吐槽'
            }
        }
    },
    filters:{
        formatDate(time){
            let date =new Date(time)
            return formatDate(date,'yyyy-MM-dd  hh:mm')
        }
    },
    methods:{
        show(){
            this.showFlag= true
            this.selectType=ALL
            this.onlyContent= true
            this.$nextTick(()=> {
                if(!this.scroll){
                    this.scroll= new Bscroll(this.$el,{
                        click: true
                    })
                }else{
                    this.scroll.refresh()
                }
            })
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
        },
        hide(){
            this.showFlag= false
        },
        addFirst(event) {
            if(!event._constructed){
                return
            }
            Vue.set(this.food,'count',1)
        },
        ratingChange(type,data){
            this[type]=data
            this.$nextTick(()=> {
                this.scroll.refresh()
            })
        },
        needShow(type,text){
            if(this.onlyContent && !text){
                return false
            }
            if(this.selectType ===ALL){
                return true
            }else{
                return type===this.selectType
            }
        }
    }
}
</script>

<style lang="less" rel="stylesheet/css" scoped>
.food{
    position:fixed;
    left:0;
    top:0;
    bottom:48px;
    z-index:30;
    width:100%;
    background:#fff;
    transition:all 0.2s linear;
    transform:translate3d(0,0,0);
    &.move-enter, &.move-leave-active{
        transform:translate3d(100%,0,0)
    }
    .image-header{
        position:relative;
        width:100%;
        height:0;
        padding-top:100%;
        img{
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
        }
        .back{
            position:absolute;
            top:10px;
            left:20px;
            .icon-arrow_lift{
                color:#fff;
                font-size:20px;
                display:block;
                padding:10px;
                background:#e9ecec;
                opacity:0.8;
            }
        }
    }
    .content{
        padding:18px;
        position:relative;
        .title{
            line-height:14px;
            margin-bottom:8px;
            font-size:14px;
            font-weight:700;
            color:rgb(7,17,27);
        }
        .detail{
            margin-bottom:18px;
            line-height:10px;
            font-size:0;
            height:10px;
            .sell-count, .rating{
                display:inline-block;
                font-size:10px;
                color:rgb(147,153,159);
            }
            .sell-count{
                margin-right:12px;
            }
            .rating{}
        }
        .price{
            font-weight:700;
            line-height:24px;
            .now{
                margin-right:8px;
                font-size:14px;
                color:rgb(240,20,20);
            }
            .old{
                text-decoration:line-through;
                font-size:10px;
                color:rgb(147,153,159);
            }
        }
        .cartcontrol-wrapper{
            position:absolute;
            bottom:12px;
            right:12px;
        }
        .buy{
            position:absolute;
            right:18px;
            bottom:18px;
            line-height:24px;
            height:24px;
            padding:0 12px;
            box-sizing:border-box;
            font-size:10px;
            color:#fff;
            border-radius:12px;
            background: rgb(0,160,220);
            transition: all 0.2s;
            opacity:1;
            &.buy-enter, &.buy-leave-active{
                opacity:0;
            }
        }
    }
    .info{
        padding:18px;
        .title{
            line-height:14px;
            margin-bottom:6px;
            font-size:14px;
            color:rgb(7,17,27);
        }
        .text{
            line-height:24px;
            font-size:12px;
            color:rgb(77,85,93);
            padding:0 8px;

        }
    }
    .rating{
        padding-top:18px;
        .title{
            line-height: 14px;
            margin-left:6px;
            font-size:14px;
             color:rgb(7,17,27);
        }
        .rating-wrapper{
            padding:0 18px;
            .rating-item{
                position:relative;
                padding:16px;
                border-bottom:1px solid rgba(7,17,27,0.1);
                .user{
                    position:absolute;
                    right:0;
                    top:16px;
                    font-size:0;
                    line-height: 12px;
                    .name{
                        font-size:10px;
                        margin-right:6px;
                        display:inline-block;
                        vertical-align: top;
                        color:rgb(147,153,159);
                    }
                    .avatar{
                        border-radius:50%;
                    }
                }
                .time{
                    line-height: 12px;
                    font-size:10px;
                    color:rgb(147,153,159);
                    margin-bottom:6px;
                }
                .text{
                    line-height:16px;
                    font-size:12px;
                    color:rgb(7,17,27);
                    .icon-thumb_up{
                        color:rgb(0,160,220);
                        line-height:16px;
                        margin-right:4px;
                    }
                    .icon-thumb_down{
                        color:rgb(147,153,159);
                        line-height:16px;
                        margin-right:4px;
                    }
                }
            }
            .no-rating{
                padding:16px 0;
                font-size:12px;
                color:rgb(147,153,159);
            }

        }
    }

}
</style>
