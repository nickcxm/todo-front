<template>
  <div style=""  class="b" >
    <div>
      <el-row style="margin-top: 80px">
        <el-col :span="3"  class="left" style="margin-right:10px;margin-left:10px;">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{user.nickName}}</span>
              <i style="margin-left: 15px"  class="todo-dengchu" @click="logout"></i>
            </div>
            <el-button type="text"  @click="getImportant">
              重要的任务
            </el-button>
            <div v-for="g in this.groups"  class="text item">
              <el-button type="text"  @click="getMissions(g)">
                {{g.groupname}}
              </el-button>
              <i style="margin-left: 15px"  class="todo-shanchu" @click="deleteGroup(g)"></i>
            </div>
            <el-popover
                    placement="left-end"
                    width="200"
                    v-model="groupVisible">
              <el-form :model="groupForm" status-icon :rules="groupRules"  ref="groupForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="分组名" prop="groupname">
                  <el-input type="textarea" v-model="groupForm.groupname"></el-input>
                </el-form-item>
              </el-form>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="groupVisible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="addGroup">确定</el-button>
              </div>
              <el-button slot="reference" style="float: right; padding: 3px 0"  type="text"><i class="todo-tianjia"></i></el-button>
            </el-popover>
          </el-card>
        </el-col>
        <el-col :span="20" style="margin-left: 20px">
          <el-card class="box-card" >
            <div slot="header" class="clearfix">
              <span v-if="!isImportant">{{group.groupname}}</span>
              <span v-else>重要的任务</span>
              <el-popover
                      v-if="!isImportant"
                      placement="left-end"
                      width="200"
                      v-model="visible2">
                <el-form :model="missionForm" status-icon :rules="rules"  ref="ruleForm2" label-width="120px" class="demo-ruleForm">
                  <el-form-item label="todo信息" prop="text">
                    <el-input type="textarea" v-model="missionForm.text"></el-input>
                  </el-form-item>
                  <el-form-item label="重要">
                    <el-switch v-model="missionForm.important"></el-switch>
                  </el-form-item>
                </el-form>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="addMission">确定</el-button>
                </div>
                <el-button slot="reference" style="float: right; padding: 3px 0"  type="text"><i class="todo-tianjia"></i></el-button>
              </el-popover>
            </div>

            <div v-for="m in missions"  class="text item" >
              <el-row>
                <el-col :span="2">
                  <el-switch
                          :ref="m.id"
                          v-model="m.status"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                          style="margin-top: 22px"
                          active-value="1"
                          inactive-value="0"
                          @change="changeMissionStatus(m)"
                  >
                  </el-switch>
                </el-col>
                <el-col :span="21">
                  <h4 :class="{complete:m.status==1}" style="margin-left: 20px;margin-right: 20px;text-align: left;"><i  :class="{'todo-star':m.important,'todo-xingxing':!m.important}" @click="important(m)"></i> {{m.text}}</h4>
                </el-col>
                <el-col :span="1" >
                  <!--<el-button @click="deleteMission(m)" type="danger" size="mini" style="margin-top: 18px" icon="el-icon-delete" circle></el-button>-->
                  <el-button @click="deleteMission(m)" type="danger" size="mini" style="margin-top: 18px" icon="todo-shanchu" circle></el-button>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import {getGroups,delGroup,addGroup} from "../api/Group";
