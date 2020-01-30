
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
const appleCard = new Card(apple, 'https://source.unsplash.com/150x150/?apple', system);
const starfruitCard = new Card(starfruit, 'https://source.unsplash.com/150x150/?starfruit', system);
const grapeCard = new Card(grape, 'https://source.unsplash.com/150x150/?grape', system);
const newDeck = new Deck([appleCard, starfruitCard, grapeCard]);
const fruitsLesson = new Lesson('fruits', newDeck);

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

progressBarBehaviour = () => {
    
    let barSize = fruitsLesson.exercises.deckCards.length;
    let barCounter = barSize;
    if(barCounter > 0){
            
        const progressBarWidth = document.getElementById('progress-bar').offsetWidth;
        let actualProgress = document.getElementById('actual-progress');
        const percentageUnit = ((progressBarWidth/barSize)/progressBarWidth)*100;
        let sizeIncrease = ((actualProgress.offsetWidth/progressBarWidth)*100) + percentageUnit;
        actualProgress.style.width = `${sizeIncrease}%`;
        barCounter--;
        if(barCounter === 0){
            button.innerHTML = "YOU DID IT!";
            button.style.backgroundColor = "#F9D649";
        }
        
    }
};

renderNewExercise = (lesson, i) => {
    exerciseContainer = document.getElementById('exercise-container');
    console.log(fruitsLesson.exercises.deckCards[i].translatingWord);
    exerciseContainer.innerHTML =
    `<div class="card card-shadow">
        <div class="card-front">
            <img class="card-image" width=150 height=150 />
            <p class="translating-word">${fruitsLesson.exercises.deckCards[i].translatingWord}</p>
        </div>
        <div class="card-back isHidden">
            <p class="translated-word">${fruitsLesson.exercises.deckCards[i].translatedWord}</p>
        </div>
    </div>`;

    const image = document.getElementsByClassName('card-image');
    image.src = fruitsLesson.exercises.deckCards[i].image;

    const card = document.getElementsByClassName('card');
    updateCardBehaviour(card);
    return i + 1;
    
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
    button.addEventListener('click', progressBarBehaviour);
    button.addEventListener('click', renderNewExercise);

    let exerciseIndex = 0;
    while(exerciseIndex < fruitsLesson.exercises.deckCards.length) {
        console.log('jooj');
        exerciseIndex = renderNewExercise(fruitsLesson, exerciseIndex);
    }

}

//DOM interactions\

//onload



Document.onload();

