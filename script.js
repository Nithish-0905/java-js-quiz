const questions = [
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        answers: [
            { text:"var", correct:false},
            { text:"let", correct:false},
            { text:"both a and b", correct:true},
            { text:"none", correct:false},
        ]
    },
    {
        question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        answers: [
            { text:"throw an error", correct:false},
            { text:"ignores the statment", correct:true},
            { text:"gives a warning", correct:false},
            { text:"none", correct:false},
        ]
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        answers: [
            { text:"document.write()", correct:false},
            { text:"console.log()", correct:false},
            { text:"window.alert()", correct:false},
            { text:"All of the above", correct:true},
        ]
    },
    {
        question: "Which of the following is a type of polymorphism in Java Programming?",
        answers: [
            { text:"Multiple polymorphism", correct:false},
            { text:"Compile time polymorphism", correct:true},
            { text:"Multilevel polymorphism", correct:false},
            { text:"Execution time polymorphism", correct:false},
        ]
    },
    {
        question: "What is Truncation in Java?",
        answers: [
            { text:"Floating-point value assigned to a Floating type", correct:false},
            { text:"Floating-point value assigned to an integer type", correct:true},
            { text:"Integer value assigned to floating type", correct:false},
            { text:"Integer value assigned to floating type", correct:false},
        ]
    },
    {
        question: "Which exception is thrown when java is out of memory?",
        answers: [
            { text:"OutOfMemoryError", correct:true},
            { text:"MemoryError", correct:false},
            { text:"MemoryOutOfBoundsException", correct:false},
            { text:"MemoryFullException", correct:false},
        ]
    },
    {
        question: "Which of these are selection statements in Java?",
        answers: [
            { text:"break", correct:false},
            { text:"continue", correct:false},
            { text:"for()", correct:false},
            { text:"if()", correct:true},
        ]
    },
    {
        question: "What is the use of the <noscript> tag in Javascript?",
        answers: [
            { text:"The contents are displayed by non-JS-based browsers", correct:false},
            { text:"Clears all the cookies", correct:false},
            { text:"none", correct:false},
            { text:"Both A and B", correct:true},
        ]
    },
    {
        question: "What keyword is used to check whether a given property is valid or not?",
        answers: [
            { text:"is in", correct:false},
            { text:"exists", correct:false},
            { text:"in", correct:true},
            { text:"lies", correct:false},
        ]
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        answers: [
            { text:"constant", correct:false},
            { text:"let", correct:false},
            { text:"var", correct:false},
            { text:"const", correct:true},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-button");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
   
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedButton=e.target;
    const isCorrect = selectedButton.dataset.correct==="true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;
    }
    else{
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion()
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",() =>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();