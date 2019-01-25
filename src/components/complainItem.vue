<template>
  <yd-layout>
      <div class="complainitem">
       <div class="itemtop">
         <div class="topleft"><img></div>
         <div class="topright">
           <p>{{complainitem.name}}-{{complainitem.feedbackCategory}}-{{complainitem.module}}-{{complainitem.complainDept}}</p>
           <p>{{complainitem.startDate}}</p>
         </div>
       </div>
       <!--<div class="process">-->
         <!--<div class="processleft"><yd-icon name="time" size="0.45rem" color="#888"></yd-icon></div>-->
         <!--<div class="processconter" @click="gonodeList">-->
            <!--<p>处理流程</p>-->
            <!--<p v-if="complainitem.factNodeName">当前节点 <span style="color:#4E7EC1 "> {{complainitem.factNodeName}}</span> </p>-->
            <!--<p v-else>已结束</p>-->
         <!--</div>-->

         <!--<div class="processright">-->
           <!--<yd-navbar-next-icon></yd-navbar-next-icon>-->
         <!--</div>-->
       <!--</div>-->
       <div class="messagetitle">
         诉求人信息
       </div>
       <div class="message">
          <div class="messitem"><span>工号</span><span>{{complainitem.workNo}}</span></div>
          <div class="messitem"><span>姓名</span><span>{{complainitem.name}}</span></div>
         <div class="messitem"><span>厂区</span><span>{{complainitem.area}}</span></div>
          <div class="messitem"><span>一级部门</span><span>{{complainitem.jobLevel1}}</span></div>
          <!--<div class="messitem"><span>二级部门</span><span>{{userInfo.jobLevel2}}</span></div>-->
          <!--<div class="messitem"><span>三级部门</span><span>{{userInfo.jobLevel3}}</span></div>-->
          <div class="messitem"><span>岗位</span><span>{{complainitem.workJob}}</span></div>
         <div class="messitem"><span>联系电话</span><span><a :href="'tel:'+complainitem.phoneNumber">{{complainitem.phoneNumber}}</a></span></div>
         <!--<div class="messitem"><span>微信</span><span><a :href="'tel:'+complainitem.wxNumber">{{complainitem.wxNumber}}</a></span></div>-->
       </div>
       <div class="messagetitle">
         诉求内容
       </div>
       <div class="message">
         <!--<div class="messitem"><span>投诉部门</span><span>{{complainitem.complainDept}}</span></div>-->
          <div class="messitem"><span>意见大类</span><span>{{complainitem.feedbackCategory}}</span></div>
          <div class="messitem"><span>意见小类</span><span>{{complainitem.module}}</span></div>

          <div class="messitem"><span>诉求描述</span><span>{{complainitem.incidentDescription}}</span></div>
       </div>
       <div class="imgs">
           <img v-for="item in picList" :src="'data:image/png;base64,'+item.url">
       </div>
        <div class="messagetitle">
          投诉流程
        </div>
        <node-list></node-list>
  </div>
  <div slot="tabbar" class="agree" v-if="complainitem.nodeName=='待确认'">
         <div class="agreetitle">您对处理结果</div>
         <div class="aord">
          <span @click="substatus('agree')">
             <i  slot="icon" class="iconfont icon-manyidu"  style="font-size:0.3rem"></i>
            满意</span>
          <span @click="substatus('disagree')"> <i  slot="icon" class="iconfont icon-bumanyi"  style="font-size:0.3rem"></i>
            不满意</span>
         </div>
      </div>
    <message style="z-index: 999" icon="icon-manyidu" v-if="messageshow=='agree'" @click="messageshow='sss'">
      <div slot="centerCont" class="messcontent">
        <div class="messtitle">提交成功</div>
        <div class="messcenter">感谢您对我们工作的大力支持，我们将继续努力！</div>
        <div class="messbut" @click="readytab">我知道了</div>
      </div>
    </message>
    <message style="z-index: 999" icon="icon-manyidu" v-if="messageshow2=='agree'" @click="messageshow='sss'">
      <div slot="centerCont" class="messcontent">
        <div class="messtitle">提交成功</div>
        <div class="messcenter">感谢您对我们工作的大力支持，我们将继续努力！</div>
        <div class="messbut" @click="goRate">我知道了</div>
      </div>
    </message>
    <message style="z-index: 999" icon="icon-manyidu" v-if="again=='true'" >
      <div slot="centerCont" class="messcontent">
        <div class="messtitle">提交失败</div>
        <div class="messcenter">请重新评分,谢谢配合!</div>
        <div class="messbut" @click="rateAgain">重新评分</div>
      </div>
    </message>
    <message style="z-index: 999" icon="icon-manyidu" v-if="againComfirm=='true'" >
      <div slot="centerCont" class="messcontent">
        <div class="messtitle">提交失败</div>
        <div class="messcenter">请重新确认,谢谢配合!</div>
        <div class="messbut" @click="comfirmAgain">重新确认</div>
      </div>
    </message>
    <message style="z-index: 999" icon="icon-manyidu" v-if="complainitem.nodeName=='待评分'">
             <!--v-if="messageshow=='agree'" @click="messageshow='sss'">-->
      <div slot="centerCont" class="messcontentSpe">
        <div style="text-align: center;font-size: 0.28rem">请您对我们的工作进行评分,一颗星代表一分,满分为五分,谢谢支持!</div>
        <yd-cell-item>
          <span slot="left">满意度总分</span>
          <span slot="right" style="font-size: 0.28rem">{{totalRecord}} 分</span>
        </yd-cell-item>
        <yd-cell-item>
          <yd-rate slot="right" v-model="rate8" ></yd-rate>
          <span slot="left">问题得到了解决</span>
        </yd-cell-item>
        <yd-cell-item>
          <yd-rate slot="right" v-model="rate9" ></yd-rate>
          <span slot="left">问题解决的很及时</span>
        </yd-cell-item>
        <yd-cell-item>
          <yd-rate slot="right" v-model="rate10" ></yd-rate>
          <span slot="left">服务态度好</span>
        </yd-cell-item>

        <div class="messbut" @click="submitOpt">提交</div>
      </div>
    </message>
    <message style="z-index: 999" icon="icon-bumanyi" v-if="messageshow=='disagree'" @click="messageshow='sss'">
      <div slot="centerCont" class="messcontent" style="width: 80%">
        <div class="messcenter" >
          <yd-textarea maxlength="500" v-model="disagreeres" placeholder="您投诉的信息，我们非常重视，会将此问题反馈给相应部门的HR进行处理。" style="background-color: #ddd;border-radius: 5px;padding: 5px">

          </yd-textarea>
      </div>
        <div class="messbut" @click="subdisagree">提交</div>
        <!--<div class="messbut" @click="messageshow='sss'">取消</div>-->
      </div>
    </message>
  </yd-layout>
