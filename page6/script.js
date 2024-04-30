const els = {
   score: null,
   answer: null,
   choices: null,
};

const words = [
   'ENTOURLOUPETTE',
   'SAPERLIPOPETTE',
   'ADMIRATIVEMENT', 
   'PSYCHOPATHIQUE',
   'HYDRODYNAMIQUE', 
];

let choices = [];
let word = '';
let wordMapping = [];
let choicesMapping = [];
let scoreCount = 0;
let maxScore = 8;


const init = () => {

   els.score = document.querySelector('#score');
   els.answer = document.querySelector('#answer');
   els.choices = document.querySelector('#choices');

   word = pickWord();
   wordMapping = getWordMapping(word);
   choices = generateChoices();
   choicesMapping = getChoicesMapping(choices);
  
   displayWord(wordMapping);
   displayChoices(choicesMapping);
  
   els.choices.addEventListener('click', ({
      target
   }) => {
      if (target.matches('li')) {
         checkLetter(target.innerHTML);
      }
   });

   document.addEventListener('keydown', ({keyCode}) => {
      const letter = String.fromCharCode(keyCode);
      if (keyCode >= 65 && keyCode <= 90) {
         checkLetter(letter);
      }
   });
};

const checkLetter = (letter) => {
   let isLetterInWord = false;
   let isAllLettersFound = true;
   wordMapping.forEach((letterMapping) => {
      if (letterMapping.letter === letter) {
         letterMapping.isVisible = true;
         isLetterInWord = true;
      }
      if (!letterMapping.isVisible) {
         isAllLettersFound = false;
      }
   });

   choicesMapping.forEach((letterMapping) => {
      if (letterMapping.letter === letter) {
         letterMapping.isChosen = true;
      }
   });

   displayChoices(choicesMapping);
   if (isLetterInWord === true) {
      displayWord(wordMapping);
   } else {
      scoreCount++;
      displayScore();
   }

   if (scoreCount === maxScore) {
      endGame();
      alert('Recharger la page pour rejouer');
   }
   if (isAllLettersFound) {
      winGame();

   }
};

const endGame = () => {
   wordMapping.forEach(w => w.isVisible = true);
   displayWord(wordMapping);
document.querySelector('body').style.backgroundColor = 'red';
els.choices.innerHTML = `<h1>You dead !</h1>`;
};

const winGame = () => {

els.choices.innerHTML = `<h1>You live ! <h4 id='ok'> Cliquer ici </h4>`;
let confetti = new Confetti('ok');
confetti.setCount(150);
confetti.setSize(3);
confetti.setPower(25);
confetti.setFade(false);
confetti.destroyTarget(true);

var conf = document.getElementById('ok')
conf.addEventListener('click', function () {
   alert('Recharger la page pour rejouer');
})

};

window.addEventListener('load', () => {
   init();
});
const getRandomInt = (min, max) => {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}