var startButton = document.getElementById('start-button');
var optionsContainer = document.getElementById('options');
var questionContainer = document.getElementById('question');
var gameOverMessage = document.getElementById('game-over');

var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60;
var timerInterval;

var questions = [
    {
        question: "What is JavaScript?",
        options: ["A programming language", "A type of coffee", "A new movie"],
        correctIndex: 0
    },
{
    question: "In JavaScript, what is the primary purpose of a string?",
    options: [
        "To store and manipulate text-based data",
        "To perform mathematical calculations",
        "To control the flow of a program",
        "To create visual elements on a webpage"
    ],
    correctIndex: 0
},
{
    question: "In JavaScript, what is the purpose of a variable?",
    options: [
        "To store and manage text-based data",
        "To create visual elements on a webpage",
        "To perform mathematical calculations",
        "To store and manage data values"
    ],
    correctIndex: 3
},
{
    question: "Who developed the Bootstrap framework?",
    options: [
        "Mark Zuckerberg",
        "Tim Berners-Lee",
        "Jeff Bezos",
        "Twitter, Inc."
    ],
    correctIndex: 3
},
]

function startQuiz() {
    startButton.classList.add('hide');
    optionsContainer.style.display = 'block';
    questionContainer.style.display = 'block';

    displayQuestion(currentQuestionIndex);
    startTimer(); 

    optionsContainer.addEventListener('click', checkAnswer);
}


function displayQuestion(index) {
    questionContainer.textContent = questions[index].question;
    optionsContainer.innerHTML = '';

    questions[index].options.forEach(function(option, optionIndex) {
        var optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.classList.add('btn', 'btn-info', 'btn-block', 'mb-2');
        optionButton.dataset.index = optionIndex;
        optionsContainer.appendChild(optionButton);
    });
}

function checkAnswer(event) {
    var selectedOptionIndex = event.target.dataset.index;
    var correctIndex = questions[currentQuestionIndex].correctIndex;

    if (selectedOptionIndex == correctIndex) {
        score++;
    } else {
        timeLeft -= 10; 
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        endQuiz();
    }
}

function startTimer() {
    document.getElementById('time').textContent = timeLeft; 
    timerInterval = setInterval(function() {
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        } else {
            document.getElementById('time').textContent = timeLeft; 
        }
    }, 1000);
}



function endQuiz() {
    clearInterval(timerInterval);
    questionContainer.textContent = '';
    optionsContainer.style.display = 'none';
    gameOverMessage.textContent = 'Game Over! Your score is ' + score + '.';
    gameOverMessage.style.display = 'block';
    document.getElementById('score-form').style.display = 'block'; 
}

startButton.addEventListener('click', startQuiz);

var highScores = [];

function displayHighScores() {
    var highScoresList = document.getElementById('high-scores-list');
    highScoresList.innerHTML = ''; 

    highScores.sort(function(a, b) {
        return b.score - a.score;
    });

    highScores.forEach(function(score, index) {
        var li = document.createElement('li');
        li.textContent = (index + 1) + ". " + score.initials + " - " + score.score;
        highScoresList.appendChild(li);
    });

    document.getElementById('high-scores').style.display = 'block';
    document.getElementById('game-over').style.display = 'none';
}

var scoreForm = document.getElementById('score-form');
scoreForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var userInitials = document.getElementById('initials').value;
    var userScore = { initials: userInitials, score: score };
    highScores.push(userScore);
    displayHighScores();
});