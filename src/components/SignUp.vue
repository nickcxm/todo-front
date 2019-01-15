<template>
    <div class="b">
        <el-row type="flex" class="row-bg" style="margin-top: 80px" justify="center">
            <el-col :span="4">
                <el-form  :model="signForm" :rules="signRules"  ref="signForm" >
                    <el-form-item prop="userName">
                        <el-input v-model="signForm.userName" placeholder="用  户  名"></el-input>
                    </el-form-item>
                    <el-form-item prop="passWord">
                        <el-input name="passWord" :type="passwordType"  v-model="signForm.passWord" autoComplete="off" placeholder="密      码" />
                    </el-form-item>
                    <el-form-item prop="nickName">
                        <el-input v-model="signForm.nickName" placeholder="暱      称"></el-input>
                    </el-form-item>
                    <el-row type="flex" justify="center">
                        <el-col :span="12">
                            <el-button type="primary"  :loading="loading" @click="flag && handleSignUp()"><i class="todo-zhuce"></i>注册</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {login,sign} from '@/api/User'
    export default {
        name: "SignUp",
        data(){
            const validateUsername = (rule, value, callback) => {
                if (validateUsername == null) {
                    callback(new Error('请输入正确的管理员用户名'))
                }else if (value.length<8){
                    callback(new Error('暱称应该大于7个字符'))
                }  else {
                    callback()
                }
            }
            const validateNickname = (rule, value, callback) => {
                if (validateNickname == null) {
                    callback(new Error('请输入正确的暱称'))
                } else if (value.length<4){
                    callback(new Error('暱称应该大于3个字符'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                var reg=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$");
                if (!reg.test(value)) {
                    callback(new Error('密码数字大小写8位以上'))
                    // callback()
                } else {
                    callback()
                }
            }
            return{
                signForm:{
                    userName:'',
                    passWord:'',
                    nickName:''
                },
                signRules: {
                    userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
                    nickName: [{ required: true, trigger: 'blur', validator: validateNickname }],
                    passWord: [{ required: true, trigger: 'blur', validator: validatePassword }]
                },
                passwordType: 'password',
                flag: true,
                loading: false
            }
        },
        methods:{
            handleSignUp(){
                this.$refs.signForm.validate(valid=>{
                    if (valid&&!this.loading){
                        this.loading = true
                        this.flag = false
                        sign(this.signForm).then(res=>{
                            if (res.data.code==200){
                                this.$notify({
                                    title: '提示',
                                    message: res.data.msg
                                });
                                this.$router.replace("/home");
                            } else {
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

<style scoped>
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