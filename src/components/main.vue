<template>
  <yd-layout>

    <router-view ></router-view>

    <yd-tabbar slot="tabbar" color="#888" active-color="#0FA0FA" style="border-top: solid 1px #eee">
      <yd-tabbar-item title="我的投诉" link="mycomplain" :active="active=='mycomplain'">
        <i  slot="icon" class="iconfont icon-tousu"  style="font-size:0.54rem"></i>
      </yd-tabbar-item>
      <yd-tabbar-item title="添加投诉" link="addcomplain" :active="active=='addcomplain'" >
        <i  slot="icon" class="iconfont icon-add"  style="font-size:0.54rem"></i>
      </yd-tabbar-item>
    </yd-tabbar>
  </yd-layout>
</template>

<script>
export default {

  data () {
    return {
      active:this.$route.name
    }
  },
  mounted: function(){
    console.log(this.$route);
//    this.$dialog.confirm({
//      title: '温馨提示',
//      mes: '此平台只提供人事服务投诉这种功能。  ',
//      opts: () => {
//      }
//    });
  },
  watch:{
     $route:function (val,old) {
       this. active=val.name
     }
  },
  methods:{
    getdots:function () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .router-link-active{
    color:#0FA0FA;
  }
</style>
