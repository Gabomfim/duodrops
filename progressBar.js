
class System{
    constructor(course){
        this.course = course;
    }
}

class Card {
    constructor(word , image, system){
        if(system.course == 'en-pt'){
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

class Lesson{
    constructor(lessonName, exercises){
        this.lessonName = lessonName;
        this.exercises = exercises;
    }
}

class Exercise{//modelar depois
    constructor(type, wordAssociated){
        this.type = type;
        this.wordAssociated = wordAssociated;
    }
}


//pensar em implementar factory
const system = new System('en-pt');//system não deveria ser global e acessível em todo o escopo?
const apple = new Word('Maçã', 'Apple');
const starfruit = new Word('Carambola', 'Starfruit');
const grape = new Word('Uva', 'Grape');
const banana = new Word('Banana', 'Banana');
const appleCard = new Card(apple, 'https://source.unsplash.com/150x150/?apple', system);
const starfruitCard = new Card(starfruit, 'https://source.unsplash.com/150x150/?starfruit', system);
const grapeCard = new Card(grape, 'https://source.unsplash.com/150x150/?grape', system);
const bananaCard = new Card(banana, 'https://source.unsplash.com/150x150/?banana', system);
const newDeck = new Deck([appleCard, starfruitCard, grapeCard, bananaCard]);
const fruitsLesson = new Lesson('fruits', newDeck);
let exerciseIndex = 1;
let barSize = fruitsLesson.exercises.deckCards.length;
let barCounter = barSize;
let button = document.getElementById('complete-lesson');

function updateCardBehaviour(card){
    const cardFront = document.getElementsByClassName('card-front');
    const cardBack = document.getElementsByClassName('card-back');
    const buttonContinue = document.getElementById('complete-lesson');
   
    for(let cardNumbers=0; cardNumbers<card.length; cardNumbers++){
        console.log(card[cardNumbers]);
        card[cardNumbers].addEventListener('click', function(){
            this.classList.toggle('rotated');
            cardBack[cardNumbers].classList.toggle('isHidden');
            cardFront[cardNumbers].classList.toggle('isHidden');
            
            buttonContinue.classList.remove('isHidden');
        });
    }
}

progressBarBehaviour = () => {
    
    if(barCounter > 0){
            
        const progressBarWidth = document.getElementById('progress-bar').offsetWidth;
        let actualProgress = document.getElementById('actual-progress');
        const percentageUnit = ((progressBarWidth/barSize)/progressBarWidth)*100;
        let sizeIncrease = ((actualProgress.offsetWidth/progressBarWidth)*100) + percentageUnit;
        actualProgress.style.width = `${sizeIncrease}%`;
        barCounter--;
        console.log("barCounter " + barCounter);
        if(barCounter === 0){
            console.log('jooj');
            button.classList.remove('isHidden');
            button.innerHTML = "YOU DID IT!";
            button.style.backgroundColor = "#F9D649";
        }
        
    }
};

renderNewExercise = () => {
    console.log(exerciseIndex);
    exerciseContainer = document.getElementById('exercise-container');
    exerciseContainer.innerHTML =
    `<div class="card card-shadow">
        <div class="card-front">
            <img class="card-image" width=150 height=150 />
            <p class="translating-word">${fruitsLesson.exercises.deckCards[exerciseIndex].translatingWord}</p>
        </div>
        <div class="card-back isHidden">
            <p class="translated-word">${fruitsLesson.exercises.deckCards[exerciseIndex].translatedWord}</p>
        </div>
    </div>`;

    const image = document.getElementsByClassName('card-image');
    console.log("img " + fruitsLesson.exercises.deckCards[exerciseIndex].image);

    image[0].src = fruitsLesson.exercises.deckCards[exerciseIndex].image;

    const card = document.getElementsByClassName('card');
    updateCardBehaviour(card);
    exerciseIndex++;

    
    button.classList.add('isHidden');
    
};

Document.onload = function(){
    //Cards and decks
    exerciseContainer = document.getElementById('exercise-container');
    

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
    
    button.addEventListener('click', progressBarBehaviour);//só funciona nessa ordem
    button.addEventListener('click', renderNewExercise);
    
    
    
    const card = document.getElementsByClassName('card');
    updateCardBehaviour(card);

};

//DOM interactions\

//onload



Document.onload();

