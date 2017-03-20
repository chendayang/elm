<template>
<div class="cartcontrol">
    <transition name="tran">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" v-on:click="decreaseCart"></div>    
    </transition>
    <div class="cart-count" v-show="food.count>0">
        {{food.count}}
    </div>
    <div class="cart-add icon-add_circle" v-on:click="addCart"></div>
</div>
</template>

<script>
import Vue from 'vue'
export default {
    props:{
        food:{
            type:Object
        }
    },
    created() {
        // console.log(this.food.name)
    },
    methods:{
        addCart(event){
            // if(!event._constructed){
                // return
            // }
            if(!this.food.count){
                Vue.set(this.food,'count',1)
            }else{
                this.food.count++
            }
            // console.log(this.food.count)
            this.$emit('increment',event.target)
        },
        decreaseCart(){
            if(this.food.count>0){
                this.food.count--
            }
        }
    }

}
</script>

<style lang="less" rel="stylesheet/css">
.cartcontrol{
    font-size:0;
    position:relative;
    .cart-decrease, .cart-count, .cart-add{
        display:inline-block;
        font-size:24px;
        line-height:24px;
        color:rgb(0,160,220)
    }
    .cart-decrease{
        padding:6px;
        opacity:1;
        transition:all 0.3s linear;
        transform:translate3d(0,0,0);
        &.tran-enter, &.tran-leave-active{
            opacity:0;
            transform: translate3D(24px,0,0)
        }
    }
    .cart-count{
        font-size:10px;
        vertical-align: top;
        width:12px;
        line-height: 24px;
        width:12px;
        padding-top:6px;
    }
    .cart-add{
        padding:6px;
    }
}
</style>
