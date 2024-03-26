const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const submitButton = document.getElementById("submit-answer");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const generateQuestionButton = document.getElementById("generate-question");
const endQuizButton = document.getElementById("end-quiz");
const timerElement = document.getElementById("timer");
let score = 0;
let correctAnswer;
let questionGenerated = false; // Variável para controlar se uma nova pergunta foi gerada
let answerSubmitted = false; // Variável para controlar se uma resposta foi enviada

function calculateAnswer(num1, num2, operation) {
    switch (operation) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': // Verificar se o resultado da operação é um número inteiro
      /*  if(num1 % num2 === 0) {
            return num1 / num2;
        } else {
            // Se não for número inteiro, gerar novos números.
            return generateQuestion();
        }*/
        if (num2 !== 0) {
            return num1 / num2;
        } else {
            return null
        }
        default: return null;
    }
}

// Função para verificar se o resultado é um número inteiro
function isResultadoInteiro(resultado) {
    return Number.isInteger(resultado);
}

function generateQuestion() {
    /*const num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;*/
    let num1, num2;
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    if (operation === '/') {
        // Ajustar num2 para garantir um número inteiro
        num2 = /*num1 **/ (Math.floor(Math.random() * 9) + 1);//Números de 1 a 9.
        num1 = num2 * (Math.floor(Math.random() * 10) + 1);//Números de 1 a 10.
    } else {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
    }

    correctAnswer = calculateAnswer(num1, num2, operation);
    // Verificar se correctAnswer é um número, antes de prosseguir.
    if (typeof correctAnswer === 'number') {
        questionElement.innerText = `Quanto é ${num1} ${operation} ${num2}?`;
        questionGenerated = true; // Nova pergunta gerada
        answerSubmitted = false; // Resetar após gerar nova pergunta
        startTimer();
    } else {
        // Se correctAnswer não for um número, tente gerar a pergunta novamente.
        generateQuestion();
    }
    if (correctAnswer !== undefined) {
 
    } else {
        resultElement.innerText = "Responda a operação atual!"
    }
  }

function checkAnswer(userAnswer) {
    if (!questionGenerated) {
        resultElement.innerText = "Clique no botão play para gerar uma nova operação";
        return;
    }

    clearInterval(timer);

    // Elementos de áudio para os sons
const successSound = new Audio("sounds/short-crowd-cheer-6713.mp3");
const errorSound = new Audio("sounds/wah-wah-sad-trombone-6347.mp3");
const EndOfTimeSound = new Audio("sounds/wrong-47985.mp3");

// Função para reproduzir o som de sucesso
function playSuccessSound() {
    successSound.play();
}

// Função para reproduzir o som de erro
function playErrorSound() {
    errorSound.play();
}

// Função para reproduzir o som de tempo esgotado
function playEndOfTimeSound() {
    EndOfTimeSound.play();
}

// Exemplo de uso:
// Quando a resposta do usuário for avaliada (certa ou errada), chame a função apropriada.
// Por exemplo:
if (userAnswer === correctAnswer) {
    playSuccessSound();
    // Outras ações para resposta correta
} else if (userAnswer !== null) {
    playErrorSound();
    // Outras ações para resposta incorreta
} else {
    playEndOfTimeSound();
}

    if (userAnswer !== null && Math.abs(userAnswer - correctAnswer) < 0.01) {
        score += 0.10;
        resultElement.innerText = "Muito bem, resposta certa! Você ganhou R$ 0,10.";
    } else if (userAnswer !== null) {
        score -= 0.10;
        resultElement.innerText = `Resposta errada! A resposta certa é: ${correctAnswer}. Você perdeu R$ 0,10.`;
    } else {
        score -= 0.10;
        resultElement.innerText = "O tempo acabou!Você perdeu R$ 0,10.";
    }
    scoreElement.innerText = `Score: R$${score.toFixed(2)}`;
    answerElement.value = "";
    questionGenerated = false; // Resposta enviada, esperando nova pergunta.
}

const ticTacSound = new Audio("sounds/tic-tac.mp3");

function startTimer() {
    let secondsLeft = 15;
    timerElement.innerText = `Tempo: ${secondsLeft}`;
    ticTacSound.play();
    timer = setInterval(() => {
        secondsLeft--;
        timerElement.innerText = `Tempo: ${secondsLeft}`;
        if (secondsLeft === 0) {
            clearInterval(timer);
            ticTacSound.pause();
            ticTacSound.currentTime = 0;
            checkAnswer(null); // Tempo acabou, enviar null como resposta.
            console.log("Temporizador parado");// Log de depuração.
        }
    }, 1000);
    console.log("Temporizador iniciado"); // Log de depuração.
}

submitButton.addEventListener("click", () => {
    const userAnswer = parseFloat(answerElement.value);
    checkAnswer(userAnswer);
    answerSubmitted = true; // Resposta enviada
    clearInterval(timer);
    ticTacSound.pause();
    ticTacSound.currentTime = 0;
});

answerElement.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const userAnswer = parseFloat(answerElement.value);
        checkAnswer(userAnswer);
        answerSubmitted = true;

        clearInterval(timer);
        ticTacSound.pause();
        ticTacSound.currentTime = 0;
    }
});

generateQuestionButton.addEventListener("click", generateQuestion);
// generateQuestionButton.addEventListener("click", () =>{
//     if (!questionGenerated)
// {
//     generateQuestion();
//     startTimer();
// }});

endQuizButton.addEventListener("click", () => {
    clearInterval(timer);
    ticTacSound.pause();
    ticTacSound.currentTime = 0;
    alert(`Quiz finalizado. Sua pontuação final é: R$${score.toFixed(2)}`);
});

// Iniciar o quiz com uma pergunta
// generateQuestion();