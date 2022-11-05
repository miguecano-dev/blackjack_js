const miModulo = (() => {
  'use strict'

  let deck = []
  const tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K']
  let puntosJugadores = []

  // REFERENCIAS HTML
  const btnPedir = document.querySelector('#pedir_carta'),
    btnDetener = document.querySelector('#detener'),
    btnNuevoJuego = document.querySelector('#nuevo_juego')

  const divCartasJugadores = document.querySelectorAll('.divCartas'),
    puntosHTML = document.querySelectorAll('small')

  // Funciones
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck()
    puntosJugadores = []
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0)
    }
    puntosHTML.forEach((elem) => {
      elem.innerText = 0
    })
    divCartasJugadores.forEach((elem) => {
      elem.innerHTML = ''
    })

    btnPedir.disabled = false
    btnDetener.disabled = false
  }

  const crearDeck = () => {
    deck = []
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo)
      }
    }
    for (let j = 0; j < especiales.length; j++) {
      for (let tipo of tipos) {
        deck.push(especiales[j] + tipo)
      }
    }
    return _.shuffle(deck)
  }

  // Pedir Carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw 'No hay cartas en el deck'
    }
    return deck.pop()
  }
  // Obtener valor Carta
  const valorCarta = (carta) => {
    // extraer el numero de la carta eliminando el ultimo caracter
    const valor = carta.substring(0, carta.length - 1)
    return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1
  }

  // turno 0 primer jugador, el último es la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta)
    puntosHTML[0].innerText = puntosJugadores[turno]
    return puntosJugadores[turno]
  }

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divCartasJugadores[turno].append(imgCarta)
  }

  // TURNO DE LA COMPU
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0
    do {
      const carta = pedirCarta()
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
      crearCarta(carta, puntosJugadores.length - 1)
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21)
    determinarGanador()
  }

  const determinarGanador = () => {
    const [puntosComputadora, puntosMinimos] = puntosJugadores
    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert('Nadie gana')
      } else if (puntosMinimos > 21) {
        alert('computadora gana')
      } else if (puntosComputadora > 21) {
        alert('jugador gana')
      } else {
        alert('computadora gana')
      }
    }, 100)
  }

  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta()
    const puntosJugador = acumularPuntos(carta, 0)
    crearCarta(carta, 0)

    if (puntosJugador > 21) {
      btnPedir.disabled = true
      btnDetener.disabled = true
      turnoComputadora(puntosJugador)
    } else if (puntosJugador === 21) {
      btnPedir.disabled = true
      btnDetener.disabled = true
      turnoComputadora(puntosJugador)
    }
  })

  btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora(puntosJugadores[0])
  })

  btnNuevoJuego.addEventListener('click', () => {
    inicializarJuego()
  })

  return {
    nuevoJuego: inicializarJuego
  }
})()
