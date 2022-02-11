let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0,
  puntosComputadora = 0;
// Referencias del HTML
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");
const puntosHTML = document.querySelectorAll("small");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");

//Crea y baraja un nuevo deck
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  //   console.log(deck)
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

crearDeck();

// Entrega una carta al jugador
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No se pueden pedir más cartas";
  }
  const carta = deck.pop(); // array.pop() retorna el ultimo objeto del arreglo y lo entrega
  return carta;
};

// pedirCarta();

//Entrega el valor de la carta
const valorCarta = (carta) => {
  let puntos = 0;
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1; //todo el codigo resumido
  //   if (isNaN(valor)) {
  //isNaN(objeto) devuelve el bool de si el objeto no es un numero (true) si es numero(false)
  //     puntos = valor === "A" ? 11 : 10;
  //   } else {
  //     console.log("numero");
  //     puntos = valor * 1;
  // multiplicar * 1 un str lo vuelve numero
  //   }
  //   return puntos;
};

// Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;
    const imgCarta = document.createElement("img"); // creo un <img/>
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasComputadora.append(imgCarta);
    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora <= puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Computadora gana");
    } else if (puntosMinimos > 21) {
      alert("Computadora gana");
    } else if (puntosComputadora > 21) {
      alert("Ganaste!!!");
    } else {
      alert("Computadora gana");
    }
  }, 350);
};

// Eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  // Igualo en el html con el elemento referenciado
  // primera ocurrencia '[0]' los puntos sumados
  puntosHTML[0].innerText = puntosJugador;

  //vamos a crear una constante para crear cartas
  const imgCarta = document.createElement("img"); // creo un <img/>
  // cambia el src de la carta
  imgCarta.src = `assets/cartas/${carta}.png`;
  // le añado la clase para el css que cree anteriormente
  imgCarta.classList.add("carta");
  // con .append(objeto) agrego la carta
  divCartasJugador.append(imgCarta);
  if (puntosJugador > 21) {
    console.warn("Lo siento mucho, perdiste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21 genial!!!");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener("click", () => {
  deck = [];
  crearDeck();
  puntosJugador = 0;
  puntosComputadora = 0;
  puntosHTML[0].innerText = 0;
  puntosHTML[1].innerText = 0;
  divCartasJugador.innerHTML = "";
  divCartasComputadora.innerHTML = "";
  btnPedir.disabled = false;
  btnDetener.disabled = false;
});
