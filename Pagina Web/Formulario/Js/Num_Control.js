const form = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const btn = document.querySelector('.form__btn');

const campos = {
	telefono: false,
	nombre: false
}

const expresiones = {
	
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	telefono: /^\d{8,8}$/ // 7 a 14 numeros.
}

const validarForm = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.telefono, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
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




inputs.forEach((input)=>{
    input.addEventListener('keyup', validarForm );
    input.addEventListener('blur', validarForm );

})




btn.addEventListener('click', (e)=>{
    e.preventDefault();
    const terminos = document.getElementById('terminos')
    if(campos.usuario && campos.nombre && terminos.checked ){
		formulario.reset();
        location.href="../Formulario/index3.html";
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