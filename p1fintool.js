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


let escribepreciofinal = document.querySelector('#escribepreciofinal');


$('#descuentoform').submit(function (evento) {

    evento.preventDefault(); 

    

    let preciop= $('#precioproducto').val();
    let porcentajep= $('#porcentajeproducto').val();

    preciop = parseFloat(preciop);
    porcentajep = parseFloat(porcentajep);

    let preciofinal = preciop - preciop * (porcentajep/100);   //preciop - preciop * (porcentajep/100)

escribepreciofinal.innerHTML= '<center>Si descontamos el ' + porcentajep + '%,' + ' el precio final es: <br><br><div class="alert alert-light" role="alert"> <h1>' + preciofinal + '  euros</h1></div></center>';



});

// ---------------- DESCUENTO 2
// $(document).ready(function() {
   
//     var inputprecio = $("#precioproducto");
//     var porcentajeproducto = $("#porcentajeproducto");
//     var escribepreciofinal = $("#escribepreciofinal");

//     let almacenaprecio;
//     let almacenaporcentaje;



//     inputprecio.keyup(function() {  // Intro precio
      
//         almacenaprecio = inputprecio.val();
        
//         porcentajeproducto.keyup(function() {  // Intro porcentaje después de precio
        
//         almacenaporcentaje = porcentajeproducto.val();

//         inputprecio.keyup(function() {  // intro precio después de porcentaje
      
//             almacenaprecio = inputprecio.val();
  

//     almacenaprecio = parseFloat(almacenaprecio);
//     almacenaporcentaje = parseFloat(almacenaporcentaje);

//        let almacenaresultado = almacenaprecio - almacenaprecio * (almacenaporcentaje/100);

//         escribepreciofinal.html(almacenaresultado);
//         });
//     });
//     });

    


// });



  
  

    


// ------------------- IRPF


let escribeirpf = document.querySelector('#escribeirpf');


$('#irpfform').submit(function (evento) {

    evento.preventDefault(); 

    

    let salarioBruto= $('#salario').val();

    salarioBruto = parseFloat(salarioBruto);

    let IRPF;



    if(salarioBruto<12451) {
			
        IRPF=salarioBruto*0.19;
        
    }else if(salarioBruto<20201) {  // ME EQUIVOQUÉ, EN LAS DOS, TENGO QUE ACLARAR EL SUELDO QUE ME QUEDA Y EL IRPF A PAGAR, ,LAS DOS
        
        IRPF=(12450*0.19) + (salarioBruto-12450)*0.24;
        
    }else if(salarioBruto<35201) {
        
        IRPF=(12450*0.19) + (7750*0.24) + (salarioBruto-20200)*0.3;
        
    }else if(salarioBruto<60001){
        
        IRPF= (12450*0.19) + (7750*0.24) + (15000*0.3) + (salarioBruto-35200)*0.37;
        
    }else if(salarioBruto>60000){
        
        IRPF= (12450*0.19) + (7750*0.24) + (15000*0.3) + (24800*0.37) + (salarioBruto-60000)*0.45;
        
    }else {
        
        IRPF=1;    // RECUERDA PONER UNA VALIDACIÓN PARA EVITAR NÚMEROS NEGATIVOS
        
    }

   

escribeirpf.innerHTML=  IRPF ;



});


// ---------------- RESIDENCIAS

let residencias = document.querySelector('#tablaresidencias');

function traerJsonResidencias (){
    fetch('DatosResidencias.json')
    .then( res=> res.json())
    .then(datos => escribetabla(datos));
    console.log('hace el fetch');
}

function escribetabla(datos){

residencias.innerHTML='';
console.log('hasta aqui');
console.log('segundo');


for(let valor of datos){
    residencias.innerHTML+=
    `<tr>
    <th scope="row">${valor.id}</th>
    <td>${valor.Pais}</td>
    <td>${valor.Impuestos}%</td>
    <td>${valor.Tiempo}</td>
    <td>${valor.Otros} </td>
    <td>${valor.Salario} </td>
    <td>${valor.Apartamento} </td>
  </tr>`
}



}

// ----------- FILTRO

let escribefiltro = document.querySelector('#escribefiltro');

function jsonparafiltro (){
    fetch('DatosResidencias.json')
    .then( res=> res.json())
    .then(datos => filtrar(datos));
   
}

function filtrar(datos){

 const barato = datos.filter(x => x.Impuestos<3);
 console.log(barato);

 for (let filtrobarato of barato){
    escribefiltro.innerHTML+=` ${filtrobarato.Pais} <br>`;
 }

// for(let filtro of datos){
//     console.log('probando filtro');

//     //escribefiltro.innerHTML+= 'probando filtro'; 

//     if(`${filtro.Impuestos}`<10){

//     escribefiltro.innerHTML+= `${filtro.Pais}: ${filtro.Impuestos}% <br>`;  //`${valor.Pais}: ${valor.Impuestos} <br><br>`

   

//     }

//}

} 
const numeros= [1,2,3,4,5,6,7,8,9]
const numerosfiltrados = numeros.filter(x => x<5);
    console.log(numerosfiltrados, numeros);

const mascotas = [{nombre: 'puchini', raza: 'perro'},{nombre: 'chanchito', raza: 'gato'},{nombre: 'pulga', raza: 'perro'}]

const perros = mascotas.filter(x => x.raza=='perro')
console.log(perros);


//------------- SIN BOTÓN
$(document).ready(function() {
    //Declarar variables reutilizables
    var input = $("#salariobase");
    var contenidoirpf = $("#contenidoirpf");
    
    //Evento keyup
    input.keyup(function() {

    let salarioinput = parseFloat(input.val());

    let IRPF2;

    

    if(salarioinput<12451) {
			
        IRPF2=salarioinput*0.19;
        
    }else if(salarioinput<20201) {  // ME EQUIVOQUÉ, EN LAS DOS, TENGO QUE ACLARAR EL SUELDO QUE ME QUEDA Y EL IRPF A PAGAR, ,LAS DOS
        
        IRPF2=(12450*0.19) + (salarioinput-12450)*0.24;
        
    }else if(salarioinput<35201) {
        
        IRPF2=(12450*0.19) + (7750*0.24) + (salarioinput-20200)*0.3;
        
    }else if(salarioinput<60001){
        
        IRPF2= (12450*0.19) + (7750*0.24) + (15000*0.3) + (salarioinput-35200)*0.37;
        
    }else if(salarioinput>60000){
        
        IRPF2= (12450*0.19) + (7750*0.24) + (15000*0.3) + (24800*0.37) + (salarioinput-60000)*0.45;
        
    }else {
        
        IRPF2=1;    // RECUERDA PONER UNA VALIDACIÓN PARA EVITAR NÚMEROS NEGATIVOS
        
    }

      contenidoirpf.html('<center> El IRPF es: <br><br><div class="alert alert-light" role="alert"> <h1>' + IRPF2 + ' euros</h1> </center></div>'); //agregamos en contenido
  
      
      if (input.val() === "") {      //Podemos verificar si está vacio el input

        contenidoirpf.html("");
      }
    });
  });
 
