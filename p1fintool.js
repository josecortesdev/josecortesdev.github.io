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


// --------------------- DESCUENTO

//let precioproducto = document.getElementById('#precioproducto');
//let porcentajeproducto = document.getElementById('#porcentajeproducto');

let escribepreciofinal = document.querySelector('#escribepreciofinal');


$('#descuentoform').submit(function (evento) {

    evento.preventDefault(); 

    

    let preciop= $('#precioproducto').val();
    let porcentajep= $('#porcentajeproducto').val();

    preciop = parseFloat(preciop);
    porcentajep = parseFloat(porcentajep);

    let preciofinal = preciop - preciop * (porcentajep/100);   //preciop - preciop * (porcentajep/100)

escribepreciofinal.innerHTML= 'Si descontamos el ' + porcentajep + '%,' + ' el precio final es: ' + preciofinal + ' euros.';



});
