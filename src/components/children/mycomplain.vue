<template>
  <yd-layout id="conlist" class="mycomplain" >
    <yd-tab v-model="tab2"  :prevent-default="false" :item-click="itemClick">
      <yd-tab-panel label="我的" >
        <yd-infinitescroll :callback="loadList" ref="infinitescrollOne" v-if="mine.length!=0" >
          <div slot="list" class="listcon" v-if="mine[0]!='A'">
            <div v-for="(item,n) in mine" class="companylist" @click="goItem(item)">
              <!--<left-slider :index="n" @deleteItem="deleteItem">-->
              <div class="listitem">
                <div class="itemleft">
                  <p class="itemtitle">
                    <span>{{item.name}}-{{item.feedbackCategory}}-{{item.module}}-{{item.complainDept}}</span>
                    <span v-if="item.startDate">{{item.startDate.split(' ')[0]}}</span>
                  </p>
                  <p class="itemcontent">
                    <span class="" v-if="item.nodeName">{{item.nodeName}}</span>
                    <!--<span class="" v-else>测试项</span>-->
                    <span>
                    {{item.incidentDescription}}
                  </span>
                  </p>
                </div>
                <div class="itemright">
                  <i  slot="icon" class="iconfont icon-morevert"  style="font-size:0.4rem;color: #888"></i>
                </div>
              </div>
              <!--</left-slider>-->
              <div class="linebott"></div>
            </div>
          </div>
          <!-- 数据全部加载完毕显示 -->
          <span slot="doneTip" >啦啦啦，啦啦啦，没有数据啦~~</span>
          <!-- 加载中提示，不指定，将显示默认加载中图标 -->
          <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
        </yd-infinitescroll>
        <div class="signready" v-if="noData">
          <div>
            <yd-icon name="warn-outline"  color="rgb(255, 94, 83)" size="1.1rem"></yd-icon>
          </div>
          <div class="signreadyTxt" >暂无反馈</div>
          <div class="subtxt">
            <p>您还没有任何人事服务投诉进行中</p>
            <p>如果有任何不满意的地方,请前往添加人事服务投诉</p>
          </div>
        </div>
      </yd-tab-panel>
      <yd-tab-panel label="待确认" link="addcomplain">
        <yd-infinitescroll :callback="loadList2" ref="infinitescrollTwo" v-if="waitConfirm.length!=0" >
          <div slot="list" class="listcon" v-if="waitConfirm[0]!='A'">
            <div v-for="(item,n) in waitConfirm" class="companylist" @click="goItem(item)">
              <!--<left-slider :index="n" @deleteItem="deleteItem">-->
              <div class="listitem">
                <div class="itemleft">
                  <p class="itemtitle">
                    <span>{{item.name}}-{{item.feedbackCategory}}-{{item.module}}-{{item.complainDept}}</span>
                    <span v-if="item.startDate">{{item.startDate.split(' ')[0]}}</span>
                  </p>
                  <p class="itemcontent">
                    <span class="" v-if="item.nodeName">{{item.nodeName}}</span>
                    <!--<span class="" v-else>测试项</span>-->
                    <span>
                    {{item.incidentDescription}}
                  </span>
                  </p>
                </div>
                <div class="itemright">
                  <i  slot="icon" class="iconfont icon-morevert"  style="font-size:0.4rem;color: #888"></i>
                </div>
              </div>
              <!--</left-slider>-->
              <div class="linebott"></div>
            </div>
          </div>
          <!-- 数据全部加载完毕显示 -->
          <span slot="doneTip" >啦啦啦，啦啦啦，没有数据啦~~</span>
          <!-- 加载中提示，不指定，将显示默认加载中图标 -->
          <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
        </yd-infinitescroll>
        <div class="signready" v-if="noData">
          <div>
            <yd-icon name="warn-outline"  color="rgb(255, 94, 83)" size="1.1rem"></yd-icon>
          </div>
          <div class="signreadyTxt" >暂无反馈</div>
          <div class="subtxt">
            <p>您还没有任何人事服务投诉处于待确认流程中</p>
            <p>如果有任何不满意的地方,请前往添加人事服务投诉</p>
          </div>
        </div>
      </yd-tab-panel>
      <yd-tab-panel label="待解答">
        <yd-infinitescroll :callback="loadList5" ref="infinitescrollFive" v-if="waitSolve.length!=0" >
          <div slot="list" class="listcon" v-if="waitSolve[0]!='A'">
            <div v-for="(item,n) in waitSolve" class="companylist" @click="goItem(item)">
              <!--<left-slider :index="n" @deleteItem="deleteItem">-->
              <div class="listitem">
                <div class="itemleft">
                  <p class="itemtitle">
                    <span>{{item.name}}-{{item.feedbackCategory}}-{{item.module}}-{{item.complainDept}}</span>
                    <span v-if="item.startDate">{{item.startDate.split(' ')[0]}}</span>
                  </p>
                  <p class="itemcontent">
                    <span class="" v-if="item.nodeName">{{item.nodeName}}</span>
                    <!--<span class="" v-else>测试项</span>-->
                    <span>
                    {{item.incidentDescription}}
                  </span>
                  </p>
                </div>
                <div class="itemright">
                  <i  slot="icon" class="iconfont icon-morevert"  style="font-size:0.4rem;color: #888"></i>
                </div>
              </div>
              <!--</left-slider>-->
              <div class="linebott"></div>
            </div>
          </div>
          <!-- 数据全部加载完毕显示 -->
          <span slot="doneTip" >啦啦啦，啦啦啦，没有数据啦~~</span>
          <!-- 加载中提示，不指定，将显示默认加载中图标 -->
          <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
        </yd-infinitescroll>
        <div class="signready" v-if="noData">
          <div>
            <yd-icon name="warn-outline"  color="rgb(255, 94, 83)" size="1.1rem"></yd-icon>
          </div>
          <div class="signreadyTxt" >暂无反馈</div>
          <div class="subtxt">
            <p>您还没有任何人事服务投诉</p>
            <p>如果有任何不满意的地方,请前往添加人事服务投诉</p>
          </div>
        </div>
      </yd-tab-panel>
      <yd-tab-panel label="待评分">
        <yd-infinitescroll :callback="loadList3" ref="infinitescrollThree" v-if="waitRate.length!=0" >
          <div slot="list" class="listcon" v-if="waitRate[0]!='A'">
            <div v-for="(item,n) in waitRate" class="companylist" @click="goItem(item)">
              <!--<left-slider :index="n" @deleteItem="deleteItem">-->
              <div class="listitem">
                <div class="itemleft">
                  <p class="itemtitle">
                    <span>{{item.name}}-{{item.feedbackCategory}}-{{item.module}}-{{item.complainDept}}</span>
                    <span v-if="item.startDate">{{item.startDate.split(' ')[0]}}</span>
                  </p>
                  <p class="itemcontent">
                    <span class="" v-if="item.nodeName">{{item.nodeName}}</span>
                    <!--<span class="" v-else>测试项</span>-->
                    <span>
                    {{item.incidentDescription}}
                  </span>
                  </p>
                </div>
                <div class="itemright">
                  <i  slot="icon" class="iconfont icon-morevert"  style="font-size:0.4rem;color: #888"></i>
                </div>
              </div>
              <!--</left-slider>-->
              <div class="linebott"></div>
            </div>
          </div>
          <!-- 数据全部加载完毕显示 -->
          <span slot="doneTip" >啦啦啦，啦啦啦，没有数据啦~~</span>
          <!-- 加载中提示，不指定，将显示默认加载中图标 -->
          <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
        </yd-infinitescroll>
        <div class="signready" v-if="noData">
          <div>
            <yd-icon name="warn-outline"  color="rgb(255, 94, 83)" size="1.1rem"></yd-icon>
          </div>
          <div class="signreadyTxt" >暂无反馈</div>
          <div class="subtxt">
            <p>您还没有任何人事服务投诉处于待评分流程中</p>
            <p>如果有任何不满意的地方,请前往添加人事服务投诉</p>
          </div>
        </div>
      </yd-tab-panel>
      <yd-tab-panel label="已结案">
        <yd-infinitescroll :callback="loadList4" ref="infinitescrollFour" v-if="closed.length!=0"  >
          <div slot="list" class="listcon" v-if="closed[0]!='A'">
            <div v-for="(item,n) in closed" class="companylist" @click="goItem(item)">
              <!--<left-slider :index="n" @deleteItem="deleteItem">-->
              <div class="listitem">
                <div class="itemleft">
                  <p class="itemtitle">
                    <span>{{item.name}}-{{item.feedbackCategory}}-{{item.module}}-{{item.complainDept}}</span>
                    <span v-if="item.startDate">{{item.startDate.split(' ')[0]}}</span>
                  </p>
                  <p class="itemcontent">
                    <span class="" v-if="item.nodeName">{{item.nodeName}}</span>
                    <!--<span class="" v-else>测试项</span>-->
                    <span>
                    {{item.incidentDescription}}
                  </span>
                  </p>
                </div>
                <div class="itemright">
                  <i  slot="icon" class="iconfont icon-morevert"  style="font-size:0.4rem;color: #888"></i>
                </div>
              </div>
              <!--</left-slider>-->
              <div class="linebott"></div>
            </div>
          </div>
          <!-- 数据全部加载完毕显示 -->
          <span slot="doneTip" >啦啦啦，啦啦啦，没有数据啦~~</span>
          <!-- 加载中提示，不指定，将显示默认加载中图标 -->
          <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
        </yd-infinitescroll>
        <div class="signready" v-if="noData">
          <div>
            <yd-icon name="warn-outline"  color="rgb(255, 94, 83)" size="1.1rem"></yd-icon>
          </div>
          <div class="signreadyTxt" >暂无反馈</div>
          <div class="subtxt">
            <p>您还没有任何人事服务投诉处于已结案流程中</p>
            <p>如果有任何不满意的地方,请前往添加人事服务投诉</p>
          </div>
        </div>
      </yd-tab-panel>

    </yd-tab>
    <div class="butcontent">
      <button class="myButton " @click="goAddItem" :class="{ animateButt: animate}">+</button>
      <div  class="animateDiv" v-if="animate"></div>
    </div>
    <!--<div class="linetop" slot="top">-->
      <!--<yd-search v-model="selectContent" :on-submit="submitHandler" placeholder="根据关键字搜索" cancel-text="确定" :on-cancel="submitHandler"></yd-search>-->
    <!--</div>-->
    <!--<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" v-if="complains.length!=0" >-->
      <!--<div slot="list" class="listcon" v-if="complains[0]!='A'">-->
        <!--<div v-for="(item,n) in complains" class="companylist" @click="goItem(item)">-->
          <!--&lt;!&ndash;<left-slider :index="n" @deleteItem="deleteItem">&ndash;&gt;-->
            <!--<div class="listitem">-->
              <!--<div class="itemleft">-->
                  <!--<p class="itemtitle">-->
                    <!--<span>{{item.name}}-{{item.feedbackCategory}}-{{item.module}}-{{item.complainDept}}</span>-->
                    <!--<span v-if="item.startDate">{{item.startDate.split(' ')[0]}}</span>-->
                  <!--</p>-->
                <!--<p class="itemcontent">-->
                  <!--<span class="" v-if="item.nodeName">{{item.nodeName}}</span>-->
                  <!--&lt;!&ndash;<span class="" v-else>测试项</span>&ndash;&gt;-->
                  <!--<span>-->
                    <!--{{item.incidentDescription}}-->
                  <!--</span>-->
                <!--</p>-->
              <!--</div>-->
              <!--<div class="itemright">-->
                <!--<i  slot="icon" class="iconfont icon-morevert"  style="font-size:0.4rem;color: #888"></i>-->
              <!--</div>-->
            <!--</div>-->
          <!--&lt;!&ndash;</left-slider>&ndash;&gt;-->
          <!--<div class="linebott"></div>-->
        <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash; 数据全部加载完毕显示 &ndash;&gt;-->
      <!--<span slot="doneTip" >啦啦啦，啦啦啦，没有数据啦~~</span>-->
      <!--&lt;!&ndash; 加载中提示，不指定，将显示默认加载中图标 &ndash;&gt;-->
      <!--<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>-->
    <!--</yd-infinitescroll>-->
    <!--<div class="signready" v-if="complains.length==0">-->
      <!--<div>-->
        <!--<yd-icon name="warn-outline"  color="#137fe4" size="1.1rem"></yd-icon>-->
      <!--</div>-->
      <!--<div class="signreadyTxt" >暂无反馈</div>-->
      <!--<div class="subtxt">-->
        <!--<p>您还没有任何人事服务投诉</p>-->
        <!--<p>如果有任何不满意的地方,请前往添加人事服务投诉</p>-->
      <!--</div>-->
    <!--</div>-->

  </yd-layout>

