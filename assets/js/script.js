// Quiz Questions
const questions = [
  {
    question: "What is the primary purpose of HTML?",
    choices: ["Styling web pages", "Creating interactive web applications", "Defining the structure of web content", "Handling server-side logic"],
    answer: 2
  },
  {
    question: "Which programming language is commonly used for building web applications?",
    choices: ["Java", "Python", "JavaScript", "C++"],
    answer: 2
  },
  {
    question: "What does CSS stand for in web development?",
    choices: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
    answer: 2
  },
  {
    question: "What is the primary purpose of a database management system (DBMS)?",
    choices: ["Playing video games", "Managing and organizing data", "Sending emails", "Creating websites"],
    answer: 1
  },
  {
    question: "Which data structure follows the Last-In-First-Out (LIFO) principle?",
    choices: ["Queue", "Stack", "Heap", "Linked List"],
    answer: 1
  },
  {
    question: "In object-oriented programming, what is encapsulation?",
    choices: ["Hiding the implementation details of an object", "Storing data in an array", "Sorting data in a list", "Creating a graphical user interface"],
    answer: 0
  },
  {
    question: "What is the purpose of a version control system like Git?",
    choices: ["Baking cakes", "Tracking changes in code and collaborating with others", "Sending text messages", "Playing music"],
    answer: 1
  },
  {
    question: "What does the acronym 'HTTP' stand for in web development?",
    choices: ["HyperText Transfer Protocol", "Highly Tuned Text Transfer Protocol", "Hypertext Testing Tool Protocol", "Hyperlink and Text Transfer Process"],
    answer: 0
  },
  {
    question: "What is the main advantage of using a compiled programming language?",
    choices: ["Ease of learning", "Human-readable code", "Portability", "Performance optimization"],
    answer: 3
  },
  {
    question: "What is a function in programming?",
    choices: ["A piece of code that performs a specific task", "A computer keyboard key", "A type of variable", "A programming language"],
    answer: 0
  }
];


// Variables
let currentQuestionIndex = 0;
let time = 120;
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

