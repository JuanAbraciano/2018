<template>
    <section style="margin-bottom:30px">
		<li>
			<span style="margin-right:50px;">{{persona.nombre}}, {{persona.sexo == "f" ? "Mujer" : "Hombre"}}. {{persona.edad}} años.</span>
			<a @click="borrarPersona(persona.id)" style="color:red;">  Eliminar</a>
		</li>
	</section>
</template>

<script>
    export default {
        name: 'cardPersona',
        props: ['persona'],
		methods: {
        	borrarPersona(id) {
                this.$emit('borrarPersona', id);
            }
        }
    }
</script>
