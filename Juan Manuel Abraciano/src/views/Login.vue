<template>
   <section>
       <el-form :model="personForm" :rules="rules" ref="personForm" label-width="120px" class="demo-ruleForm">
           <el-form-item label="Nombre" prop="user">
                <el-input v-model="personForm.user" @change="cleanError()"></el-input>
            </el-form-item>
            <el-form-item label="Contraseña" prop="password">
                <el-input v-model="personForm.password" @change="cleanError()"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login('personForm')">Ingresar</el-button>
            </el-form-item>
       </el-form>
        <el-alert v-if="error" title="Error:" type="error">
            {{error}}
        </el-alert>
   </section>
</template>

<script>
import authService from '@/services/AuthService'

export default {
    name: 'login',
    data() {
        return {
            personForm: {
                user: '',
                password: ''
            },
            rules: {
                user: [
                    { required: true, message: 'Por favor ingrese el nombre', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Por favor ingrese la contraseña', trigger: 'blur' }
                ]
            },
            error: ''
        }
    },
    methods: {
        login(person) {
            this.$refs[person].validate((valid) => {
                if(valid) {           
                    authService.login(this.personForm.user, this.personForm.password)
                    .then((token) => {
                        this.$store.commit('setToken', token);
                        this.$router.push({name:'home'});
                    })
                    .catch((mensajeError) => {
                        this.error = mensajeError;
                    });
                }   
            });
        },
        cleanError() {
            this.error = '';
        }
    }
}
</script>