</template>

<script>
  import LeftSlider from './../common/swiperLeft.vue';
export default {
  name: 'mycomplain',
  data () {
    return {
      noData:false,
      animate:false,
      tab2:0,
      page: 1,
      mine:[],
      waitConfirm:[],
      waitRate:[],
      closed:[],
      waitSolve:[],
      complains:[],
      selectContent:"",
      token:"",
      totalPage:0,
      type:1
    }
  },
  components: {
    LeftSlider
  },

  mounted: function(){
//    this.token = this.$route.query.token;
    console.log(this.$route);
    if(this.$route.query.token){
      localStorage.setItem("usertoken",this.$route.query.token)
    }
    this.token = localStorage.getItem("usertoken");
    console.log(this.token);
    this.getList(this.page,this.type);
  },
  methods:{
    goAddItem(){
      let vm=this;
      this.animate=true;
      setTimeout(function () {
        vm.$router.push('/addcomplain')
      },500)
    },
    itemClick(key){
      this.noData=false;
      this.closed=[];
      this.mine=[];
      this.waitConfirm=[];
      this.waitRate=[];
      this.waitSolve=[];
      this.page=1;
      this.tab2=key;
      console.log(
        key
      )
      switch(key){
        case 0:
          this.getList(this.page,1);
          break;
        case 1:
          this.getList(this.page,2);
          break;
        case 2:
          this.getList(this.page,5);
          break;
        case 3:
          this.getList(this.page,3);
          break;
        case 4:
          this.getList(this.page,4);
          break;

      }

    },
    deleteItem:function () {
    },
    loadList() {
      console.log("111")
      let vm = this;
      this.type=1;
      vm.getList(vm.page,this.type);
    },
    loadList2() {
      console.log("222")
      let vm = this;
      this.type=2;
      vm.getList(vm.page,this.type);
    },
    loadList3() {
      console.log("333")
      let vm = this;
      this.type=3;
      vm.getList(vm.page,this.type);
    },
    loadList4() {
      console.log("444")
      let vm = this;
      this.type=4;
      vm.getList(vm.page,this.type);
    },
    loadList5() {
      console.log("555")
      let vm = this;
      this.type=5;
      vm.getList(vm.page,this.type);
    },
    submitHandler:function () {

    },
    submitHandler:function () {

    },

    getList:function (page,type) {
      let vm = this;
      this.$dialog.loading.open('获取信息中');
      setTimeout(() => {
//        this.$dialog.loading.close();
        vm.api(vm,'get',"获取信息中","queryComplain.json",{token:vm.token,page:page,pageSize:8,type:type},function (data) {
          console.log(data);
          if(data.statusCode == 0){
            var myData=[];
            myData = myData.concat(data.dataInfo.listData);
            if(myData.length==0){
              vm.noData=true;
            }
            switch (type){
              case 1:
                vm.mine=vm.mine.concat(myData);
                for(var i in vm.mine){
                  vm.mine[i].nodeName='进行中'
                }
                break;
              case 2:
                vm.waitConfirm=vm.waitConfirm.concat(myData);
                for(var i in vm.waitConfirm){
                  vm.waitConfirm[i].nodeName='待确认'
                }
                break;
              case 3:
                vm.waitRate=vm.waitRate.concat(myData);
                for(var i in vm.waitRate){
                  vm.waitRate[i].nodeName='待评分'
                }
                break;
              case 4:
                vm.closed=vm.closed.concat(myData);
                for(var i in vm.closed){
                  vm.closed[i].nodeName='已结案'
                }
                break;
              case 5:
                vm.waitSolve=vm.waitSolve.concat(myData);
                for(var i in vm.waitSolve){
                  vm.waitSolve[i].nodeName='待解答'
                }
                break;
            }
            if(vm.mine.length==data.dataInfo.pageInfo.totalRecord&&type==1){
                  if(vm.$refs.infinitescrollOne){

                    vm.$refs.infinitescrollOne.$emit('ydui.infinitescroll.loadedDone');
                    return;
                  }
            }else if(vm.waitConfirm.length==data.dataInfo.pageInfo.totalRecord&&type==2){
                  if(vm.$refs.infinitescrollTwo){
                    vm.$refs.infinitescrollTwo.$emit('ydui.infinitescroll.loadedDone');
                    return;
                  }
                }else if(vm.waitRate.length==data.dataInfo.pageInfo.totalRecord&&type==3){
                  if(vm.$refs.infinitescrollThree){
                    vm.$refs.infinitescrollThree.$emit('ydui.infinitescroll.loadedDone');
                    return;
                  }
                }else if(vm.closed.length==data.dataInfo.pageInfo.totalRecord&&type==4){
                  if(vm.$refs.infinitescrollFour){
                    vm.$refs.infinitescrollFour.$emit('ydui.infinitescroll.loadedDone');
                    return;
                  }
                }else if(vm.waitSolve.length==data.dataInfo.pageInfo.totalRecord&&type==5){
                  if(vm.$refs.infinitescrollFive){
                    vm.$refs.infinitescrollFive.$emit('ydui.infinitescroll.loadedDone');
                    return;
                  }
                }
                  vm.page++;
          }
        });
      }, 800);
    },

    goItem:function (item) {
      console.log(item);
      localStorage.setItem("complainItem",JSON.stringify(item))
      this.$router.push({path:"complainItem",query:{token:this.token,fileId:item.fileId}})
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mycomplain{
    background-color: #fff;
  }
.listcon{
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
  .listitem{
    background-color: #fff;
    /*height: 50px;*/
    line-height: 50px;
    display: flex;
  }
  .listitem .itemleft{
    flex: 1;
    overflow: hidden;
  }
  .itemtitle{
    line-height: 0.44rem;
    padding-top: 0.3rem;
    padding-bottom: 0.2rem;
    font-size: 0.3rem;
    color: rgba(39, 55, 77, 1);
    display: flex;
  }
  .itemtitle>span:first-child{
    flex: 1;
    overflow: hidden;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis
  }
  .itemtitle>span:last-child{
    color: rgba(173, 190, 202, 1);
    font-size: 0.24px;
    padding: 0 0.2rem;
  }
  .itemcontent{
    line-height: 0.4rem;
    color: rgba(173, 190, 202, 1);
    font-size: 0.28rem;
    display: flex;
    padding-bottom: 0.18rem;
  }
  .itemcontent>span:first-child{
    line-height: 0.4rem;
    border-radius: 2px;
    text-align: center;
    border: 1px solid rgb(255, 94, 83);
    padding:0 2px;
    color: rgb(255, 94, 83);
    white-space: nowrap;
    margin-right: 0.1rem;
  }
  .itemcontent span:last-child{
    flex: 1;
    overflow: hidden;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis

  }
  .itemcontent span:last-child>span{
    /*display: inline-block;*/

  }
  .listitem .itemright{
    width: 0.4rem;
    display: flex;
    align-items: center;
  }
  .linebott{
    border-bottom: solid 1px #eee;
  }
  .signready{
    box-sizing: border-box;
    background-color: #fff;
    margin-bottom: 0.2rem;
    padding-top: 1.4rem;
    padding-left: 0.4rem;
    padding-bottom: 0.32rem;
    padding-right: 0.32rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .signready>div{
    text-align: center;
  }
  .signreadyTxt{
    font-size: 0.4rem;
    font-weight: 600;
    color: rgb(255, 94, 83);
    margin-bottom: 0.1rem;
  }
  .subtxt{
    font-size: 0.28rem;
    color: #888;
  }
  .butcontent{
    position: fixed;
    bottom:15%;
    right: 10%;
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);

  }
  .myButton{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border:none;
    background-color: rgb(255, 94, 83);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: white;
    /*overflow: hidden;*/
    z-index: 9998;
  }
  .animateButt{
    /*opacity: 0.5;*/
  }
  .animateDiv{

    width: 90px;
    height: 60px;
    /*border-radius: 50%;*/
    border:none;
    position: absolute;
    background-color: white;
    margin-top: -60px;
    margin-left: -60px;
    z-index: -1;
    opacity: 0;

    -webkit-animation:righteaseinAnimate 1s ;
    -moz-animation:righteaseinAnimate 1s; /* Firefox */
    -o-animation:righteaseinAnimate 1s; /* Opera */
  }
  @-webkit-keyframes righteaseinAnimate {
    0% {
      margin-left:60px;
      opacity: 0.7;
      z-index: 9999;
    }
    75% {
      /*margin-top:0;*/
      margin-left: -30px;
      opacity: 0;
      /*z-index: -1;*/
    }
    100% {
      /*margin-top:0;*/
      margin-left: -60px;
      /*z-index: -1;*/
    }
  }
</style>
