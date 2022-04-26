//Create in JS a 10x10 grid with random numbers from 1 to 100 non-repetead
document.getElementById('start').addEventListener("click", startGame);

//MAIN FUNCTION
//generate random numbers from 1 to 100 non-repetead
function startGame() {

    const gridSize = 100;
    const gridArray = generateGridNumbers(gridSize);

    //create a grid item for every number
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.innerHTML = "";

    for(let i = 0; i < gridArray.length; i++) {
        const thisNumber = gridArray[i];

        const gridElement = generateGridItem(thisNumber);

        gridElement.addEventListener("click", function () {
            this.classList.add("active")
        });
        gridContainer.append(gridElement);
    }
}

function generateGridNumbers (gridNumberQuantity) {
    const numberArray = []; 

    //create random numbers using while 
    while (numberArray.length < gridNumberQuantity) {
        const randomNumber = getRndInteger(1, gridNumberQuantity);

        if ( !numberArray.includes(randomNumber) ) {
            numberArray.push(randomNumber);
        }
    }
    return numberArray;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function generateGridItem(number) {
    const newElement = document.createElement("div");

    newElement.innerHTML = `<span>${number}</span>`

    newElement.classList.add("grid-square");

    return newElement;
}