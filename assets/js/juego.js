const miModulo = (() => {
  // patron modulo
  "use strict"; // hace que no haya falla de codigo
  // const personajes = ["Spiderman", "IronMan", "Capitán américa"];
  // console.log(personajes);
  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  // let puntosJugador = 0,
  //   puntosComputadora = 0;
  let puntosJugadores = [];
  // Referencias del HTML
  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevo = document.querySelector("#btnNuevo");
  const puntosHTML = document.querySelectorAll("small"),
    divCartasJugadores = document.querySelectorAll(".divCartas");

  // Esta funcion inicia el juego
  const inicializarJuego = (numJugadores = 2) => {
    // le ingreso el numero de jugadores 2 minimo 1 jugador y la computadora
    deck = crearDeck();
    // el ultimo jugador siempre será la computadora
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }
    // por cada jugador iniio en 0 los puntos del html
    puntosHTML.forEach((elem) => (elem.innerText = 0));
    divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));
    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  //Crea y baraja un nuevo deck
  const crearDeck = () => {
    deck = [];
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
    // _.shuffle(deck); shuffle revuelve el array
    return _.shuffle(deck);
  };

  // Entrega una carta al jugador
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No se pueden pedir más cartas";
    }
    // array.pop() retorna el ultimo objeto del arreglo y lo entrega
    return deck.pop();
  };

  // pedirCarta();

  //Entrega el valor de la carta
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1; //todo el codigo resumido
    //isNaN(objeto) devuelve el bool de si el objeto no es un numero (true) si es numero(false)
    // significa not a number ***
    // multiplicar * 1 un str lo vuelve numero
  };

  // Turno 0 = primer jugador y el ultimo computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    // Igualo en el html con el elemento referenciado
    // primera ocurrencia '[0]' los puntos sumados
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  const crearCarta = (carta, turno) => {
    // constante para crear cartas
    const imgCarta = document.createElement("img"); // creo un <img/>
    // cambia el src de la carta
    imgCarta.src = `assets/cartas/${carta}.png`;
    // le añado la clase para el css que cree anteriormente
    imgCarta.classList.add("carta");
    // con .append(objeto) agrego la carta
    divCartasJugadores[turno].append(imgCarta);
  };

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores;
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

  // Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);
    } while (puntosComputadora <= puntosMinimos && puntosMinimos <= 21);
    determinarGanador();
  };

  // Eventos
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  // btnNuevo.addEventListener("click", () => {
  //   inicializarJuego();
  // });

  // puedo regresar algo en el patrón, en este caso un objeto
  // solo lo que retorno lo hago publico y visible por fuera
  return {
    nuevoJuego: inicializarJuego
  };

})(); //Envuelvo todo en el patron modulo

() => {
  //Patron modulo
};

(() => {
  // patrón modulo que se ejecuta al instante
})();

(function () {
  // Misma idea, funcion anonima auto invocada
})();
