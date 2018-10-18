<template>
    <section style="margin-bottom:30px">
		<li>
			<span style="margin-right:50px;">{{persona.nombre}}, {{persona.sexo == "f" ? "Mujer" : "Hombre"}}. {{persona.edad}} años.</span>
			<router-link :to="{ name: 'formPersona', params: { id: persona.id }}"> Editar</router-link>
            <router-link :to="{ name: 'eliminarPersona', params: { id: persona.id }}"> Eliminar</router-link>
		</li>
	</section>
</template>

<script>
    export default {
        name: 'cardPersona',
        props: ['persona']
    }
</script>
