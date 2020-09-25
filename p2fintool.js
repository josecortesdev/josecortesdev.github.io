


// El JavaScript que usaré para fetch con archivos

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

    console.log('llega a residencias');
    
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
    
    
    } 
    const numeros= [1,2,3,4,5,6,7,8,9]
    const numerosfiltrados = numeros.filter(x => x<5);
        console.log(numerosfiltrados, numeros);
    
    const mascotas = [{nombre: 'puchini', raza: 'perro'},{nombre: 'chanchito', raza: 'gato'},{nombre: 'pulga', raza: 'perro'}]
    
    const perros = mascotas.filter(x => x.raza=='perro')
    console.log(perros);
    
    // ---------- IRPF SIN BOTÓN

    
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
  