<template>
  <yd-layout>
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" v-if="mine.length!=0" >
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
    <div class="signready" v-if="mine.length==0">
    <div>
      <yd-icon name="warn-outline"  color="#137fe4" size="1.1rem"></yd-icon>
    </div>
    <div class="signreadyTxt" >暂无反馈</div>
    <div class="subtxt">
      <p>您还没有任何人事服务投诉进行中</p>
      <p>如果有任何不满意的地方,请前往添加人事服务投诉</p>
    </div>
  </div>
  </yd-layout>
</template>

<script>
    export default {
        data: function () {
            return {
              page: 1,
              mine:[],
              selectContent:"",
              token:"",
              totalPage:0
            }
        },
        created() {

        },
        mounted() {
          this.token = localStorage.getItem("usertoken");
          console.log(this.token);
          this.getList(this.page);
        },
        methods: {
          loadList() {
            console.log("aaaaaa");
            let vm = this;
            vm.getList(vm.page);
          },

          getList:function (page) {
            let vm = this;
            this.$dialog.loading.open('获取信息中');
            setTimeout(() => {
              this.$dialog.loading.close();
              vm.api(vm,'get',"获取信息中","queryComplain.json",{token:vm.token,page:page,pageSize:20},function (data) {
                console.log(data);
                if(data.statusCode == 0){
                  for(var i=0;i<data.dataInfo.listData.length;i++){
                    if(data.dataInfo.listData[i].nodeId=='N6'||data.dataInfo.listData[i].nodeId=='N5'||data.dataInfo.listData[i].nodeId=='N11'||
                      data.dataInfo.listData[i].nodeId=='N12'||data.dataInfo.listData[i].nodeId=='N13'||data.dataInfo.listData[i].nodeId=='N14'||
                      data.dataInfo.listData[i].nodeId=='N15'||data.dataInfo.listData[i].nodeId=='N16'||data.dataInfo.listData[i].nodeId=='N17'||
                      data.dataInfo.listData[i].nodeId=='N18'||data.dataInfo.listData[i].nodeId=='N7'||data.dataInfo.listData[i].nodeId=='N8'||
                      data.dataInfo.listData[i].nodeId=='N9'||data.dataInfo.listData[i].nodeId=='N10'){
                      vm.mine.push(data.dataInfo.listData[i])
                      data.dataInfo.listData[i].nodeName='进行中'
                    }
                  }
//            vm.complains = vm.complains.concat(data.dataInfo.listData);
                  vm.totalPage = data.dataInfo.pageInfo.totalPage;
                  vm.page++;
                  if(vm.page>vm.totalPage){
                    if(vm.$refs.infinitescrollDemo){
                      vm.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                      return;
                    }

                  }
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


