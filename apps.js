const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Rome", correct: false },
            { text: "Paris", correct: true },
            { text: "Berlin", correct: false }

        ]
    },
    {
        question: "Which planet is known as the Red Planet? ",
        answers: [
            { text: "Jupiter", correct: false },
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
            { text: "Saturn", correct: false }

        ]
    },
    {
        question: "What is the chemical symbol for water? ",
        answers: [
            { text: "H2O", correct: true },
            { text: " CO2", correct: false },
            { text: " O2", correct: false },
            { text: "N2", correct: false }

        ]
    },
    {
        question: "Who wrote the play Hamlet? ",
        answers: [
            { text: "William Shakespeare ", correct: true },
            { text: "Charles Dickens ", correct: false },
            { text: " Leo Tolstoy", correct: false },
            { text: "Jane Austen", correct: false }

        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButtons = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuize() {
    currentQuestionIndex = 0;
    score = 0;
    nextButtons.innerHTML = "Next";

    showQuestion();
}
function showQuestion() {
    resetState();
    let currentquestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentquestion.question;

    currentquestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);

    })

}
function resetState() {
    nextButtons.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;

    } else {
        selectBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButtons.style.display = "block";
}


function showScore() {
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButtons.innerHTML = "Play Again";
    nextButtons.style.display = "block";
}


function handelNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();

    } else {
        showScore();
    }

}


nextButtons.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handelNextButton();
    } else {
        startQuize();
    }
})
startQuize();