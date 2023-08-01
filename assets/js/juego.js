/**
 * 2C = Two of clubs (Tréboles)
 * 2D = Two of Daimonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');

const divCartasJugador = document.querySelector('#jugador-cartas');

const puntosHTML = document.querySelectorAll('small');

//esta función crea un nuevo deck
const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ) {
        for ( let tipo of tipos ) {
            deck.push(i + tipo);
        }          
    }

    for( let tipo of tipos ) {
        for( let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    // console.log(deck);
    deck = _.shuffle( deck);
    console.log(deck);
    return deck;


};

crearDeck();

//Esta función me permite tomar una carta

const PedirCarta = () => {
    
    if ( deck.length === 0 ){
        throw 'No hay carta en el deck';
    }

    const carta = deck.pop();
    // console.log(deck);
    // console.log(carta);
    return carta;
}
// for( let i = 0; i <= 60; i++ ){
//     PedirCarta();
// }
// PedirCarta();

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1);

    return ( isNaN ( valor ) ) ?
             ( valor === 'A' ) ? 11 : 10
             : valor * 1;

    // console.log({valor});
    // let puntos = 0;
    // // 2 = 2 10 = 10, 3 = 3
    // if (isNaN( valor )) {
    //     puntos = ( valor === 'A' ) ? 11 : 10;
    // } else {
    //     puntos = valor * 1;
    // }
    // console.log(puntos);
}

// const valor = valorCarta( PedirCarta());
// console.log({valor})

//Eventos
// función como argumento con callbak

btnPedir.addEventListener('click', () => {
    const carta = PedirCarta();
    // console.log(carta);

    puntosJugador = puntosJugador + valorCarta( carta );
   // console.log( puntosJugador )

    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="assets/cartas/2D.png"></img>
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
    } else if ( puntosJugador === 21 ){
        console.warn('21, Ganaste');
        btnPedir.disabled = true;

    }
});