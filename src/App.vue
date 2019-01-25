<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html,body{
    overflow: hidden;
  }
  #app{
    width: 100%;
    height: 100%;
  }
  #app .yd-scrollview:after {
    content: "";
    display: block;
    width: 100%;
    height: 0;
  }
  #app  .yd-scrollview{
    margin-bottom: 0;
  }
 .addcomplain .yd-textarea {
   padding: 0;

 }
  .addcomplain .yd-textarea>textarea{
    font-size: 0.2rem;

  }


  .center .yd-textarea textarea::-webkit-input-placeholder {
    /* WebKit browsers */
    color: red;
  }
  .center .yd-textarea textarea:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: red;
  }
  .center .yd-textarea textarea::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: red;
  }

  #conlist .yd-tab-box{
    position: fixed;
    width: 100%;
    z-index: 9999;
    border-bottom: 1px solid #eeeeee
  }
  #conlist .yd-tab-panel{
    position: absolute;
    top: 42px;
    width: 100%;
  }

</style>
