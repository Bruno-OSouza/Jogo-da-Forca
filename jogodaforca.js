var fruits = [
"abacaxi", "abacate", "amora", "ameixa", "acerola",
 "banana", "bacuri", "buriti",
 "caju", "carambola", "cacau", "cereja", "caja", "coco", "caqui",
 "damasco", "duriao",
 "embauba",
 "figo","framboesa",
 "goiaba", "graviola", "groselha", "guarana",
 "heisteria", "himbeere",
 "inga",
 "jambo", "jabuticaba", "jaca", "jujuba",
 "kiwi",
 "laranja", "limao", "lichia",
 "mamao", "melancia", "marmelo", "maca", "manga", "mangaba", "maracuja", 
 "morango", "melancia", "melao", "murici",
 "nectarina", "nespera",
 "pera", "pessego", "physalis", "pitanga", "pitaya", "pupunha", "pistache", "pinhao",
 "quina",
 "romã",
 "seriguela", "sapoti", "sapucaia",
 "tamara", "tamarindo", "tangerina", "tomate", "toranja",
 "umbu", "uva",
 "veludo",
 "wampee",
 "xixa",
 "yamamomo",
 "zimbro"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
// let wordStatus = null;

function randomWord(){
  answer = fruits[Math.floor(Math.random() * fruits.length)];
}

function generateButtons(){
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button class="btn btn-lg btn-primary m-2"
      id='`+letter+`'
      onclick="handleGuess('`+letter+`')"
      >
      `+letter+`
      </button>
   `).join('');
   document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter){
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter): null;

  document.getElementById(chosenLetter).setAttribute('disabled', true);
  
  if (answer.indexOf(chosenLetter) >= 0){
    guessedWord();
    checkIfGameWon();
  }else if(answer.indexOf(chosenLetter) === -1){
   mistakes++;
   updateMistakes();
   checkIfGameLost();
   updateHangmanPicture();
  }
}

function updateHangmanPicture(){
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.png';
}

function checkIfGameWon(){
  if (wordStatus === answer){
    document.getElementById('keyboard').innerHTML = 'Você Ganhou!!!'
  }
}

function checkIfGameLost(){
  if (mistakes === maxWrong){
    document.getElementById('wordSpotlight').innerHTML = 'A palavra é: ' + answer;
    document.getElementById('keyboard').innerHTML = 'Você Perdeu!!!'
  }
}

function guessedWord(){
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes(){
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset(){
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.png';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();