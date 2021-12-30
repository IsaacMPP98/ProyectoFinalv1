let listaRegistro = [
    ['deka','luis','pepe','eee','eeee']
];

function guardarEnSistema(pRegistroNuevo){
    let  listaRegistro = getListaRegistro();
    listaRegistro.push(pRegistroNuevo);
    localStorage.setItem('nuevo',JSON.stringify(listaRegistro));

}

function getListaRegistro(){
    let ListaRegistroLocal = JSON.parse(localStorage.getItem('nuevo'));
    if(ListaRegistroLocal == null){
        ListaRegistroLocal = listaRegistro;
    }
    return ListaRegistroLocal;
}