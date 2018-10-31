<template>
    <section style="margin-bottom:30px">
        <div style="display:inline-block">
			<span>{{persona.nombre}}, {{persona.sexo == "f" ? "Mujer" : "Hombre"}}. {{persona.edad}} años.</span>
        </div>
        <div style="display:inline-block; float:right">
			<router-link :to="{ name: 'formPersona', params: { id: persona.id }}" class="control-link" style="margin-right:15px"> Editar</router-link>
            <router-link :to="{ name: 'eliminarPersona', params: { id: persona.id }}" class="control-link"> Eliminar</router-link>
        </div>
	</section>
</template>

<script>
    export default {
        name: 'cardPersona',
        props: ['persona']
    }
</script>
