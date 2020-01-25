//data structure, fake backend

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
const pear = new Word('Pêra', 'Pear');
const appleCard = new Card(apple, 'https://source.unsplash.com/150x150/?apple', 'en-pt');
const pearCard = new Card(pear, 'https://source.unsplash.com/150x150/?pear', 'en-pt')
const newDeck = new Deck([appleCard, pearCard]);

console.log(apple);
console.log(pear);
console.log(newDeck);




//DOM interactions\

//onload

const card = document.getElementsByClassName('card');
//console.log({card});

Document.onload = function(){
    console.log('startup');
    const translated = document.getElementsByClassName('translated-word');//ptWord
    const translating = document.getElementsByClassName('translating-word');//enWord
    const image = document.getElementsByClassName('card-image');//enWord
    console.log(image);
    for(let i=0; i< translated.length; i++){
        translating[i].innerHTML = newDeck.deckCards[i].translatingWord;
        translated[i].innerHTML = newDeck.deckCards[i].translatedWord;
        image[i].src = newDeck.deckCards[i].image;
    }
    
};

Document.onload();


//card interactions behavior

function updateCardBehaviour(card){
    const cardFront = document.getElementsByClassName('card-front');
    const cardBack = document.getElementsByClassName('card-back');
   
    for(let cardNumbers=0; cardNumbers<card.length; cardNumbers++){
        console.log(card[cardNumbers]);
        card[cardNumbers].addEventListener('click', function(){
            this.classList.toggle('rotated');
            cardFront[cardNumbers].classList.toggle('isHidden');//nao é adaptado com relação ao pai, é uma gambiarra porque coincide os indices
            cardBack[cardNumbers].classList.toggle('isHidden');
        });
    }
}

updateCardBehaviour(card)
/*
solution for one card
const card = document.getElementById('card');
console.log(card);
card.addEventListener('click', function(){
    console.log('teste');
    this.classList.toggle('rotated');
    cardFront = document.getElementById('card-front');
    cardFront.classList.toggle('isHidden');
    cardBack = document.getElementById('card-back');
    cardBack.classList.toggle('isHidden');
    
    
    
});*/

//addCard

document.getElementById('addCard').addEventListener('click', function(){
    const frontInput = document.getElementById('front-input').value;
    const backInput = document.getElementById('back-input').value;
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML += `<div class="card card-1">
    <div class="card-front">
        <img class="card-image" width=150 height=150 src="https://source.unsplash.com/150x150/?${frontInput}" />
        <p class="translating-word">${frontInput}</p>
    </div>
        <div class="card-back isHidden">
            <p class="translated-word">${backInput}</p>
        </div>
    </div>`;
    updateCardBehaviour(card);//não é performatico pois atualiza a lista inteira
});
