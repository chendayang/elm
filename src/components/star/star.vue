<template>
    <div class="star" v-bind:class="starType">
        <span v-for="itemClass in itemClasses" v-bind:class="itemClass" class="star-item"></span>
    </div>

</template>

<script>
let LENGTH = 5
let CLS_ON='on'
let CLS_HALF='half'
let CLS_OFF='off'
export default {
    props:{
        size:{
            tryp:Number
        },
        score: {
            type:Number
        }
    },
    computed:{
        starType(){
            return 'star-'+this.size
        },
        itemClasses () {
            let result = []
            let score = Math.floor(this.score*2)/2
            let hasDecimal = score%1 !==0
            let integer = Math.floor(score)
            for(let i=0; i<integer; i++){
                result.push(CLS_ON)
            }
            if(hasDecimal){
                result.push(CLS_HALF)
            }
            while(result.length<LENGTH){
                result.push(CLS_OFF)
            }
            return result
        }
    }
}
</script>

<style lang="less"  rel="stylesheet/css" scoped>
.star{
    font-size:0;
    text-align:center;
    &.star-24{
        .star-item{
            width:20px;
            height:20px;
            margin-right:15px;
            &.on{
                background:url('./star24_on@2x.png');
            background-size:20px 20px;
            }
            &.half{
            background-size:20px 20px;
                background:url('./star24_half@2x.png');
            }
            &.off{
            background-size:20px 20px;
                background:url('./star24_off@2x.png');
            }
            &:last-child{
            background-size:20px 20px;
                margin-right:0;
            }
        }

    }
    .star-item{
        display:inline-block;
        background-repeat:no-repeat;

    }
}
</style>
