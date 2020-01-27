
class Card {
    constructor(word , image, mode){
        if(mode == 'en-pt'){
            this.translatedWord = word.portugueseWord;//pt
            this.translatingWord = word.englishWord;//ingles
        }
        this.image = image;
    }
}

class Deck{
    constructor(deckCards){
        this.deckCards = deckCards;
    }
}

class Word{
    constructor(ptWord, enWord){
        this.portugueseWord = ptWord;
        this.englishWord = enWord;
    }
};

const apple = new Word('Maçã', 'Apple');
const appleCard = new Card(apple, 'https://source.unsplash.com/150x150/?apple', 'en-pt');
const newDeck = new Deck([appleCard]);


Document.onload = function(){
    //Cards and decks
    const translated = document.getElementsByClassName('translated-word');//ptWord
    const translating = document.getElementsByClassName('translating-word');//enWord
    const image = document.getElementsByClassName('card-image');//enWord
    console.log(image);
    for(let i=0; i< translated.length; i++){
        translating[i].innerHTML = newDeck.deckCards[i].translatingWord;
        translated[i].innerHTML = newDeck.deckCards[i].translatedWord;
        image[i].src = newDeck.deckCards[i].image;
    }

    //progressBar
    let button = document.getElementById('complete-lesson');
    let numberOfLessons = 5;
    let barCounter = numberOfLessons;
    button.addEventListener('click', function(){
        if(barCounter > 0){
            const progressBarWidth = document.getElementById('progress-bar').offsetWidth;
            let actualProgress = document.getElementById('actual-progress');
            const percentageUnit = ((progressBarWidth/numberOfLessons)/progressBarWidth)*100;
            let sizeIncrease = ((actualProgress.offsetWidth/progressBarWidth)*100) + percentageUnit;
            actualProgress.style.width = `${sizeIncrease}%`;
            barCounter--;
            if(barCounter === 0){
                button.innerHTML = "YOU DID IT!";
                button.style.backgroundColor = "#F9D649";
            }
            
        }
    
    });
}

//DOM interactions\

//onload

const card = document.getElementsByClassName('card');

function updateCardBehaviour(card){
    const cardFront = document.getElementsByClassName('card-front');
    const cardBack = document.getElementsByClassName('card-back');
    const buttonContinue = document.getElementById('complete-lesson');
   
    for(let cardNumbers=0; cardNumbers<card.length; cardNumbers++){
        console.log(card[cardNumbers]);
        card[cardNumbers].addEventListener('click', function(){
            this.classList.toggle('rotated');
            cardFront[cardNumbers].classList.toggle('isHidden');//nao é adaptado com relação ao pai, é uma gambiarra porque coincide os indices
            cardBack[cardNumbers].classList.toggle('isHidden');
            buttonContinue.classList.remove('isHidden');
        });
    }
}

updateCardBehaviour(card);

Document.onload();

