let cards = document.querySelectorAll('.card')
let error = document.querySelector('.error')
// let errorText = document.querySelector('.error-text')
let reset = document.getElementById('reset')
let score = document.querySelector('.score')

let hasFlippedCard = false
let lockBoard = false
let front, back
let point = 1
// let notMatch = 1

function flipCard(){
    if(lockBoard) return;

    if(this === front) return;

    this.classList.toggle('flip')

    if(!hasFlippedCard){
        hasFlippedCard = true
        front = this

        return;
    }

        hasFlippedCard = false
        back = this

        validateResult()
}


function validateResult(){
    let match = front.dataset.framework === back.dataset.framework

    match ? disableCards() : unFlipCards()

    // if (notMatch > 2){
    //     errorText.innerHTML = 'errors'
    // }else{
    //     errorText.innerHTML = 'error'
    // }
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false]
    [front, back] = [null, null] 
}

function disableCards(){
    front.removeEventListener('click', flipCard)
    back.removeEventListener('click', flipCard)
    score.innerHTML = point++;
    resetBoard()
}

function unFlipCards(){
    lockBoard = true 
    // error.innerHTML = notMatch++;
        setTimeout(() =>{

            front.classList.remove('flip')
            back.classList.remove('flip')

            lockBoard = false
            resetBoard()
        }, 1500)
}

(function shuffle(){
    cards.forEach( card =>{
        let randomResult = Math.floor(Math.random() * 12)
        card.style.order = randomResult
    })
})()

reset.addEventListener('click', () =>{
    location.reload()
})

cards.forEach(card => card.addEventListener('click', flipCard))