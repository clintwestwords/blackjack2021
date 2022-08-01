
class Card{ 
    constructor(value, suit, front, back, isAce ){
        this.value = value;
        this.suit = suit;
        this.front = front;
        this.back = back;
        this.isAce = isAce;
    }
    
}

let cards = []

let suit = ""

let image = "images/"

let faceCards = {
    11 : "jack",
    12 : "queen",
    13 : "king",
    14 : "ace",
}

let populate = (decks) =>{
    
    for(let i = 0; i < decks; i++){
        
        for(let j = 2; j <= 14; j++){
            
            for(let x = 0; x < 4; x++){
                
                let tmp = j
                
                if(j > 10){
                    j = faceCards[j]
                }
                
                switch(x){
                    
                    case 0:
                        
                        suit = 'club'
                        image += j + '_of_clubs.png'
                        break;
                        
                        case 1:
                            suit = 'spade'
                            image += j + '_of_spades.png'
                            break;
                            
                            case 2:
                                suit = 'diamond'
                        image += j + '_of_diamonds.png'
                        break;

                        case 3:
                            suit = 'heart'
                            image += j + '_of_hearts.png'
                            break;
                            
                        }
                        
                        
                        
                        j = tmp
                        
                        
                        if(j <= 10){
                            let card = new Card(j, suit, image, 'images/1_facedowncard.jpg', false)
                            cards.push(card)
                            image = "images/"
                        }
                        else if(j > 10 && j != 14){
                            let card = new Card(10, suit, image, 'images/1_facedowncard.jpg', false)
                            cards.push(card)
                            image = "images/"
                        }
                        else{
                            let card = new Card(11, suit, image, 'images/1_facedowncard.jpg', true)
                            cards.push(card)
                            image = "images/"
                        }
                        
                    }
                    
                }
                
            }
        }
        
        function rng(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min); 
        }
        

let cardPicker = ()=>{

    let selectedCard = cards[rng(0, cards.length -1)]
    
    return selectedCard
}

let removeCard = (card)=>{
    
    const index = cards.indexOf(card)
    
    if (index > -1){
        cards.splice(index, 1)
    }
}

let checkAce = (hand)=>{
    
    for(let i = 0; i < hand.length; i++){
        
        if(hand[i].isAce == true && hand[i].value != 1){
            
            hand[i].value = 1
            
            break;
        }
    }
}



populate(500)

let player = document.querySelector('#player-hand')
let dealer = document.querySelector('#dealer-hand')
let buttons = document.querySelector('.buttons')
let dealerScore = document.querySelector('#dealer-points')
let playerScore = document.querySelector('#player-points')
let splitScore = document.querySelector('#split-points')
let messages = document.querySelector('#messages')
let bank = document.querySelector('#money')
let betBox = document.querySelector('#current-bet')
let table = document.querySelector('.table')
let yourHand = document.querySelector('#yourHand')


let dealer1 = cardPicker()
let dealer2 = cardPicker()
let player1 = cardPicker()
let player2 = cardPicker()
let score = 0


let playersCards = []
let dealersCards = []
let splitCards = []

let bet = 500
let money = 500


bank.textContent = `Money: ${money}`
betBox.textContent = `Bet: ${bet}`


buttons.innerHTML = `<button id=\"increase-button\" type=\"button\">Increase bet</button>\
<button id=\"decrease-button\" type=\"button\">Decrease Bet</button> 
<button id=\"place bet-button\" type=\"button\">Place Bet</button>`




