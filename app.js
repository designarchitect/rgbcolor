let numberOfSquares = 6;
let colors = [];
let selectedColor;

let jumbotron = document.getElementById('jumbotron');
let squares = document.querySelectorAll('.square');
let selectedColorText = document.getElementById('selectedColor');
// let selectedResults = document.getElementById('selectedResults');
let selectedResults = document.getElementById('selectedResults');
let resetGame = document.getElementById('newGame');
// let easyMode = document.getElementById('easyMode');
// let hardMode = document.getElementById('hardMode');
let modeBtns = document.querySelectorAll('.mode');

init();

function init() {
    setupModeBtns();
	setupSquares();
    reset();
}

function setupModeBtns() {
    //mode buttons event listeners
    for (var i = 0; i < modeBtns.length; i++) {
        modeBtns[i].addEventListener('click', function() {
            modeBtns[0].classList.remove('selected');
            this.classList.add('selected');
            this.textContent === 'Easy' ? numberOfSquares = 3 : numberOfSquares = 6;
            //used ternary instead above
            // if(this.textContent === 'Easy'){
            // 	numberOfSquares = 3;
            // } else {
            // 	numberOfSquares = 6;
            // }

            reset();
        });
    }
}

function setupSquares(){
    for (let i = 0; i < squares.length; i++) {
        //add click listerns to squares
        squares[i].addEventListener('click', function() {
            let clickedColor = this.style.background;
            console.log(clickedColor, selectedColor);
            if (clickedColor === selectedColor) {
                selectedResults.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i> Correct';
                selectedResults.style.color = 'RGB(10, 199, 147)';
                //selectedResults.style.fontSize = '18px';
                resetGame.innerHTML = '<i class="fa fa-undo" aria-hidden="true"></i> Play Again?';
                changeColors(clickedColor);
                jumbotron.style.background = clickedColor;
            } else {
                selectedResults.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i> Try Again';
                this.style.backgroundColor = '#232323';
            }

        });
    }
}

function reset() {
    //generate random colors
    colors = generateRandomColors(numberOfSquares);
    //pick random color from array
    selectedColor = selectColor();
    //change display to match color picker
    selectedColorText.textContent = selectedColor;
    //reset results
    selectedResults.textContent = '';
    //reset play again text
    this.innerHTML = '<i class="fa fa-refresh" aria-hidden="true"></i> Generate New Colors';
    //change colors of squares
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = 'none';
        }
    }
    jumbotron.style.backgroundColor = '';
}

resetGame.addEventListener('click', function() {
    reset();
});

function changeColors(color) {
    for (let i = 0; i < squares.length; i++) {
        //change each color to match the given color
        squares[i].style.background = color;
    }
}

function selectColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    //add num random colors to array
    //return that array
    let arr = [];
    //repeat num times
    for (let i = 0; i < num; i++) {
        //get random color and push to the array
        arr.push(randomColor());
    }
    return arr;

}

function randomColor() {
    //pick a red from 0 - 255
    let r = Math.floor(Math.random() * 256);
    //pick a green from 0 - 255
    let g = Math.floor(Math.random() * 256);
    //pick a blue from 0 - 255
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}