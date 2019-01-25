<template>
  <div class="addcomplain">
    <div style="position: fixed;bottom: 45px;width: 100%;overflow: scroll;top: 0;">
      <div class="messagetitle">
        诉求人信息
      </div>
      <div class="message">
        <div class="messitem"><span><i>*</i>工号</span><span><input placeholder="请输入工号" v-model="form.workNo" disabled/></span></div>
        <div class="messitem"><span><i>*</i>姓名</span><span><input placeholder="请输入姓名" v-model="form.name" disabled/></span></div>
        <div class="messitem"><span><i>*</i>厂区</span><span><input placeholder="请输入厂区" v-model="form.changqu" disabled/></span></div>
        <div class="messitem" v-show="moreshow"><span><i>*</i>一级部门</span><span><input placeholder="请输入一级部门" v-model="form.jobLevel1"/></span></div>
        <div class="messitem" v-show="moreshow"><span style="padding-left: 0.4rem">二级部门</span><span><input placeholder="请输入二级部门" v-model="form.jobLevel2"/></span></div>
        <div class="messitem" v-show="moreshow"><span style="padding-left: 0.4rem">三级部门</span><span><input placeholder="请输入三级部门" v-model="form.jobLevel3"/></span></div>
        <div class="messitem" v-show="moreshow"><span><i>*</i>岗位</span><span><input placeholder="请输入岗位" v-model="form.workJob"/></span></div>
        <div class="messitem"><span><i>*</i>联系电话</span><span><input placeholder="请输入联系电话" v-model="form.phoneNumber"/></span></div>
        <div class="messitem"><span style="padding-left: 0.4rem">微信</span><span><input placeholder="请输入微信" v-model="form.phoneNumberBrief"/></span></div>
        <!--<div class="more" @click="moreshow=!moreshow">-->
        <div class="more" style="display: none">
          <i class="iconfont icon-icon-angle-double-bottom"  style="font-size:0.5rem;color: #555" v-if="!moreshow"></i>
          <i class="iconfont icon-icon-angle-double-top"  style="font-size:0.5rem;color: #555" v-if="moreshow"></i>
        </div>
      </div>

      <div class="messagetitle">
        诉求内容
      </div>
      <div class="message">
        <div class="messitem"><span><i>*</i>诉求部门</span><span>
        <select v-model="form.feedbackCategory" style="color:	#a8a8a8">
          <option value="" disabled selected hidden >请选择诉求部门</option>
          <option v-for="i in dept" :value="i">{{i}}</option>
        </select>
      </span></div>
        <div class="messitem"><span><i>*</i>意见大类</span><span class="selctcont">
        <select v-model="form.area" style="color:	#a8a8a8" @change="selectSmallOpinion">
          <option value="" disabled selected hidden >请选择意见大类</option>
          <option v-for="i in areas" :value="i">{{i}}</option>
        </select>
      </span></div>
        <div class="messitem"><span><i>*</i>意见小类</span><span>
        <select v-model="form.module" style="color:	#a8a8a8">
          <option value="" disabled selected hidden >请选择意见小类</option>
         <option v-for="i in complainmodel" :value="i">{{i}}</option>
        </select>
      </span>
        </div>

        <div class="messitem"><span><i>*</i>诉求描述</span><span> <yd-textarea  v-model="form.incidentDescription" placeholder="请输入诉求描述" maxlength="500"  @blur.prevent="goScroll"></yd-textarea></span></div>
      </div>
      <div class="imgs">
        <div class="imgItem"  v-for="(i,n) in imgs">
          <img  :src="i">
          <yd-icon  class="deletimg" name="error-outline" size="0.5rem" color="#aaa" @click.native="deleteImg(n)"></yd-icon>
        </div>

        <div class="imgItem"  v-show="imgs.length<3">
          <i class="iconfont icon-zhaoxiangji"  style="font-size:0.8rem;color: rgb(255, 94, 83)"></i>
          <input type="file" accept="image/*"   id="inputfile" @change="preImg('inputfile')" >
        </div>
      </div>
      <message style="z-index: 99999" icon="icon-lingdang" v-show="shoumessage">
        <div slot="centerCont" class="messcontent">
          <div class="messtitle">提交成功</div>
          <div class="messcenter">我们将第一时间处理您的投诉/建议信息！</div>
          <div class="messbut" @click="readytab">我知道了</div>
        </div>
      </message>
    </div>
    <div class="myFooter" @click="subm">
      <button  :disabled="subtof" class="myButton">提交</button>
    </div>
  </div>
