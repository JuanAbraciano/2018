export default {
  traerTodos() {
    return JSON.parse(localStorage.getItem("people") || []);
  },

  traerUno(id) {
    return new Promise((res, rej) => {
      try {
        const personas = this.traerTodos();

        setTimeout(() => {
          res(personas.find(persona => persona.id === id));
        }, 1000);
      } catch(e) {
        rej(e.toString());
      }
    });
  },

  guardar(nombre, edad, sexo){
    const persona = {nombre, edad, sexo};
    const personas = this.traerTodos();
    
    personas.push(persona);
  }
}