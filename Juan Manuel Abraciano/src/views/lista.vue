<template>
    <div id="lista">       
        <section style="margin-bottom:15px; vertical-align: middle;">
            <el-radio-group v-model="filtro">
                <el-radio label="todos">Ver todos</el-radio>
                <el-radio label="f">Ver mujeres</el-radio>
                <el-radio label="m">Ver varones</el-radio>
            </el-radio-group>
        </section>
        
        <section v-if="loading">Loading...</section>

        <section v-else>
            <p v-if="personas.length" class="description-link">Se muestran {{personasFiltradas.length}} personas (de un total de {{personas.length}})</p>
            <p v-else>No hay personas cargadas</p>
            <el-card v-for="p in personasFiltradas" :persona="p" :key="p.id" class="box-card">
                <div>
                    <div style=" float:left">
                        <h2>{{p.nombre}}</h2>
                        <span><i>{{p.edad}} años, {{p.sexo == 'f' ? 'Mujer' : 'Varón'}}</i></span>
                    </div>
                    <div style="display:inline-block; float:right">
                        <router-link :to="{ name: 'formPersona', params: { id: p.id }}" class="control-link" style="margin-right:15px"> 
                            <el-button type="primary">Editar</el-button>
                        </router-link>
                        <router-link :to="{ name: 'eliminarPersona', params: { id: p.id }}" class="control-link">
                            <el-button type="danger">Eliminar</el-button>
                        </router-link>
                    </div>
                </div>
            </el-card>
        </section>
    </div>
</template>

<script>
import PersonService from '@/services/personService'
import cardPersona from '@/components/card-persona.vue'

export default {
    name: 'lista',
    components:{
        cardPersona
    },
    data(){
        return{
            personas: [],
            filtro: 'todos',
            loading: false
        }
    },
    created(){
        this.loading = true;
        PersonService.traerTodos()
            .then((personas) => {
                this.loading = false;
                this.personas = personas;
            })
            .catch((mensajeError) => {
                this.loading = false;
                alert(mensajeError);
            })
    },
    computed: {
        personasFiltradas() {
            if(this.filtro == 'todos')
                return this.personas;
            else
                return this.personas.filter(persona => persona.sexo == this.filtro);
        }
    },
    methods: {
        borrarPersona(id) {
            this.$emit('borrarPersona', id);
        }
    }
}
</script>
