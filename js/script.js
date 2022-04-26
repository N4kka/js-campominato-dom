const playButton = document.getElementById("start");
playButton.addEventListener("click", startGame);

// MAIN FUNCTION
function startGame() {
    // Nascondere la scritta con classe "hidden"
    // Far vedere il contenitore della griglia, togliendo la classe "hidden"
    const title = document.getElementById("title");
    const grid = document.getElementById("grid");
    title.classList.add("hidden");
    grid.classList.remove("hidden");
    grid.innerHTML = "";

    // Prelevare la scelta della difficoltà dell'utente
    const difficulty = parseInt(document.getElementById("level").value);
    let cellNumber;
    let cellsNuberInRow;
    if (difficulty === 1) {
        cellNumber = 100;
        cellsNuberInRow = 10;
    } else if (difficulty === 2) {
        cellNumber = 81;
        cellsNuberInRow = 9;
    } else {
        cellNumber = 49;
        cellsNuberInRow = 7;
    }

    const bombsNumbers = 16;
    const bombsArray = generateBombsNumbers (bombsNumbers, cellNumber);
    console.log(bombsArray);
    const safeCells = [];
    const winNumbers = cellNumber - bombsNumbers;

    // Generate cells from 1 to 100
    for (let i = 1; i <= cellNumber; i++) {
        // generate cell
        const newItem = generateGridItem(i, cellsNuberInRow);
        // add the handler on click
        newItem.addEventListener("click", handleCellClick);
        // append the cell to the container
        grid.append(newItem);
    }


    /** 
     * Description: The function for the cornflower color
     * No return
     */
    function handleCellClick() {
        const selectedNumber = parseInt(this.querySelector("span").textContent);

        if ( bombsArray.includes(selectedNumber) ) {
            this.classList.add("clicked")

            endGame (safeCells.length, "lose");
        } else {
            this.classList.add("active")

            safeCells.push(selectedNumber);
            
            if (safeCells.length >=winNumbers) {
                endGame (safeCells.length, "win");
            }
        }
    }

    /**
     * Description: Generate a cell in the grid on HTML with this function
     * @param {any} gridNumber -> number in the cell
     * @param {any} cellsInRow -> number of cells in a row
     * @returns {any} -> DOM element who represents the cell in the grid
     */
    function generateGridItem(gridNumber, cellsInRow) {
        // Create an html element
        const gridItem = document.createElement("div");
        // add the class "grid-item"
        gridItem.classList.add("grid-square");
        // setting the size of the cells;
        gridItem.style.width = `calc(100% / ${cellsInRow})`;
        gridItem.style.height = `calc(100% / ${cellsInRow})`;
        // add the span with the number 
        gridItem.innerHTML = `<span>${gridNumber}</span>`

        return gridItem;
    }

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    /**
     * Description: Generate random non-repetead number from 1 to 16 with this function
     * @param {Number} numberQuantity --> number of elements to be generated
     * @param {Number} maxLimit --> max numbers in the grid = cellNumber
     * @returns {Array} --> array of random non-repetead numbers
     */
    function generateBombsNumbers (numberQuantity, maxLimit) {
        const numbersArray = [];
        while (numbersArray.length < numberQuantity) {
        const randomNumber = getRndInteger(1, maxLimit);
        if ( !numbersArray.includes(randomNumber) ) {
            numbersArray.push(randomNumber);
        }
        }
        return numbersArray;
    }

    
    // **
    //  * Description: The result will be displayed with this function
    //  * @param {any} safeNumbersQuantity --> max number of safe cells
    //  * @param {any} winLose --> The result
    //  * @returns {any}
    function endGame (safeNumbersQuantity, winLose) {
        const resultTitle = document.getElementById("result");
        let resultMessage;
        if (winLose === "lose") {
            resultMessage = `Hai perso! Hai totalizzato un punteggio di ${safeNumbersQuantity}`;
        } else {
            resultMessage = "Complimenti! Hai vinto, sei un mostro!"
        }
        resultTitle.innerHTML = resultMessage;
        resultTitle.classList.remove("hidden");
    }
}
