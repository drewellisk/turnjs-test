const questions = [
    {
        question: "What changes could be made?",
        answers: [
            { text: "Wrong", correct: false, explanation: "Wrong answer." },
            { text: "Correct", correct: true, explanation: "Correct answer!" },
            { text: "Wrong", correct: false, explanation: "Wrong answer." },
            { text: "Wrong", correct: false, explanation: "Wrong answer." },

        ]
    },

    {
        question: "What changes could be made 2?",
        answers: [
            { text: "Wrong", correct: false, explanation: "Wrong answer." },
            { text: "Correct", correct: true, explanation: "Correct answer!" },
            { text: "Wrong", correct: false, explanation: "Wrong answer." },
            { text: "Wrong", correct: false, explanation: "Wrong answer." },

        ]
    },

    {
        question: "What changes could be made 3?",
        answers: [
            { text: "Wrong", correct: false, explanation: "Wrong answer." },
            { text: "Correct", correct: true, explanation: "Correct answer!" },
            { text: "Wrong", correct: false, explanation: "Wrong answer." },
            { text: "Wrong", correct: false, explanation: "Wrong answer." },

        ]
    },
];


const quizContainer = document.getElementById("quizContainer")

quizContainer.style.display = "none";

const pageElement = document.getElementById("page");
const pageNext = document.getElementById("pageNext");
const pageBack = document.getElementById("pageBack");
let pageIndex = 0;


const popup = document.getElementById("popup");
let popupText = document.getElementById("popupText");

pages = [
    { img: "images/Cover.png" },
    { img: "images/FontChoicesDraft.png" },
    { img: "images/Contrast.png" },
    { img: "images/Colorblindness.png" },
    { img: "images/ClosedCaptionsTranscript.png" },
    { img: "images/ImagesAltText.png" },
    { img: "images/CognitiveLoadNavigation.png" },
    { img: "images/BackCover.png" },



]

function initPage() {

    //Get current page
    let currentPage = pages[pageIndex].img;

    //Disable back button

    if (pageIndex === 0) {
        pageBack.disabled = true;
        pageBack.style.display = "none";
    } else {
        pageBack.disabled = false;
        pageBack.style.display = "flex";
    }

    // Disable next button
    if (pageIndex === pages.length - 1) {
        pageNext.disabled = true;
        pageNext.style.display = "none";
    } else {
        pageNext.disabled = false;
        pageNext.style.display = "flex";
    }


    //Update html to show current page
    pageElement.innerHTML = `<img id = 'page' src = ${currentPage} width = "600px" height = "700px"></img>`

    pageNext.addEventListener("click", next);
    pageBack.addEventListener("click", back);

}


function next() {
    pageIndex++;

    if (pageIndex > pages.length) {
        pageIndex = pages.length;
    }

    initPage();
}

function back() {
    pageIndex--;

    if (pageIndex <= 0) {
        pageIndex = 0;
    }

    initPage();
}

function resetPage() {
    pageIndex = 0;
    initPage();
}

initPage();

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answerButtons");
const nextBtn = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    resetPage();
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    popup.style.display = "none";
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.answers.find(answer => answer.text === selectedBtn.innerHTML)

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtns.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
    console.log(selectAnswer.explanation);
    showPopup(selectedAnswer.explanation);

}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Restart";
    nextBtn.style.display = "block";

}

function handleNextButton() {
    currentQuestionIndex++;
    pageIndex++;
    initPage();
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

function showPopup(explanation) {
    popup.style.display = "block";
    popupText.innerHTML = explanation
}

startQuiz();


startQuiz();

