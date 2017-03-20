<template>
<div class="shopcart">
    <div class="content">
        <div class="content-left" v-on:click="toggleList">
            <div class="logo-wrapper">
                <div class="logo" v-bind:class="{highlight:totalCount>0}">
                    <i class="icon-shopping_cart" v-bind:class="{highlight:totalCount>0}"></i>
                </div>
                <div class="number" v-show="totalCount>0">{{totalCount}}</div>
            </div>
            <div class="price" v-bind:class="{highlight:totalPrice>0}">￥{{totalPrice}}元</div>
            <div class="desc">另需配送费 ￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
            <div class="pay" v-bind:class="{enough:this.totalPrice>=this.minPrice}">{{payDesc}}</div>
        </div>
    </div>
    <div class="ball-container">
        <div v-for="ball in balls" >
            <transition name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:afterEnter="afterEnter">
                <div v-show="ball.show" class="ball">
                    <div class="inner inner-hook"></div>
                </div>
            </transition>
        </div>
    </div>
    <transition name="cartList">
    <div class="showcart-list" v-show="listShow">
        <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
            <ul>
                <li class="food" v-for="food in selectFoods">
                    <span class="name">{{food.name}}</span>
                    <div class="price">
                        <span>￥{{food.price*food.count}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol v-bind:food="food"></cartcontrol>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    </transition>

</div>
</template>

<script>
import Bscroll from 'better-scroll'
import cartcontrol from 'components/cartcontrol/cartcontrol.vue'
export default{
    data() {
        return{
            balls:[
                {
                    show:false
                },
                {
                    show:false
                },
                {
                    show:false
                },
                {
                    show:false
                },
                {
                    show:false
                }
            ],
            dropBalls:[],
            fold:true
        }
    },
    components:{
        cartcontrol
    },
    methods: {
        drop(el) {
            for(let i = 0; i<this.balls.length; i++){
                let ball=this.balls[i]
                if(!ball.show) {
                    ball.show= true
                    ball.el=el
                    this.dropBalls.push(ball)
                    return
                }
            }
        },
        toggleList() {
            if(!this.totalCount){
                return
            }else{
                this.fold= !this.fold
            }
        },
        beforeEnter(el) {
            let count = this.balls.length
            while(count--) {
                let ball= this.balls[count]
                if(ball.show) {
                    let rect = ball.el.getBoundingClientRect()
                    let x= rect.left-32
                    let y = -(window.innerHeight-rect.top-22)
                    el.style.display=''
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`
                    el.style.transform = `translate3d(0,${y}px,0)`
                    let inner= el.getElementsByClassName('inner-hook')[0]
                    inner.style.webkitTransform= `translate3d(${x}px,0,0)`
                    inner.style.transform= `translate3d(${x}px,0,0)`
                }
            }
        },
        enter(el) {
            /* eslint-disable no-unused-vars */
            let rf= el.offestHeight
            this.$nextTick(()=> {
                 el.style.webkitTransform = 'translate3d(0,0,0)'
                el.style.transform = 'translate3d(0,0,0)'
                let inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.webkitTransform = 'translate3d(0,0,0)'
                inner.style.transform = 'translate3d(0,0,0)'
            })
        },
        afterEnter(el) {
            let ball= this.dropBalls.shift()
            if(ball){
                ball.show= false
                el.style.display= 'none'
            }
        }
    },
    props:{
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        },
        selectFoods:{
            type : Array,
            default () {
                return [
                    {
                        price:21,
                        count:10
                    }
                ]
            }
        }
    },
    computed:{
        totalPrice () {
            let total = 0
            this.selectFoods.forEach((food) => {
                total+= food.price * food.count
            })
            return total
        },
        totalCount () {
            let count = 0
            this.selectFoods.forEach((food)=> {
                count+=food.count
            })
            return count
        },
        payDesc () {
            if(this.totalPrice === 0) {
                return `￥${this.minPrice}元起送`
            }else if(this.totalPrice<this.minPrice){
                let diff= this.minPrice - this.totalPrice
                return `还差 ￥${diff}元起送`
            }else{
                return '去结算'
            }
        },
        listShow() {
            if(!this.totalCount){
                this.fold= true
                return false
            }
            let show = !this.fold
            if(show){
                if(!this.scroll){
                    this.$nextTick(()=> {
                        this.scroll = new Bscroll(this.$refs.listContent,{
                            click:true
                        })
                    })
                }else{
                    this.scroll.refresh()
                }
            }
            return show
        }

    }
}
</script>

<style lang="less" rel="stylesheet/css" scoped>
.shopcart{
    height:48px;
    width:100%;
    position:fixed;
    left:0;
    bottom:0;
    z-index:50;
    .content{
        display:flex;
        background:#141d27;
        color:rgba(255,255,255,0.4);
        .content-left{
            flex:1;
            font-size:0;
            .logo-wrapper{
                display:inline-block;
                position:relative;
                top:-10px;
                margin:0 12px;
                padding:6px;
                width:56px;
                height:56px;
                box-sizing:border-box;
                vertical-align:top;
                border-radius:50%;
                background:#141d27;
                .logo{
                    width:100%;
                    height:100%;
                    background:#2b3c3c;
                    border-radius:50%;
                    text-align:center;
                    &.highlight{
                        background:rgb(0,160,220);
                    }
                    .icon-shopping_cart{
                        font-size:24px;
                        color:#80858a;
                        line-height:44px;
                        &.highlight{
                            color:#fff;
                        }
                    }
                }
                .number{
                    position:absolute;
                    top:0;
                    right:0;
                    width:24px;
                    height:16px;
                    line-height: 16px;
                    text-align:center;
                    border-radius:16px;
                    font-size:9px;
                    font-weight:700;
                    color:#fff;
                    background: rgb(240,20,20);
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
                }
            }
            .price{
                display:inline-block;
                vertical-align: top;
                line-height:24px;
                margin-top:12px;
                font-weight:700;
                box-sizing:border-box;
                padding-right:12px;
                border-right:1px solid rgba(255,255,255,0.1);
                font-size:16px;
                &.highlight{
                    color:#fff;
                }
            }
            .desc{
                display:inline-block;
                line-height:24px;
                margin-top:12px;
                margin-left:12px;
                vertical-align: top;
                font-size:10px;
            }

        }
        .content-right{
            flex:0 0 105px;
            width:105px;
            .pay{
                font-size:12px;
                height:48px;
                line-height:48px;
                text-align:center;
                font-weight:700;
                background: #2b333b;
                &.enough{
                    background:#00b43c;
                    color:#fff;
                }
            }
        }
    }
    .ball-container{
        .ball{
            position:fixed;
            left:32px;
            bottom:22px;
            z-index:200;
            transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
            &.drop-enter, &.drop-leav-active{
            }
            .inner{
                width:16px;
                height:16px;
                border-radius:50%;
                background:rgb(0,160,220);
                transition:all 0.6s linear;
            }
        }
    }
    .showcart-list{
        position:absolute;
        top:0;
        left:0;
        z-index:-1;
        width:100%;
        transition:all 0.5s;
        transform:translate3d(0,-100%,0);
        &.cartList-enter, &.cartList-leave-active{
            transform:translate3d(0,0,0);
        }
        .list-header{
            height:40px;
            line-height: 40px;
            padding:0 18px;
            background:#f3f5f7;
            border-bottom:1px solid rgba(7,17,27,0.1);
            .title{
                float:left;
            }
            .empty{
                float:right;
                font-size:12px;
                color:rgb(0,160,220);
            }
        }
        .list-content{
            padding:0 18px;
            max-height:217px;
            background:#fff;
            overflow:hidden;
            .food{
                position:relative;
                padding:12px 0;
                box-sizing:border-box;
                border-bottom:rgba(7,17,27,0.1) 1px solid;
                .name{
                    line-height:24px;
                    font-size:14px;
                    color:rgb(7,17,27);
                }
                .price{
                    position:absolute;
                    right:90px;
                    bottom:12px;
                    line-height:24px;
                    font-size:14px;
                    font-weight:700;
                    color:rgb(240,20,20)
                }
                .cartcontrol-wrapper{
                    position:absolute;
                    right:0;
                    bottom:6px;
                }
            }
        }
    }
    
}
</style>
