<template>
    <section>
        <p :class="{'msg-success':paramsMensajeEstado.estado == 'ok', 'msg-error':paramsMensajeEstado.estado == 'error'}">{{paramsMensajeEstado.msj}}</p>
        
        <a @click="volver" class="control-link">Volver</a>
    </section>
</template>

<script>
export default {
    name: 'mensajeEstado',
    props: ['paramsMensajeEstado'],
    methods:{
        volver(){
            this.$router.push({ name: this.paramsMensajeEstado.backTo});
        }
    }
}
</script>

<style>
    .msg-success{
        color: green;
    }
    .msg-error{
        color:red;
    }
</style>


