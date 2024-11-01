'use strict';
let scores = document.querySelectorAll('.score')
const currents = document.querySelectorAll('.current-score')
const diceEl = document.querySelector('.dice')

const btnNewGame = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

let activePlayer, currentScore, playing

const startNewGame = function() {
    playing = true
    // player0El.classList.toggle('player--winner')
    // player1El.classList.toggle('player--winner')
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    for( let i=0; i < scores.length; i++){
        scores[i].textContent = 0
    }
    currents.forEach(element => {
        element.textContent = 0
    });
    diceEl.classList.add('hidden')
    activePlayer = 0
    currentScore = 0
    if( player1El.classList.contains('player--active') ){ // activePlayer Farbe auf spieler 0
        player1El.classList.remove('player--active')
        player0El.classList.add('player--active')
    }
}

startNewGame()

const switchPlayer = function(){
    if(playing){ 
        document.getElementById(`current--${activePlayer}`).textContent = 0
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        activePlayer = activePlayer === 0 ? 1: 0
        currentScore = 0;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
    }
   
}

const rollDice = function(){
    if(playing){
        const diceValue = Math.trunc(Math.random()*6)+1;
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${diceValue}.png`
        if(diceValue !== 1)
            if( player0El.classList.contains('player--active') ){ // kann man noch besser mit template literal
              currentScore = Number(current0El.textContent) + diceValue 
              current0El.textContent = String(currentScore)
            }
            else {currentScore = Number(current1El.textContent) + diceValue
                current1El.textContent = String(currentScore)}
        else switchPlayer()
    }
}

const holdScore = function(){
    if(playing){
        scores[activePlayer].textContent = Number(scores[activePlayer].textContent) + Number(currentScore)
        if( scores[activePlayer].textContent >= 100){
            playing = false
            diceEl.classList.add('hidden')
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        }
        switchPlayer()
    }
}

btnNewGame.addEventListener('click', startNewGame)
btnRoll.addEventListener('click', rollDice)
btnHold.addEventListener('click', holdScore)