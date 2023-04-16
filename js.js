// Encriptar
var textoEntrada = document.querySelector(".container-encriptador > textarea");
var resultado = document.querySelector(".resultado");
var btnEncriptar = document.querySelector(".btn-encriptar");
var btnDesencriptar = document.querySelector(".btn-desencriptar");
var btnCopiar = document.querySelector(".btn-copiar");

resultado.setAttribute("style", "display: none;");

var diccionario = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

// for (const clave in diccionario) {
//     console.log(`${clave.toString()}: ${diccionario[clave]}`);
// }

// texto = 'HolaDaniel'

// for (const i in texto) {
//     console.log(texto[i]);
// }

// Validar datos de entrada, solo caracteres entre a-z y sin caracteres especiales
function validarDatos(texto) {
  // Esta expresion regular verifica solo caracteres entre a-z
  // ^ indica el inicio de la cadena y $ el final, + valida que haya una o mas veces, con * es cero o mas veces, el bloque entre []
  // el espacio en el bloque [] indica que tambien estaran espacios
  let expresionRegular = /^[a-z ]+$/;
  // con el metodo test verficamos la expresion regular sobre el texto, devuelve un boolean
  return expresionRegular.test(texto);
}

//console.log(validarDatos("a"));

// Copiar datos al portapapeles
function leerPortapapales() {
  let res = "";
  // Esto sirve par verificar que tengamos acceso al portapapeles.
  // if ('permissions' in navigator && 'clipboard-read' in navigator.permissions) {
  //     // El navegador admite la API de Permissions y la API de acceso al portapapeles
  //     navigator.permissions.query({ name: 'clipboard-read' })
  //         .then(result => {
  //             if (result.state === 'granted') {
  // El usuario ha otorgado permisos
  //             } else {
  //                 // El usuario no ha otorgado permisos
  //                 console.log("El usuario no ha otorgado permisos");
  //             }
  //         })
  //         .catch(error => {
  //         console.error(`Error al solicitar permisos: ${error}`);
  //         });
  // } else {
  //     // El navegador no admite la API de Permissions y/o la API de acceso al portapapeles
  //     console.log("El navegador no admite la API de Permissions y/o la API de acceso al portapapeles");
  // }
  navigator.clipboard
    .readText()
    .then((texto) => {
      res = texto;
      console.log(`El texto en el portapapeles es: ${texto}`);
    })
    .catch((error) => {
      console.error(`Error al leer el portapapeles: ${error}`);
    });
  return res;
}

function copiarDatos(texto) {
  // Copiar al portapapeles
  navigator.clipboard
    .writeText(texto)
    .then(() => {
      alert("Texto copiado " + texto);
    })
    .catch((error) => {
      alert(`Error al agregar texto al portapapeles: ${error}`);
    });
  // Leer el portapapeles
  navigator.clipboard
    .readText()
    .then((texto) => {
      console.log(`El texto en el portapapeles es: ${texto}`);
    })
    .catch((error) => {
      console.error(`Error al leer el portapapeles: ${error}`);
    });
}
btnCopiar.addEventListener("click", () => {
  copiarDatos(resultado.textContent.toString());
});

function estaDiccionario(caracter) {
  let respuesta = [false, ""];
  for (const clave in diccionario) {
    if (caracter == clave.toString()) {
      respuesta = [true, diccionario[clave]];
    }
  }
  return respuesta;
}

function funcionEncriptar(texto) {
  let textoEncriptado = "";
  if (validarDatos(texto)) {
    for (const indice in texto) {
      let caracter = texto[indice];
      let buscarDiccionario = estaDiccionario(caracter);
      if (buscarDiccionario[0]) {
        caracter = buscarDiccionario[1];
      }
      textoEncriptado = textoEncriptado + caracter;
    }
  } else {
    alert(
      "Datos no validos :(\n\nSólo carácteres entre a-z, sin carácteres especiales."
    );
  }
  return textoEncriptado;
}

