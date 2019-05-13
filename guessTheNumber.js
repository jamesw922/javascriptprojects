let min = 1,
    max = 100,
    winningNum = getRandomNum(min, max),
    guessesLeft = 7;

const uiGame = document.querySelector('.game'),
      uiMinNum = document.querySelector('.min-num'),
      uiMaxNum = document.querySelector('.max-num'),
      uiGuessButton = document.querySelector('#guess-btn'),
      uiGuessInput = document.querySelector('#guess-input'),
      uiMessage = document.querySelector('.message'),
      uiMessage2 = document.querySelector('#wrong-guesses');

uiMinNum.textContent = min;
uiMaxNum.textContent = max;

function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1));
}

function setMessage(msg, color) {
    uiMessage.style.color = color;
    uiMessage.textContent = msg;
}

function setMessage2(msg) {
    uiMessage2.textContent += msg;
}

uiGuessButton.addEventListener('click', function(){
    let guess = parseInt(uiGuessInput.value);

    // Validate
    if(isNaN(guess) || guess < min || guess > max) {
        guessesLeft = guessesLeft;
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        setTimeout(setMessage, 3000);
    } else if(guess === winningNum) {
        gameOver(true, `${winningNum} is correct. YOU WIN!`);
    } else {
        //Wrong number
        guessesLeft -= 1;
        setMessage2(` ${uiGuessInput.value} `);
        uiGuessInput.value = '';
        uiGuessInput.placeholder = 'Guess Again!';

        if(guessesLeft > 0) {
            alert(`${guess} is incorrect. You have ${guessesLeft} guess(es) remaining. Try again!`);
        } else {
            gameOver(false, `It isn't as easy as looks. The correct number was ${winningNum}. Try again!`);
        } 

        if(guess < winningNum) {
            uiGuessInput.style.color = 'red';
            setMessage('You guessed too low!', 'green');
        } 
         else if(guess > winningNum) {
            uiGuessInput.style.color = 'red';
            setMessage(`You guessed too high!`, 'green');
        } 
    }
});


function gameOver(won, msg) {
    let color;
    won === true ? color = 'blue' : color = 'red';

    uiGuessInput.disabled = true;
    uiGuessInput.style.borderColor = color;
    uiMessage.style.color = color;
    uiGuessInput.placeholder = 'Well done!'
    setMessage(msg);

    uiGuessInput.value = '';

    uiGuessButton.value = 'Play again!';
    uiGuessButton.className += 'play-again';
}

// Play Again
uiGame.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again') {
        window.location.reload();
        uiGuessInput.value = '';
    }
});