const form = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const btn = document.querySelector('.form__btn');

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const validarForm = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('form__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('form__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .form__input-error`).classList.remove('form__input-error-activo');
        campos[campo] = true;
		
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('form__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('form__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .form__input-error`).classList.add('form__input-error-activo');
        campos[campo] = false;
	}
}

const validarPassword2 = () =>{
    const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('form__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('form__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .form__input-error`).classList.add('form__input-error-activo');
        campos['password'] = false;
    } else {
		document.getElementById(`grupo__password2`).classList.remove('form__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('form__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .form__input-error`).classList.remove('form__input-error-activo');
        campos['password'] = true;
        
    }

}

inputs.forEach((input)=>{
    input.addEventListener('keyup', validarForm );
    input.addEventListener('blur', validarForm );

})


function registrar(){
    let aNuevaRegistro = [],
    sUsuario = '',
	sNombre = '',
	sPassword = '',
	sCorreo = '',
	sTelefono = '';

    sUsuario = document.querySelector('#usuario').value;
    sNombre = document.querySelector('#nombre').value;
    sPassword = document.querySelector('#password').value;
    sCorreo = document.querySelector('#correo').value;
    sTelefono = document.querySelector('#telefono').value;

    aNuevaRegistro.push(sUsuario,sNombre,sPassword,sCorreo,sTelefono);
    guardarEnSistema(aNuevaRegistro);
    mostrarDatos();
   
}

function mostrarDatos(){
    let personas = getListaRegistro;
    tbody = document.querySelector('#tblRegistro tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < personas.length; i++){
        let fila = document.createElement('tr'),
            celdaUsuario = document.createElement('td'),
            celdaNombre = document.createElement('td'),
            celdaPassword = document.createElement('td'),
            celdaCorreo = document.createElement('td'),
            celdaTelefono = document.createElement('td');

            celdaUsuario.innerHTML = personas[i][0];
            celdaNombre.innerHTML = personas[i][1];
            celdaPassword.innerHTML = personas[i][2];
            celdaCorreo.innerHTML = personas[i][3];
            celdaTelefono.innerHTML = personas[i][4];

            fila.appendChild(celdaUsuario);
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaPassword);
            fila.appendChild(celdaCorreo);
            fila.appendChild(celdaTelefono);

            tbody.appendChild(fila);

    }
}

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    registrar();
    mostrarDatos();

    const terminos = document.getElementById('terminos')
    if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
		formulario.reset();

		document.getElementById('form__mensaje-exito').classList.add('form__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('form__mensaje-exito').classList.remove('form__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.form__grupo-correcto').forEach((icono) => {
			icono.classList.remove('form__grupo-correcto');
		});
	} else {
		document.getElementById('form__mensaje').classList.add('form__mensaje-activo');
	}

});