buttons.addEventListener('click', e=>{
    
    
    if(e.target.id == "increase-button"){
        
        bet += 5
    }
    if(e.target.id == "decrease-button"){
        
        bet -= 5
    }
    if(e.target.id == "place bet-button"){
        
        buttons.innerHTML = `
        <button id="hit-button" type="button">Hit</button>
        <button id="stand-button" type="button">Stand</button>
        <button id="double-down" type="button">Double-Down</button> `
        
        
        dealersCards.push(dealer1)
        dealersCards.push(dealer2)
        dealer.innerHTML += `<img src="${dealer1.back}">`
        dealer.innerHTML += `<img src="${dealer2.front}">`
        
        playersCards.push(player1)
        playersCards.push(player2)
        playerScore.textContent = player1.value + player2.value 
        player.innerHTML += `<img src="${player1.front}">`
        player.innerHTML += `<img src="${player2.front}">`
        
        if(parseInt(playerScore.textContent) > 21){
            
            checkAce(playersCards)
            playerScore.textContent = 0
            
            for(i = 0; i < playersCards.length; i++ ){
                
                score = parseInt(playerScore.textContent)
                playerScore.textContent = score + playersCards[i].value
            }
        }
        
        if(playersCards[0].value == playersCards[1].value){
            
            buttons.innerHTML += `<button id="split-button" type="button">Split</button>`

        }
    }
    
        bank.textContent = `Money: ${money}`
        betBox.textContent = `Bet: ${bet}`
        

    if(e.target.id == "split-button"){
        
        
  
    }

    if(e.target.id == "reset-button"){
        
        playersCards = []
        dealersCards = []
        score = 0
        playerScore.textContent = ""
        dealerScore.textContent = ""
        player.innerHTML = ""
        dealer.innerHTML = ""
        messages.textContent=""
        populate(1)
        dealer1 = cardPicker()
        dealer2 = cardPicker()
        player1 = cardPicker()
        player2 = cardPicker()  
        
        buttons.innerHTML = `<button id=\"increase-button\"type=\"button\">Increase bet</button>
        <button id=\"decrease-button\" type=\"button\">Decrease Bet</button> 
        <button id=\"place bet-button\" type=\"button\">Place Bet</button>`
    }
    


    if(e.target.id == "hit-button"){
        
        let selectedCard = cardPicker()
        
        playersCards.push(selectedCard)
        score = parseInt(playerScore.textContent)
        playerScore.textContent = score + selectedCard.value
        
        if(parseInt(playerScore.textContent) > 21){
            
            checkAce(playersCards)
            playerScore.textContent = 0
            
            for(let i = 0; i < playersCards.length; i++ ){

                score = parseInt(playerScore.textContent)
                playerScore.textContent = score + playersCards[i].value
            }
        }
        
        player.innerHTML += `<img src="${selectedCard.front}">`
        
        removeCard(selectedCard)
        

    }
    


    if(e.target.id == "double-down"){

        let selectedCard = cardPicker()
    
        playersCards.push(selectedCard)
        score = parseInt(playerScore.textContent)
        playerScore.textContent = score + selectedCard.value

        if(parseInt(playerScore.textContent) > 21){

            checkAce(playersCards)
            playerScore.textContent = 0

            for(let i = 0; i < playersCards.length; i++ ){

                score = parseInt(playerScore.textContent)
                playerScore.textContent = score + playersCards[i].value
            }
        }

        player.innerHTML += `<img src="${selectedCard.front}">`
        
        removeCard(selectedCard)

        document.getElementById('hit-button').disabled = true;
        document.getElementById('double-down').disabled = true;

        bet *= 2
    }




    
    if(e.target.id == "stand-button" || parseInt(playerScore.textContent) >= 21){
        
        dealer.innerHTML = ""
        dealer.innerHTML += `<img src="${dealer1.front}">`
        dealer.innerHTML += `<img src="${dealer2.front}">`
        
        let dealerPoints = 0
        
        dealerPoints = dealer1.value + dealer2.value
        
        if(dealerPoints > 21){
            
            dealerPoints = 0
            
            checkAce(dealersCards)
            
            for(let i = 0; i < dealersCards.length; i++){
                
                dealerPoints += dealersCards[i].value
            }
        }
        
        while(true){
            
            
            if(dealerPoints < 17){
                
                let newCard = cardPicker()
                
                dealersCards.push(newCard)
                
                dealerPoints += newCard.value
                
                dealer.innerHTML += `<img src="${newCard.front}">`
                
                if(dealerPoints > 21){
                    
                    dealerPoints = 0
                    
                    checkAce(dealersCards)
                    
                    for(let i = 0; i < dealersCards.length; i++){
                        
                        dealerPoints += dealersCards[i].value
                        console.log(dealerPoints);
                    }
                }
                
            }
            else{
                
                dealerScore.textContent = dealerPoints
                
                break;
            }
            
        }
        if(dealerPoints <= 21 && parseInt(playerScore.textContent) > 21){
            
            messages.textContent = 'The Dealer Wins!'
            money -= bet
        }
        else if(dealerPoints > 21 && parseInt(playerScore.textContent) <= 21){
            
            messages.textContent = 'You Win!'
            money += bet
        }
        else if(dealerPoints > parseInt(playerScore.textContent)){
            
            messages.textContent = 'The Dealer Wins!'
            money -= bet
        }
        else if(dealerPoints < parseInt(playerScore.textContent)){
            
            messages.textContent = 'You Win!'
            money += bet
        }
        else if(dealerPoints == parseInt(playerScore.textContent)){
            
            messages.textContent = 'It\'s a draw!'
        }
        
        bank.textContent = `Money: ${money}`
        betBox.textContent = `Bet: ${bet}`
        
        buttons.innerHTML = `<button id="reset-button" type="button">Next Hand</button>`
    }
    
})



    // Legacy deal button //


    // if(e.target.id == "deal-button"){
        
    //     dealersCards.push(dealer1)
    //     dealersCards.push(dealer2)
    //     dealer.innerHTML += `<img src="${dealer1.back}">`
    //     dealer.innerHTML += `<img src="${dealer2.front}">`
        
    //     playersCards.push(player1)
    //     playersCards.push(player2)
    //     playerScore.textContent = player1.value + player2.value 
    //     player.innerHTML += `<img src="${player1.front}">`
    //     player.innerHTML += `<img src="${player2.front}">`

    //     if(parseInt(playerScore.textContent) > 21){

    //         checkAce(playersCards)
    //         playerScore.textContent = 0

    //         for(i = 0; i < playersCards.length; i++ ){

    //             score = parseInt(playerScore.textContent)
    //             playerScore.textContent = score + playersCards[i].value
    //         }
    //     }
        
    //     document.getElementById('deal-button').disabled = true;
    //     document.getElementById('hit-button').disabled = false;
    //     document.getElementById('stand-button').disabled = false;
    //     document.getElementById('double-down').disabled = false;
    // }


