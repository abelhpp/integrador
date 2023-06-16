// Arreglo
const usuarios = [];

// Selección de elementos del formulario
const formularioUsuarios = document.querySelector('.formularioUsuarios');
const contenedorusuarios = document.getElementById('contenedorusuarios');


// Realizar la solicitud de lectura de los usuarios
fetch('https://apex.oracle.com/pls/apex/encuentro/hr/empinfo/')
.then(response => response.json())
.then(function(data) {
    //data es una estructura de datos tiene el arreglo en items
    const authors = data['items'];
    
    // Para agregar a usuaris solo datos que necesitamos    
    for (const usua of authors){
        var user = {};
        user.nombre = usua.nombre;
        user.email = usua.email;
        user.contrasena = usua.contrasena;
        user.provincia = usua.provincia
        
        usuarios.push({...user})
    }
    //Hay que renderizar aca por los hilos de ejecucion
    renderizarUsuarios();
}).catch(error => {
  console.error('Error al obtener los usuarios:', error);
});

// Función para renderizar usuarios
function renderizarUsuarios() {
    contenedorusuarios.innerHTML = ''; // Limpiar el contenedor
    
    for (const usuario of usuarios) {
      const tarjeta = document.createElement('div');
      tarjeta.className = 'tarjeta';
      tarjeta.innerHTML = `
        
        <p><strong>nombre: ${usuario.nombre}</strong></p>
        <p>Email: ${usuario.email}</p>
        <p>Provincia: ${usuario.provincia}</p>
      `;
      contenedorusuarios.appendChild(tarjeta);
    }
}
  
/*
// Datos del nuevo usuario
const nuevoUsuario = {
    nombre: 'Juan',
    email: 'juan@example.com',
    contrasena: 'password123',
    provincia: 'Barcelona'
  };
  
// Realizar la solicitud de creación del usuario
fetch('https://apex.oracle.com/pls/apex/encuentro/hr/emp_post_example/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoUsuario)
})
.then(response => response.json())
.then(data => {
    console.log('Usuario creado:', data);
})
.catch(error => {
    console.error('Error al crear el usuario:', error);
});
  
*/




// Evento submit del formulario
formularioUsuarios.addEventListener('submit', function(event) {
    event.preventDefault();
    //Crear objeto vacio
    const newUser={};

    // Acceder a los valores del formulario
    newUser.nombre = formularioUsuarios.nombre.value;
    newUser.email = formularioUsuarios.email.value;
    newUser.contrasena = formularioUsuarios.contrasena.value;
    newUser.provincia = formularioUsuarios.provincia.value;

    // Agregar nuevo usuario al arreglo
    usuarios.push({...newUser});

    // Actualizar la visualización de usuarios
    renderizarUsuarios();

    // Limpiar los campos del formulario
    formularioUsuarios.reset();

    // Realizar la solicitud de creación del usuario
    fetch('https://apex.oracle.com/pls/apex/encuentro/hr/emp_post_example/', {
        method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...newUser})
    })
    .then(response => response.json())
    .then(data => {
        console.log('Usuario creado:', data);   
    })
    .catch(error => {
        console.error('Error al crear el usuario:', error);
    });
});


