function guardarStorage(key, value){
  localStorage.setItem(key, JSON.stringify(value));  
}

function traerStorage(){
  return localStorage["people"] ? JSON.parse(localStorage.getItem("people")) : [];
}

function traerUltimoId(){
  const personas = traerStorage();
  return personas.length > 0 ? Math.max.apply(Math, personas.map(function(p) { return p.id; })) : 0;
}

export default {
  traerTodos() {
    return new Promise((res, rej) =>{
      setTimeout(() => {
        try{
          res(traerStorage());
        } catch(e){
          rej("Ocurrió un error al traer la lista de personas (" + e.toString() + ")");
        }
      }, 1500);
    });
  },

  traerUno(id) {
    return new Promise((res, rej) => {
      try {
        const personas = traerStorage();
        setTimeout(() => {
          res(personas.find(persona => persona.id === id));
        }, 1000);
      } catch(e) {
        rej(e.toString());
      }
    });
  },

  crearPersona(nombre, edad, sexo){
    return new Promise((res, rej) =>{
      setTimeout(() => {
        try{
          const personas = traerStorage();  
          const id = traerUltimoId() + 1;
          const persona = {nombre, edad, sexo, id};
          personas.push(persona);
          guardarStorage("people", personas);
          res("Persona creada correctamente");          
        } catch(e){
          rej("La persona no pudo ser creada (" + e.toString() + ")");
        }
      }, 1500);
    });
  },

  modificarPersona(nombre, edad, sexo, id){
    return new Promise((res, rej) =>{
      setTimeout(() => {
        try{
          const personas = traerStorage();
          const persona = personas.find(persona => persona.id === id);
          persona.nombre = nombre;
          persona.edad = edad;
          persona.sexo = sexo;
          guardarStorage("people", personas);
          res("Persona modificada correctamente");          
        } catch(e){
          rej("La persona no pudo ser modificada (" + e.toString() + ")");
        }
      }, 1500);
    });
  },

  eliminarPersona(id){
    return new Promise((res, rej) => {
      setTimeout(() => {
        try{
          let personas = traerStorage();
          personas = personas.filter(persona => persona.id !== id);
          guardarStorage("people", personas);
          res("Persona eliminada correctamente"); 
        } catch(e){
          rej("La persona no pudo ser eliminada (" + e.toString() + ")");
        }
      }, 1000);
    });
  }
}