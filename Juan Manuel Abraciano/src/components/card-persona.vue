<template>
    <section style="margin-bottom:30px">
		<li>
			<span style="margin-right:50px;">{{persona.nombre}}, {{persona.sexo}}. {{persona.edad}} años.</span>
			<a @click="eliminar(persona.id)" style="color:red;">  Eliminar</a>
		</li>
	</section>
</template>

<script>
    export default {
        name: 'cardPersona',
        props: ['persona'],
		methods: {
        	eliminar(id) {
                this.$emit('borrarPersona', id);
            }
        }
    }
</script>
