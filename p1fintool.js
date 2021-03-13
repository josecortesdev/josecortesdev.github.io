let actual = document.getElementById('#actual');
let pasada = document.getElementById('#pasada');

let escribe = document.querySelector('p');

let boton = document.querySelector('button');

//------------------------------------
var tabla = document.querySelector('#tabla')

var covid = document.querySelector('#tablacovid')





var co1 = document.querySelector('.co1')
var co2 = document.querySelector('.co2')
var co3 = document.querySelector('.co3')

var resultadoapirest = document.querySelector('.apirest')

//----------------------------   EMPEZAR --------------------   --------------------
function empezar(){

 //residencias();
 filtro();


    traeAPI();
    escribecotizacion();
    coronavirus();

 calculairpf();
 descuento();
cotizacion();


}
    
window.onload(empezar());
    
    //----------------------------  COTIZACIÓN   --------------------
    

function cotizacion(){


$('#formulario').submit(function (evento) {

    evento.preventDefault(); 

    

    let actual= $('#actual').val();
    let pasada= $('#pasada').val();

    let resultado = 100 - (actual * 100 / pasada);

escribe.innerHTML= 'La cotización se ha modificado en un ' + resultado + ' %';



});
}


// --------------------- DESCUENTO

function descuento(){

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

}



  
  

    

// ---------------- RESIDENCIAS

//function residencias(){

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

//}

// ----------- FILTRO

function filtro(){

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


} 
const numeros= [1,2,3,4,5,6,7,8,9]
const numerosfiltrados = numeros.filter(x => x<5);
    console.log(numerosfiltrados, numeros);

const mascotas = [{nombre: 'puchini', raza: 'perro'},{nombre: 'chanchito', raza: 'gato'},{nombre: 'pulga', raza: 'perro'}]

const perros = mascotas.filter(x => x.raza=='perro')
console.log(perros);

}


//------------- IRPF SIN BOTÓN
function calculairpf(){


    //Declarar variables reutilizables
    var input = $("#salariobase");
    var contenidoirpf = $("#contenidoirpf");
    
    //Evento keyup
    input.keyup(function() {

    let salarioinput = parseFloat(input.val());

    let IRPF2;

    

    if(salarioinput<12451) {
			
        IRPF2=salarioinput*0.19;
        
    }else if(salarioinput<20201) {  
        
        IRPF2=(12450*0.19) + (salarioinput-12450)*0.24;
        
    }else if(salarioinput<35201) {
        
        IRPF2=(12450*0.19) + (7750*0.24) + (salarioinput-20200)*0.3;
        
    }else if(salarioinput<60001){
        
        IRPF2= (12450*0.19) + (7750*0.24) + (15000*0.3) + (salarioinput-35200)*0.37;
        
    }else if(salarioinput>60000){
        
        IRPF2= (12450*0.19) + (7750*0.24) + (15000*0.3) + (24800*0.37) + (salarioinput-60000)*0.45;
        
    }else {
        
        IRPF2=1;   
        
    }

      contenidoirpf.html('<center> El IRPF es: <br><br><div class="alert alert-light" role="alert"> <h1>' + IRPF2 + ' euros</h1> </center></div>'); //agregamos en contenido
  
      
      if (input.val() === "") {      //Podemos verificar si está vacio el input

        contenidoirpf.html("");
      }
    });
  
  }



  //----------------------------   API INDICES --------------------   
function traeAPI(){

    console.log('llega a traeapi');

    fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US&lang=es", {
      "method": "GET",
      "headers": {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key": "5b296644afmsh7ee3b615df42b09p16bb4djsnecd1a4692888"
      }
  })
  .then( res => res.json())
  .then(datosmercado => {
  
  
  co1.innerHTML = `${datosmercado.marketSummaryResponse.result['0'].regularMarketChangePercent.fmt} `
  
  if (datosmercado.marketSummaryResponse.result['0'].regularMarketChangePercent.raw > 0){
  
    co1.style.color = "green";
  }else{
    co1.style.color = "red";
  }
  // ${datosmercado.marketSummaryResponse.result['14'].regularMarketPrice.raw}
  //FTSE 100 &nbsp; 
  co2.innerHTML = `${datosmercado.marketSummaryResponse.result['14'].regularMarketChangePercent.fmt}
  `
  if (datosmercado.marketSummaryResponse.result['14'].regularMarketChangePercent.raw > 0){
  
    co2.style.color = "green";
  }else{
    co2.style.color = "red";
  }
  
  
  
  })
  .catch(err => {
      console.log(err);
  });
  
  }

  
  
  //----------------------------   API ACCIONES --------------------   --------------------
  function escribecotizacion(){
  
    fetch("https://alpha-vantage.p.rapidapi.com/query?symbol=BRK.B&function=GLOBAL_QUOTE", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
        "x-rapidapi-key": "5b296644afmsh7ee3b615df42b09p16bb4djsnecd1a4692888"
      }
    })
    .then(res => res.json())
    .then(response => {
      console.log(response);
  
 
   co3.innerHTML = `${response['Global Quote']['10. change percent']} `
  
 
   if (response['Global Quote']['09. change'] > 0){
  
    co3.style.color = "green";
  }else{
    co3.style.color = "red";
  }
  

  
    })
    .catch(err => {
      console.log(err);
    });
  
  }
  
  
  
  
  //----------------------------   API COVID --------------------   --------------------
  function coronavirus(){
  
    fetch("https://covid-19-data.p.rapidapi.com/country?format=json&name=spain", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "5b296644afmsh7ee3b615df42b09p16bb4djsnecd1a4692888"
      }
    })
    .then( res => res.json())
    .then(datoscovid => {
   
  
      covid.innerHTML = ` <tr>
      <th scope="row">${datoscovid['0'].code}</th>
      <td>${datoscovid['0'].confirmed}</td>
      <td>${datoscovid['0'].deaths}</td>
      <td>${datoscovid['0'].recovered}</td>
    </tr> `
    })
    .catch(err => {
      console.log(err);
    });
  
    
  }
  


 
