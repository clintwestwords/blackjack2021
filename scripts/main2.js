class Decks{

    constructor(deckAmount){
        this.deckAmomunt = deckAmount
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
            
        }  

class Card{ 
    constructor(value, suit, front, back, isAce ){
        this.value = value;
        this.suit = suit;
        this.front = front;
        this.back = back;
        this.isAce = isAce;
    }
    
}
