let actual = document.getElementById('#actual');
let pasada = document.getElementById('#pasada');

let escribe = document.querySelector('p');

let boton = document.querySelector('button');



$('#formulario').submit(function (evento) {

    evento.preventDefault(); 

    

    let actual= $('#actual').val();
    let pasada= $('#pasada').val();

    let resultado = 100 - (actual * 100 / pasada);

escribe.innerHTML= 'La cotización se ha modificado en un ' + resultado + ' %';



});