;(() => {
  'use strict'

  let deck = []
  const tipos = ['C', 'D', 'H', 'S']
  const especiales = ['A', 'J', 'Q', 'K']
  let puntosJugador = 0,
    puntosComputadora = 0

  // REFERENCIAS HTML
  const btnPedir = document.querySelector('#pedir_carta')
  const btnDetener = document.querySelector('#detener')
  const btnNuevoJuego = document.querySelector('#nuevo_juego')
  const puntosHTML = document.querySelectorAll('small')
  const divCartaJugador = document.querySelector('#jugador-cartas')
  const divCartaComputador = document.querySelector('#computadora-cartas')

  const crearDeck = () => {
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
    deck = _.shuffle(deck)
    return deck
  }
  crearDeck()
  // Pedir Carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw 'No hay cartas en el deck'
    }
    const carta = deck.pop()
    return carta
  }
  // Obtener valor Carta
  const valorCarta = (carta) => {
    // extraer el numero de la carta eliminando el ultimo caracter
    const valor = carta.substring(0, carta.length - 1)
    return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1
  }

  // TURNO DE LA COMPU
  const turnoComputadora = (puntosMinimos) => {
    do {
      const carta = pedirCarta()
      puntosComputadora = puntosComputadora + valorCarta(carta)
      puntosHTML[1].innerText = puntosComputadora

      const imgCarta = document.createElement('img')
      imgCarta.src = `assets/cartas/${carta}.png`
      imgCarta.classList.add('carta')
      divCartaComputador.append(imgCarta)

      if (puntosMinimos > 21) {
        break
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21)

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
  // const valor = valorCarta(pedirCarta())

  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta()
    puntosJugador = puntosJugador + valorCarta(carta)
    puntosHTML[0].innerText = puntosJugador

    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divCartaJugador.append(imgCarta)

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
    turnoComputadora(puntosJugador)
  })

  btnNuevoJuego.addEventListener('click', () => {
    console.clear()
    deck = []
    deck = crearDeck()
    puntosJugador = 0
    puntosComputadora = 0

    puntosHTML[0].innerText = 0
    puntosHTML[1].innerText = 0

    divCartaComputador.innerHTML = ''
    divCartaJugador.innerHTML = ''
    btnPedir.disabled = false
    btnDetener.disabled = false
  })
})()