btnEncriptar.addEventListener("click", () => {
  // console.log("Hola dimos click al boton");
  // El atributo de value no aparece a veces en el editor, solo aparece en el editor cuando utilizamos
  // querySelectorAll o utilizamos una vez el atributo value pero se puede utilizar en un solo nodo aunque el editor
  // no te lo sugiera.
  // txtEncriptar.value = "Daniel"
  resultado.textContent = funcionEncriptar(textoEntrada.value);
});

// Desencriptar
function funcionDesencriptar(texto) {
  let textoDesencriptado = "" + texto;
  if (validarDatos(texto)) {
    for (const clave in diccionario) {
      // Creamos un objeto de Expresion Regular, con el valor del diccionario y con la opcion global 'g'
      let patron = new RegExp(diccionario[clave], "g");
      // Utilizamos la función 'replace' para reemplazar ese patron del encriptado y reemplazarlo por la clave
      // (valor original o desencriptado)
      textoDesencriptado = textoDesencriptado.replace(patron, clave.toString());
    }
    return textoDesencriptado;
  } else {
    alert(
      "Datos no validos :(\n\nSólo carácteres entre a-z, sin carácteres especiales."
    );
    return "";
  }
}

btnDesencriptar.addEventListener("click", () => {
  resultado.textContent = funcionDesencriptar(textoEntrada.value);
});

// El siguiente evento oculta si es que hay algun cambio en el parrafo
resultado.addEventListener("DOMSubtreeModified", () => {
  if (resultado.textContent.toString() == "") {
    btnCopiar.setAttribute("style", "display: none;");
    document.querySelector(".no-resultado").setAttribute("style", "display: ;");
    resultado.setAttribute("style", "display: none;");
  } else {
    btnCopiar.setAttribute("style", "display: block;");
    resultado.setAttribute("style", "display: block;");
    resultado.setAttribute("style", "height: 70%;");
    document
      .querySelector(".no-resultado")
      .setAttribute("style", "display: none;");
  }
});

// El siguiente evento oculta el div si se encuentra un valor en el input y si no lo devuelve como estaba
textoEntrada.addEventListener("input", () => {
  if (textoEntrada.value == "") {
    resultado.textContent = "";
  }
});

// var cat = "ni";
// var nombre = "Danielni";
// let patron = new RegExp(cat, "g");
// console.log(nombre.replace(patron, 'hola'));

// Para las resoluciones:
// if (window.matchMedia("(max-width: 768px)").matches) {
//   // La resolución de la pantalla es menor o igual a 768px
//   // Ejecutar la función correspondiente
// } else {
//   // La resolución de la pantalla es mayor a 768px
// }

// window.addEventListener('resize', function() {
//   // La resolución de la pantalla ha cambiado
//   // Ejecutar la función correspondiente
// });

// window.addEventListener('orientationchange', function() {
//   // La orientación de la pantalla ha cambiado
//   // Ejecutar la función correspondiente
// });

// window.addEventListener('resize', function() {
//   // La resolución de la pantalla ha cambiado
//   // Ejecutar la función correspondiente
//   if (resultado.textContent.toString() == '') {
//         btnCopiar.setAttribute('style', 'display: none;');
//         document.querySelector('.no-resultado').setAttribute('style', 'display: ;');
//         resultado.setAttribute('style', 'display: none;');
//     }else{
//         btnCopiar.setAttribute('style', 'display: block;');
//         resultado.setAttribute('style', 'display: block;');
//         resultado.setAttribute('style', 'height: 70%;');
//         document.querySelector('.no-resultado').setAttribute('style', 'display: none;');
//     }
// });

// window.addEventListener('orientationchange', function() {
//   // La orientación de la pantalla ha cambiado
//   // Ejecutar la función correspondiente
//   if (resultado.textContent.toString() == '') {
//         btnCopiar.setAttribute('style', 'display: none;');
//         document.querySelector('.no-resultado').setAttribute('style', 'display: block;');
//         resultado.setAttribute('style', 'display: none;');
//     }else{
//         btnCopiar.setAttribute('style', 'display: block;');
//         resultado.setAttribute('style', 'display: block;');
//         resultado.setAttribute('style', 'height: 70%;');
//         document.querySelector('.no-resultado').setAttribute('style', 'display: none;');
//     }
// });
