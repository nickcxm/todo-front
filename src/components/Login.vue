<template>
   <div class="b">
       <el-row type="flex" class="row-bg" style="margin-top: 80px" justify="center">
           <el-col :span="6">
               <el-form  :model="loginForm" :rules="loginRules"  ref="loginForm" >
                   <el-form-item prop="userName">
                       <el-input v-model="loginForm.userName" placeholder="用  户  名"></el-input>
                   </el-form-item>
                   <el-form-item prop="passWord">
                       <el-input name="passWord" :type="passwordType" @keyup.enter.native="flag && handleLogin()" v-model="loginForm.passWord" autoComplete="off" placeholder="密  码" />
                   </el-form-item>
                   <!--<div style="width: 200px">-->
                   <el-row type="flex" class="row-bg" justify="center">
                       <el-col :span="12">
                           <el-button type="primary" :loading="loading" @click="flag && handleLogin()"><i class="todo-denglu"></i>登录</el-button>
                       </el-col>
                       <el-col :span="12">
                           <el-button type="info"   @click="jumpSignup"><i class="todo-zhuce"></i>注册</el-button>
                       </el-col>
                   </el-row>
                   <!--</div>-->
               </el-form>
           </el-col>
       </el-row>
   </div>
</template>

<script>
    import {login} from '@/api/User'
    import { mapActions } from "vuex";
    export default {
        name: "Login",
        data(){
            const validateUsername = (rule, value, callback) => {
                if (validateUsername == null) {
                    callback(new Error('请输入正确的管理员用户名'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('管理员密码长度应大于6'))
                } else {
                    callback()
                }
            }
            return{
                loginForm:{
                    userName:'',
                    passWord:''
                },
                loginRules: {
                    userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
                    passWord: [{ required: true, trigger: 'blur', validator: validatePassword }]
                },
                passwordType: 'password',
                flag: true,
                loading: false
            }
        },
        methods:{
            jumpSignup(){
                this.$router.push("/signup")
            },
            ...mapActions({ setUserInfo: "setUserInfo" }),
            handleLogin(){
                this.$refs.loginForm.validate(valid=>{
                    if (valid&&!this.loading){
                        this.loading = true
                        this.flag = false
                        login(this.loginForm).then(res=>{
                            if (res.data.code==200){
                                this.setUserInfo(res.data);
                                this.$router.replace("/home");
                            }else {
                                this.$notify({
                                    title: '提示',
                                    message: res.data.msg
                                });
                                this.loading = false
                                this.flag = true
                            }

                        })
                    }
                })
            }
        }
    }
</script>

<style >
.b{
    background:url('./../assets/backgroud.jpg') center 0 no-repeat;
    background-size:cover;
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #2d3a4b;
    margin-left: -8px;
    margin-top: -8px;
}
</style>