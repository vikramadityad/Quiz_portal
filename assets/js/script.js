// Quiz Questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "Madrid", "Rome", "Berlin"],
    answer: 0
  },
  {
    question: "Which programming language is used for web development?",
    choices: ["Java", "Python", "JavaScript", "C++"],
    answer: 2
  },
  {
    question: "What is the capital of India?",
    choices: ["Delhi", "Madrid", "Rome", "Berlin"],
    answer: 0
  },

  {
    question: "What is the largest planet in our solar system?",
    choices: ["Mars", "Earth", "Jupiter", "Saturn"],
    answer: 2
  },
  {
    question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
    choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: 1
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    choices: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    answer: 1
  },
  {
    question: "What is the chemical symbol for gold?",
    choices: ["Go", "Au", "Ag", "Ge"],
    answer: 1
  },
  {
    question: "What is the tallest mountain in the world?",
    choices: ["Mount Kilimanjaro", "Mount Fuji", "Mount Everest", "Mount McKinley"],
    answer: 2
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    choices: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: 0
  },
  {
    question: "In which year did Christopher Columbus reach the Americas?",
    choices: ["1492", "1501", "1510", "1525"],
    answer: 0
  },
  {
    question: "What is the chemical symbol for water?",
    choices: ["Wa", "H2O", "Hy", "O2H"],
    answer: 1
  }
  
];

// Variables
let currentQuestionIndex = 0;
let time = 30;
let score = 0;
let timerInterval;

// Elements
const startContainer = document.getElementById("start-container");
const startButton = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const timerElement = document.getElementById("timer");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const resultContainer = document.getElementById("result-container");
const resultElement = document.getElementById("result");
const gameoverContainer = document.getElementById("gameover-container");
const scoreElement = document.getElementById("score");
const initialsInput = document.getElementById("initials");
const saveButton = document.getElementById("save-btn");
const correctScore = document.getElementById("correct-score");
const viewScore = document.getElementById("view-score");



// Start the quiz
startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  timerInterval = setInterval(updateTimer, 1000);
  showQuestion();
}

// Display a question and choices
function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;
  choicesElement.innerHTML = "";

  for (let i = 0; i < question.choices.length; i++) {
    const choiceButton = document.createElement("button");
    choiceButton.textContent = question.choices[i];
    choiceButton.classList.add("choice-button");
    choiceButton.addEventListener("click", checkAnswer);
    choicesElement.appendChild(choiceButton);
  }
}

// Check the selected answer
function checkAnswer(event) {
  const selectedChoice = event.target;
  const question = questions[currentQuestionIndex];
  const selectedAnswer = Array.from(choicesElement.children).indexOf(selectedChoice);

  if (selectedAnswer === question.answer) {
    resultElement.textContent = "Correct!";
    score++;
  } else {
    resultElement.textContent = "Wrong!";
    time -= 10; // Subtract 10 seconds for incorrect answer
  }

  resultContainer.classList.remove("hidden");
  setTimeout(nextQuestion, 1000);
}

// Display the next question or end the game
function nextQuestion() {
  
  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length || time <= 0) {
    endQuiz();
  } else {
    showQuestion();
  }
}

// Update the timer
function updateTimer() {
  time--;
  timerElement.textContent = time;

  if (time <= 0) {
    endQuiz();
  }
}

// End the quiz
function endQuiz() {
  clearInterval(timerInterval);
  resultContainer.classList.add("hidden");
  quizContainer.classList.add("hidden");
  scoreElement.textContent = score;
  correctScore.textContent = `${score} of ${questions.length} correct`;
  gameoverContainer.classList.remove("hidden");

}

// Save initials and score
saveButton.addEventListener("click", saveScore);

function saveScore() {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    console.log("Initials:", initials);
    console.log("Score:", score);
    gameoverContainer.classList.add("hidden");
    viewScore.textContent = `${initials}: ${score}`; 
    viewScore.classList.remove("hidden");
    var sessionScore = Number(sessionStorage.getItem('highScore'));
    if(sessionScore && sessionScore >= score ){

      
      sessionStorage.setItem("highScore", sessionScore);
    }
    else{
     
      sessionStorage.setItem("highScore", score);
    }




        
  } else {
    alert("Please enter initials.");
  }
}