</template>

<script>
  import message from "@/components/common/message.vue"
  import nodeList from "@/components/nodeList.vue"
  export default {
    components: {
      message,
      nodeList
    },
    data () {
    return {
      totalRecord:'',
      rate8: 0,
      rate9:0,
      rate10:0,
      fileId:'',
      again:'',
      againComfirm:'',
      picList:[],
      messageshow:'',
      messageshow2:'',
      disagreeres:"",
      token:"",
      userInfo:{},
      complainitem:{},
    }
  },
    watch:{
      rate8(curVal,oldVal){
        this.totalRecord=(curVal+this.rate9+this.rate10)/3;
        this.totalRecord=this.totalRecord.toString().substring(0,3)
      },
      rate9(curVal,oldVal){
        this.totalRecord=(curVal+this.rate8+this.rate10)/3;
        this.totalRecord=this.totalRecord.toString().substring(0,3)
      },
      rate10(curVal,oldVal){
        this.totalRecord=(curVal+this.rate9+this.rate8)/3;
        this.totalRecord=this.totalRecord.toString().substring(0,3)
      }
  },
  mounted: function(){
    this.token = this.$route.query.token;
    console.log(this.fileId);
    if(this.$route.query.fileId){
      this.fileId = this.$route.query.fileId.split(",");
      this.getPicList();
    }else{
      console.log("无图片")
    }



    this.complainitem=JSON.parse(localStorage.getItem('complainItem'));
    console.log(
      this.complainitem
    )
//    this.complainitem.nodeName='投诉人确认'
//    this.getuserInfo();

//    this.complainitem.nodeName='待评分'
  },
  methods:{
    comfirmAgain(){
      this.againComfirm="false";
      this.complainitem.nodeName='待确认'
    },
    rateAgain(){
      this.complainitem.nodeName="待评分";
      this.rate8=0
    },
    submitOpt(){
      console.log("评分提交");
      let vm = this;
      vm.api(vm,'get',"提交中","complainantRemark.json",{complainNumber:vm.complainitem.complainNumber,confirmRemark:vm.totalRecord,confirmRemarkjj:vm.rate8.toString(),confirmRemarkjs:vm.rate9.toString(),confirmRemarktd:vm.rate10.toString()},function (data) {
        console.log(data);
        console.log(typeof vm.rate8.toString());
        if(data.statusCode==0){
          vm.messageshow='agree';
          vm.complainitem.nodeName="已评分"
        }else{
          vm.again='true';
          vm.complainitem.nodeName="评分失败";
          console.log("评分失败")
        }
      });
    },
    getPicList:function (){
      let vm = this;
      for (var i=0;i<vm.fileId.length;i++){
        vm.api(vm,'get',"获取信息中","complainImage.json",{fileName:vm.fileId[i]},function (data) {
          console.log(data);
          var picBase={
            url:data.extData
          };
          vm.picList.push(picBase);

        });
        console.log(vm.picList)
      }

    },
    getuserInfo:function () {
      let vm = this;
      vm.api(vm,'get',"获取信息中","getUserInfo.json",{token:vm.token},function (data) {
        console.log(data);
        if(data.statusCode == 0){
          vm.userInfo =data.dataInfo.listData[0];
        }
      });
    },
    gonodeList:function () {
      this.$router.push({path:"nodeList",query:{token:this.token,complainNumber:this.complainitem.complainNumber}})
    },
    readytab:function () {
      let vm = this;
      vm.$router.replace({path:"mycomplain",query:{token:vm.token}});
      vm.shoumessage=false;
    },
    subdisagree:function () {
      if(this.disagreeres == ""){
        this.$dialog.toast({
          mes: '请填写不满意原因！',
          timeout: 1500
        });
        return
      }
      this.postmyms(this.disagreeres,'不满意');
    },
    goRate(){
      this.messageshow2='disagree';
      this.complainitem.nodeName='待评分'
    },
    postmyms:function (mess,stat) {
      let vm =this;
      vm.api(vm,'get',"提交中","complainantConfirm.json",{
        confirmComment:mess,
        confirmstatus:stat,
        complainNumber:vm.complainitem.complainNumber
      },function (data) {
        console.log(data);
        if(data.statusCode == 0){
          if(stat=='不满意'){
            console.log(
              "oooo"
            )
            vm.messageshow='agree'
          }else{
            vm.messageshow2='agree'
          }


//         vm.readytab();
        }else{
          vm.messageshow="提交失败";
          vm.againComfirm='true'
        }
      });
    },
    substatus:function (stats) {
      if(stats == 'agree'){
        this.postmyms('满意',"满意")
      } if(stats == 'disagree'){
        this.messageshow = 'disagree'
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.itemtop{
  display: flex;
  background-color: #fff;
  /*border-bottom: 0.2rem solid #eee;*/
  padding: 0.35rem 0.24rem ;
}
  .itemtop .topleft{
    width: 0.8rem;
    overflow: hidden;
  }
.itemtop .topright{
  flex:1;
  margin-left: 0.2rem;
}
.topright>p:first-child{

  line-height: 0.44rem;
  color: rgba(39, 55, 77, 1);
  font-size: 0.3rem;
}
.topright>p:last-child{
   line-height: 0.34rem;
   color: rgba(173, 190, 202, 1);
   font-size: 0.24rem;

 }
.itemtop .topleft img{
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 0.15rem;
  background-color: #eee;
}


  .process{
    display: flex;
    background-color: #fff;
    padding: 0.2rem 0.3rem;
    align-items: center;
  }
  .processconter{
    flex:1;
    margin-left: 0.3rem;
  }
  .processconter>p:first-child{
    line-height: 0.44rem;
    color: rgba(39, 55, 77, 1);
    font-size:0.3rem;
  }
.processconter>p:last-child{
  line-height: 0.44rem;
  color: rgba(16, 16, 16, 1);
  font-size:0.3rem;

}
  .processleft,.processright{
    width: 0.48rem;
    height: 0.48rem;
    display: flex;
    align-items: center;
  }
  .processright{
    justify-content: flex-end;
  }

  .messagetitle{
    height: 0.9rem;
    line-height: 0.9rem;
    background-color: rgba(245, 245, 245, 1);
    color: rgba(107, 120, 138, 1);
    font-size:0.26rem;
    padding-left: 0.24rem;
  }
  .messtitleSpe{
    height: 0.9rem;
    line-height: 0.9rem;
    background-color: rgba(245, 245, 245, 1);
    color: rgba(107, 120, 138, 1);
    font-size:0.16rem;
  }
.messitem{
  display: flex;
  line-height: 0.44rem;
  padding: 0.3rem 0.24rem;
  background-color: #fff;
  border-bottom: solid 1px #eee;
  color: rgba(39, 55, 77, 1);
  font-size: 0.3rem;


}
.messitem>span:first-child{
  width: 1.8rem;

}
.messitem>span:last-child{
  flex: 1;
}
  .imgs{
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding-bottom: 0.5rem;
  }
.imgs img{
  width: 30vw;
  height: 30vw;
  margin-left: 2vw;
  margin-top: 0.3rem;

}
  .agree{
    padding: 0.2rem 0;
    background-color: #fff;
    border-top: solid 1px #eee;
  }
  .agreetitle{
     text-align: center;
     line-height: 0.44rem;
     color: rgba(16, 16, 16, 1);
     font-size: 0.3rem;
   }
  .aord{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 0;


  }
.aord>span{
  border: solid 1px;
  border-radius: 4px;
  padding: 2px 10px;
  text-align: center;
  display: inline-block;
  width:2rem ;
}
.aord>span:first-child{
  border-color: #EC8487 ;
  color: #EC8487;
}
.aord>span:last-child{
  margin-left: 0.4rem;
  border-color: rgb(78, 113, 162)  ;
  color: rgb(78, 113, 162);
}

.messcontentSpe{
  width: 5.8rem;
}
.messcontent{
  width: 4.36rem;
}
.messcontent .messtitle{
  line-height: 0.52rem;
  color: rgba(78, 113, 162, 1);
  font-size: 0.36rem;
  text-align: center;
  font-weight: 600;
}
.messcontent .messcenter{
  margin-top: 0.16rem;
  line-height: 0.4rem;
  color: rgba(78, 113, 162, 1);
  font-size: 0.28rem;
  text-align: center;
  margin-bottom: 0.38rem;
}
.messcontent .messbut{
  margin-top: 0.18rem;
  height: 0.72rem;
  border-radius: 0.48rem;
  color: rgba(236, 132, 135, 1);
  font-size: 0.28rem;
  text-align: center;
  border: 1px solid rgba(236, 132, 135, 1);
  line-height: 0.72rem;
}
.messbut{
  margin-top: 0.18rem;
  height: 0.72rem;
  border-radius: 0.48rem;
  color: rgba(236, 132, 135, 1);
  font-size: 0.28rem;
  text-align: center;
  border: 1px solid rgba(236, 132, 135, 1);
  line-height: 0.72rem;
}
</style>
