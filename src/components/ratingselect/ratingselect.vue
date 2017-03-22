<template>
<div class="ratingselect">
    <div class="rating-type">
        <span class="block positive" v-bind:class="{'active':selectType===2}" v-on:click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
        <span class="block positive" v-bind:class="{'active':selectType===0}" v-on:click="select(0,$event)">{{desc.positive}} <span class="count">{{positives.length}}</span></span>
        <span class="block negative" v-bind:class="{'active':selectType===1}" v-on:click="select(1,$event)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="rating-switch" v-bind:class="{'on':onlyContent}" v-on:click="toggleCount($event)">
        <span class="icon-check_circle"></span>
        <span class="text">只看有内容的评价</span>
    </div>
</div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default{
    methods:{
        select(type,event){
            if(!event._constructed){
                return
            }
            this.selectType = type
            this.$emit('ratingChange','selectType',type)
        },
        toggleCount(event){
            if(!event._constructed){
                return
            }
            this.onlyContent=!this.onlyContent
            this.$emit('ratingChange','onlyContent',this.onlyContent)
        }
    },
    props:{
        ratings:{
            type: Array,
            default(){
                return []
            }
        },
        selectType: {
            type: Number,
            default:ALL
        },
        onlyContent:{
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default(){
                return {
                    all:'全部',
                    positive:'满意',
                    negative:'不满意'
                }
            }
        }
    },
    computed:{
        positives(){
            return this.ratings.filter((rating)=> {
                return rating.rateType === POSITIVE
            })
        },
        negatives(){
            return this.ratings.filter((rating)=> {
                return rating.rateType === NEGATIVE
            })
        }
    }
}
</script>

<style lang="less" rel="stylesheet/css" scoped>
.ratingselect{
    .rating-type{
        padding:18px 0;
        margin:0 18px;
        border-bottom:1px solid rgba(7,17,27,0.1);
        font-size:0;
        .block{
            display:inline-block;
            padding:8px 12px;
            margin-right:8px;
            border-radius:1px;
            line-height:16px;
            color:rgb(77,85,93);
            font-size:12px;
            &.positive{
                background:#cceef7;
                &.active{
                    background:#00a1dc;
                    color:#fff;
                }
            }
            &.negative{
                background:rgba(77,85,93,0.2);
                &.active{
                    background:rgb(77,85,93);
                    color:#fff;
                }
            }
            .count{
                font-size:8px;
                margin-left:2px;
            }
        }
    }
    .rating-switch{
        padding:12px 18px;
        line-height:24px;
        font-size:12px;
        font-size:0;
        border-bottom:1ps solid rgba(7,17,27,0.1);
        &.on{
            .icon-check_circle{
                color:#00c850;
            }
        }
        .icon-check_circle{
            font-size:24px;
            margin-right:4px;
            display:inline-block;
            vertical-align:top;
        }
        .text{
            font-size:12px;
        }
    }
}
</style>