import {getMissions,addMission,change,delMissions,getImp} from "../api/Missions";
import '../assets/icon/iconfont.css'
import '../assets/icon/iconfont'
import '../assets/icon/iconfont.svg'
export default {
  name: 'home',
  data(){
    return{
      groups:[],
      missions:[],
      group:undefined,
      groupVisible:false,
      groupParam:{user:undefined},
      missionParam:{user:undefined,groupId:undefined},
      user:{},
      groupForm:{
        id:undefined,
        groupname:undefined,
        user:undefined
      },
      isImportant:false,
      missionForm:{
        id:undefined,
        text:'',
        important:false,
        user:undefined,
        status:'0',
        groupid:undefined
      },
      visible2:false,
      rules: {
        text:[{required:true,message: '请输入任务', trigger: 'blur' }]
      },
      groupRules: {
        groupName:[{required:true,message: '输入分组名称', trigger: 'blur' }]
      }
    }
  },
  components: {

  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods:{
    ...mapActions({ setSignOut: "setSignOut" }),
    logout(){
      this.setSignOut();
      this.$router.push("/")
    },
    // 检查是否已经登录
    checkLogin(){
      if(this.userInfo.data===undefined){
        this.$router.push("/")
      }
    },
    // 获取重要的任务
    getImportant(){
      var a={uid:this.user.id}
      this.isImportant=true
      // this.group.groupname="重要的任务"
      getImp(a).then(res=>{
        this.missions=res.data.data
      })
    },
    // 标记任务是否重要
    important(m){
      m.important=!m.important
      change(m).then(res=>{
        if (this.isImportant){
          this.missions.splice(this.missions.indexOf(m),1)
        }else {
          for (const v of this.missions){
            if (v.id==m.id) {
              v.important = m.important
            }
          }
        }

      })
    },
    // 添加分组
    addGroup(){
      this.$refs['groupForm'].validate((valid) => {
        if (valid){
          this.groupForm.user=this.user.id;
          addGroup(this.groupForm).then(res=>{
            this.groups.push(res.data)
            this.groupForm.groupname=undefined
            this.groupVisible=false
          }).catch(e=>{
            this.groupForm.groupname=undefined
            this.$notify({
              title: 'fail',
              message: '新增失败'
            });
            this.groupVisible=false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })

    },
    // 删除分组
    deleteGroup(g){
      console.log(g)
      var a={id:g.id};
      delGroup(a).then(res=>{
        var index=this.groups.indexOf(g);
        this.groups.splice(index,1);
      })
    },
    // 删除任务
    deleteMission(m){
      var a={id:m.id};
      delMissions(a).then(res=>{
        var index=this.missions.indexOf(m);
        this.missions.splice(index,1);
      })
    },
    // 更改任务的状态
    changeMissionStatus(mission){
      var m=mission;
      m.status=m.status=='1'?'1':'0';
      change(m).then(res=>{
        for (const v of this.missions){
          if (v.id==m.id) {
            v.status = m.status
          }
        }
      })
    },
    // 添加任务
    addMission(){
      this.$refs['ruleForm2'].validate((valid) => {
        if (valid) {
          if (this.group==undefined){
            this.$notify({
              title: '提示',
              message: '请选择一个分组'
            });
            return;
          }
          this.missionForm.groupid=this.group.id
          this.missionForm.user=this.user.id
          addMission(this.missionForm).then(res=>{
            this.missions.push(res.data.data)
            // this.$notify({
            //   title: 'success',
            //   message: '新增成功'
            // });
            this.missionForm.text='';
            this.missionForm.important=false
            this.visible2=false
          }).catch(e=>{
            this.$notify({
              title: '提示',
              message: '新增错误'
            });
            this.missionForm.text='';
            this.missionForm.important=false
            this.visible2=false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    // 查询分组信息
    queryGroups(){
      this.user=this.userInfo.data
      this.groupParam.user=this.userInfo.data.id
      getGroups(this.groupParam).then(res=>{
        this.groups=res.data
        // if (this.groups.length>0){
        //   this.group=this.groups[0]
        //   this.getMissions(this.group)
        // }
      }).catch(e=>{
        console.log(e)
      })
    },
    // 查询任务信息
    getMissions(g){
      this.group=g
      this.missionParam.user=this.userInfo.data.id
      this.missionParam.groupId=g.id
      getMissions(this.missionParam).then(res=>{
        this.missions=res.data
        this.isImportant=false
      }).catch(e=>{
        console.log(e)
        this.isImportant=false
      })
    }
  },
  created(){
    // this.test()
    this.checkLogin()
    this.queryGroups()
    this.getImportant()
  },
}
</script>
<style>
body{
  /*background-image: url('./../assets/bj.png');*/
  background-color: #E4E7ED;
}
  .complete{
    text-decoration-line: line-through;
  }

.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.b{
  background:url('./../assets/backgroud.jpg') center 0 no-repeat;
  background-size:cover;
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
}
</style>