</template>

<script>
  import message from "@/components/common/message.vue"

  export default {
    components: {
      message
    },
    data () {
      return {
        subtof:false,
        moreshow:false,
        shoumessage:false,
        changqua:["石龙仔园区","光明园区","F栋","博罗园区","水田(G栋)","西丽","裕永兴"],
        dept:["电动汽车电池","电芯研究院","动力新能源","电池事业二部","电池事业三部","电池事业一部","电池事业五部","治具事业部","智能科技",
          "精密塑胶事业部","制造中心","设备工程事业部","智能硬件一部","智能硬件二部","自动化事业部","综合能源","普瑞赛思","工程技术创新中心","职能部门及其他部门"],
        areas:["工会","培训","欣旺达APP","人才管理","薪资绩效","人事服务","招聘调配","员工关系","其他问题"],
        complaintype:[],
        complainmodel:[],
        form:{
          workNo:"",
          name:"",
          changqu:"",
          jobLevel1:"",
          jobLevel2:"",
          jobLevel3:"",
          workJob:"",
          feedbackCategory:"",
          area:"",
          phoneNumber:"",
          phoneNumberBrief:"",
          module:"",
          incidentDescription:"",
          file:"",
        },
        token:"",
        imgs:[],//存图片的src
        subFile:[]//存图片的上传的图片
      }
    },
    mounted: function(){
      this.token = localStorage.getItem("usertoken");
      this.getuserInfo();
      console.log(document.getElementsByTagName("footer"));

    },
    methods:{
      convertBase64UrlToBlob: function (urlData) {
        var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/png'});
      },
      dealImage: function (path, obj, callback) {
        var img = new Image();
        img.src = path;
        img.onload = function () {
          var that = this;
          // 默认按比例压缩
          var w = that.width,
            h = that.height,
            scale = w / h;
          w = obj.width || w;
          h = obj.height || (w / scale);
          var quality = 0.8;  // 默认图片质量为1
          //生成canvas
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          // 创建属性节点
          var anw = document.createAttribute("width");
          anw.nodeValue = w;
          var anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(that, 0, 0, w, h);
          // 图像质量
          if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
          }
          // quality值越小，所绘制出的图像越模糊
          var base64 = canvas.toDataURL('image/jpeg', quality);
          // 回调函数返回base64的值
          callback(base64);
        }
      },
      preImg:function (fileId) {
        let vm = this;
        var src = this.getFileUrl(fileId);
        vm.imgs.push(src);
        vm.dealImage(src,{width:300},function (base) {
          console.log(vm.convertBase64UrlToBlob(base));
          vm.subFile.push(vm.convertBase64UrlToBlob(base))
          console.log(vm.imgs);
        })

      },
      deleteImg:function (n) {
        console.log(n);
        this.imgs.splice(n,1);
        this.subFile.splice(n,1);
        document.getElementById('inputfile').value = '';
        console.log(this.imgs);
        console.log(this.subFile)
      },
      goScroll(){
        console.log(
          "aaaa"
        )
      },
      selectSmallOpinion(){
        console.log(this.form.area);
        switch(this.form.area){
          case '工会':
            this.complainmodel=['工会建设','困难帮扶'];
            break;
          case  '培训':
            this.complainmodel=['培训发展'];
            break;
          case  '欣旺达APP':
            this.complainmodel=['欣旺达APP'];
            break;
          case  '人才管理':
            this.complainmodel=['晋升/降级问题'];
            break;
          case  '薪资绩效':
            this.complainmodel=['绩效问题','薪资问题','福利问题'];
            break;
          case  '人事服务':
            this.complainmodel=['入职办理','离职办理','考勤服务','招调工办理（户籍）','社保/公积金办理','意外险问题','其他人事服务'];
            break;
          case  '招聘调配':
            this.complainmodel=['招聘调配'];
            break;
          case  '员工关系':
            this.complainmodel=['员工关爱','部门管理','奖惩问题'];
            break;
          case  '其他问题':
            this.complainmodel=['其他问题'];
            break;
        }
      },
      getFileUrl:function (id) {//根据图片获取src
        console.log(document.getElementById(id).files[0]);
        var url;
        if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
          url = document.getElementById("inputfile").value;
        } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
          url = window.URL.createObjectURL(document.getElementById(id).files.item(0));
        } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
          url = window.URL.createObjectURL(document.getElementById(id).files.item(0));
        }else {
          url = window.webkitURL.createObjectURL(document.getElementById(id).files[0]);
        }
        return url;
      },
      getuserInfo:function () {
        let vm = this;
        console.log("aaaaaaaaaa");
        vm.api(vm,'get',"获取信息中","getUserInfo.json",{token:vm.token},function (data) {
          console.log(data);
          if(data.statusCode == 0){
            vm.form.changqu=data.dataInfo.listData[0].area;
            vm.form.workNo =data.dataInfo.listData[0].workNo;
            vm.form.name=data.dataInfo.listData[0].name;
            vm.form.jobLevel1=data.dataInfo.listData[0].jobLevel1;
            vm.form.jobLevel2=data.dataInfo.listData[0].jobLevel2;
            vm.form.jobLevel3=data.dataInfo.listData[0].jobLevel3;
            vm.form.workJob=data.dataInfo.listData[0].workJob;
            vm.form.phoneNumber="";
            vm.form.phoneNumberBrief="";
          }
        });
      },
      readytab:function () {
        let vm = this;
        vm.$router.replace({path:"mycomplain",query:{token:vm.token}});
        vm.shoumessage=false;

      },
      subm:function () {
        console.log(this.form);
        let vm = this;
        this.subtof = true;
        if(vm.form.incidentDescription==""){
          this.$dialog.toast({
            mes: "请填写投诉描述",
            timeout: 500
          });
          this.subtof = false;
          return
        }
        if(vm.form.workNo==""){
          this.$dialog.toast({
            mes: "请填写工号",
            timeout: 500
          });
          this.subtof = false;
          return
        }
        if(vm.form.name==""){
          this.$dialog.toast({
            mes: "请填写姓名",
            timeout: 500
          });
          this.subtof = false;
          return
        }
        if(vm.form.jobLevel1==""){
          this.$dialog.toast({
            mes: "请填写一级部门",
            timeout: 500
          });
          this.subtof = false;
          return
        }
        if(vm.form.workJob==""){
          this.$dialog.toast({
            mes: "请填写岗位",
            timeout: 500
          });
          this.subtof = false;
          return
        }
        if(vm.form.phoneNumber==""){
          this.$dialog.toast({
            mes: "请填写联系电话",
            timeout: 500
          });
          this.subtof = false;
          return
        }
        if(vm.form.phoneNumber.length!=11){
          this.$dialog.toast({
            mes: "电话号码位数不对",
            timeout: 500
          });
          this.subtof = false;
          return
        }
        if(vm.form.area==""){
          this.$dialog.toast({
            mes: "请选择意见大类",
            timeout: 500
          });
          this.subtof = false;
          return
        }
        if(vm.form.changqu==""){
          this.$dialog.toast({
            mes: "请输入厂区",
            timeout: 500
          });
          this.subtof = false;
          return
        }
        if(vm.form.module==""){
          this.$dialog.toast({
            mes: "请选择意见小类",
            timeout: 500
          });
          this.subtof = false;
          return
        }
        if(vm.form.feedbackCategory==""){
          this.$dialog.toast({
            mes: "请选择投诉部门",
            timeout: 500
          });
          this.subtof = false;
          return
        }
//      if(vm.form.feedbackCategory==""){
//        this.$dialog.toast({
//          mes: "请选择诉求类型",
//          timeout: 500
//        });
//        this.subtof = false;
//        return
//      }
        vm.$dialog.loading.open('正在提交');
        let formData = new FormData();
        for(let k in vm.subFile){ //文件数组
          formData.append('file',vm.subFile[k]);
        }
        formData.append('workNo',vm.form.workNo);
        formData.append('name',vm.form.name);
        formData.append('complainDept',vm.form.feedbackCategory);
        formData.append('jobLevel1',vm.form.jobLevel1);
        formData.append('jobLevel2', vm.form.jobLevel2);
        formData.append('jobLevel3', vm.form.jobLevel3);
        formData.append('workJob',vm.form.workJob);
        formData.append('feedbackCategory',vm.form.module);
        formData.append('phoneNumber',vm.form.phoneNumber);
        formData.append('wxNumber',vm.form.phoneNumberBrief);
        formData.append('module',vm.form.area);
        formData.append('area',vm.form.changqu);
        formData.append('incidentDescription',vm.form.incidentDescription);
//        formData.append('token',vm.token);
        $.ajax({
          type:"post",
          url:vm.path+"addComplain.json",
          data:formData,
          cache: false,
          contentType: false,
          processData:false,
          mimeType:"multipart/form-data",
          success:function(data){
            let a=JSON.parse(data);
            vm.$dialog.loading.close();
            if(a.statusCode==0){

              vm.shoumessage=true;
            }else{
              vm.$dialog.toast({
                mes: '添加失败',
                timeout: 1500
              });
            }

          }});

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .myFooter{
    position: fixed;
    bottom: 0;
    width: 100%;

    background-color: white;


    border-top: 1px solid #eeeeee;
  }
  .myButton{
    height: 40px;
    width: 100%;

    border: none;
    background-color: rgb(255, 94, 83);
    color: white;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;;
  }
  .messagetitle{
    height: 0.8rem;
    line-height: 0.8rem;
    background-color: rgba(245, 245, 245, 1);
    color: rgba(107, 120, 138, 1);
    font-size:0.26rem;
    padding-left: 0.24rem;
  }

  .messitem{
    display: flex;
    line-height: 0.44rem;
    padding: 0.25rem 0.24rem;
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
  .more{
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .message select{
    width: 100%;
    border: none;
  }
  .imgs{
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding-bottom: 0.5rem;
  }
  .imgs .imgItem{
    position: relative;
    overflow: hidden;
    width: 30vw;
    height: 30vw;
    margin-left: 2vw;
    margin-top: 0.3rem;
    border: solid 1px #eee;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .imgs  input {
    position: absolute;
    display: block;
    font-size: 60px;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .imgItem  .deletimg{
    position:absolute ;
    top: 0;
    right: 0;
    line-height: 0.5rem;
    /*box-shadow: 1px 1px 2px #555;*/
    border-radius: 50%;
    /*background-color: #aaa;*/
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
  }
  .messcontent .messbut{
    margin-top: 0.38rem;
    height: 0.72rem;
    border-radius: 0.48rem;
    color: rgba(236, 132, 135, 1);
    font-size: 0.28rem;
    text-align: center;
    border: 1px solid rgba(236, 132, 135, 1);
    line-height: 0.72rem;
  }
  i{
    margin-right: 0.2rem;
    color: red;
  }
</style>
