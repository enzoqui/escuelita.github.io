//Arreglo que contiene las palabras para jugar
let arrayPalabras =["PERA", "COCO", "MANGO", "SANDIA", "MANZANA", "NARANJA"];
//Arreglo que contiene las ayudas de cada palabra
let ayudas = [
    "Blanca por dentro, verde por fuera. Si quieres te lo digo, espera",
    "Tiene una cáscara dura y por dentro leche blanca",
    "Fruta de cáscara verde y naranja por dentro",
    "Es una fruta roja por dentro y verde por fuera",
    "Fruta redonda de color rojo o verde",
    "Tiene la cáscara anaranjada y por dentro gajos jugosos"
   
]
let imagenes = [
    "img/pera.jpg",
    "img/coco.jpg",
    "img/mango.jpg",
    "img/sandia.jpg",
    "img/manzana.jpg",
    "img/naranja.jpg"


  ];

  let contadorClicks = 0;
//variable que guarda la cantidad de palabras ya jugadas
let cantPalabrasJugadas = 0;

//Variable que guarda la cantidad de intentos restantes
let intentosRestantes = 5;

//variable que guarda el indice de la Palabra actual
let posActual;

//arreglo que contiene la palabra actual con la que estoy judando
let arrayPalabraActual = [];

//Cantidad de de letras acertadas por cada jugada
let cantidadAcertadas = 0;

//Arreglo que guarda cada letra en divs
let divsPalabraActual = [];

//Cantidad de palabras que debe acertar en cada jugada.
let totalQueDebeAcertar;

//Funcion que carga la  palabra nueva para jugar
function cargarNuevaPalabra(){
    //Aumento en uno cantidad de palabras jugadas y controlo si llego a su limite
    
    if(contadorClicks === 6) {
        location.reload(); 
        return; // Para salir de la función
      }
    
      contadorClicks++;
    cantPalabrasJugadas++;
    if(cantPalabrasJugadas>6){
        //volvemos a cargar el arreglo
        arrayPalabras =["PERA", "COCO", "MANGO", "SANDIA", "MANZANA", "NARANJA"];
        ayudas = [
            "Blanca por dentro, verde por fuera. Si quieres te lo digo, espera",
    "Tiene una cáscara dura y por dentro leche blanca",
    "Fruta de cáscara verde y naranja por dentro",
    "Es una fruta roja por dentro y verde por fuera",
    "Fruta redonda de color rojo o verde",
    "Tiene la cáscara anaranjada y por dentro gajos jugosos"
   
            
        ]
        
    }
   
    //Selecciono una posicion random
    posActual = Math.floor(Math.random()*arrayPalabras.length);
    
    //Tomamos la palabra nueva
    let palabra = arrayPalabras[posActual];

    let imagen = imagenes[posActual];

    
    //cantidad de letras que tiene esa palabra
    totalQueDebeAcertar = palabra.length;
    //coloco en 0 la cantidad acertadas hata el momento
    cantidadAcertadas = 0;

    //Guardamos la palabra que esta en formato string en un arreglo
    arrayPalabraActual = palabra.split('');


    //limpiamos los contenedores que quedaron cargadas con la palabra anterior
    document.getElementById("palabra").innerHTML = "";
    document.getElementById("letrasIngresadas").innerHTML = "";
    document.getElementById("imagen").innerHTML = "";

    //Cargamos la cantidad de divs (letras) que tiene la palabra
    for(i=0;i<palabra.length;i++){
        var divLetra = document.createElement("div");
        divLetra.className = "letra";
        document.getElementById("palabra").appendChild(divLetra);
        document.getElementById("imagen").innerHTML = `
      <img src="${imagen}" />  
    `;
    }

    //Selecciono todos los divs de la palabra
    divsPalabraActual = document.getElementsByClassName("letra");

    //setemos los intentos
    intentosRestantes = 5;
    document.getElementById("intentos").innerHTML = intentosRestantes;

    //Cargamos la ayuda de la pregunta
    document.getElementById("ayuda").innerHTML = ayudas[posActual];

   //elimino el elemento ya seleccionado del arreglo.
    //splice(posActual,1): A partir de la posicon posActual elimino 1 elemento
    arrayPalabras.splice(posActual,1);
    ayudas.splice(posActual,1);
    imagenes.splice(posActual,1);
}
document.getElementById("imagen").innerHTML = "";


//Llamada para cargar la primera palabra del juego
cargarNuevaPalabra();

//Detecto la tecla que el usuario presion
document.addEventListener("keydown", event => {
    
    //Controlo si la tecla presionada es una letra
    if(isLetter(event.key)){
        //Tomo las letras ya ingresadas hasta el momento
        let letrasIngresadas = document.getElementById("letrasIngresadas").innerHTML;
        //arma un a arreglo con las letras ingresadas
        letrasIngresadas = letrasIngresadas.split('');
        
        //controlo si la letra presionada ya ha sido ingresada
        if(letrasIngresadas.lastIndexOf(event.key.toUpperCase()) === -1){
            //variable bandera para saber si la letra ingresada esta en la palabra a descrubir
            let acerto = false;

            //Recorro el arreglo que ocntiene la palabra para verificar si la palabra ingresada esta
            for(i=0;i<arrayPalabraActual.length;i++){
                if(arrayPalabraActual[i] == event.key.toUpperCase()){//acertó
                    divsPalabraActual[i].innerHTML = event.key.toUpperCase();
                    acerto = true;
                    //Aumento en uno la cantidad de letras acertadas 
                    cantidadAcertadas = cantidadAcertadas + 1;
                }
            }
        
            //Controlo si acerto al menos una letra
            if(acerto==true){
                //controlamos si ya acerto todas
                if(totalQueDebeAcertar == cantidadAcertadas){
                    //asigno a cada div de la palabra la clase pintar para ponerlo en verde cada div
                    for(i=0;i<arrayPalabraActual.length;i++){
                        divsPalabraActual[i].className="letra pintar";
                    }
                }
            }else{
                //No acerto, decremento los intentos restantes
                intentosRestantes = intentosRestantes - 1;
                document.getElementById("intentos").innerHTML = intentosRestantes;

                //controlamos si ya acabo todas la oportunidades
                if(intentosRestantes<=0){
                    for(i=0;i<arrayPalabraActual.length;i++){
                        divsPalabraActual[i].className="letra pintarError";
                    }
                }
            }

            //agrega la letra ingresada a las letras ya ingresadas que se visualizan
            document.getElementById("letrasIngresadas").innerHTML += event.key.toLocaleUpperCase() + " - ";
        }
    }
});

//Funcion que me determina si un caracter es una letra
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

const btn = document.getElementById("btnReiniciar");

btn.addEventListener("click", () => {
  location.reload(); 
});

  // Código existente


// Resto del código...

// Código existente



// Resto del código...