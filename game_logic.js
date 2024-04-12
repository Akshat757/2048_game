var score = 0;
var rows = 4;
var cols = 4;
var board = [rows][cols];

window.onload = function(){
    setGame();
}

function setGame(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    // board = [
    //     [2,2,2,2],
    //     [2,2,2,2],
    //     [4,4,8,8],
    //     [4,4,8,8]
    // ]
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setNew();
    setNew();
}

function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if(num > 0){
        tile.innerText = num.toString();
        if(num <= 4096){
            tile.classList.add("x"+num.toString());
        }
        else{
            tile.classList.add("x8912");
        }
    }
}

document.addEventListener("keyup", (e)=> {
    if(e.code == "ArrowLeft"){
        slideLeft();
        setNew();
    }
    else if(e.code == "ArrowRight"){
        slideRight();
        setNew();
    }
    else if(e.code == "ArrowUp"){
        slideUp();
        setNew();
    }
    else if(e.code == "ArrowDown"){
        slideDown();
        setNew();
    }
    document.getElementById("Score").innerText = score;
})

function filterZero(row) {
    return row.filter(num => num!=0);
}

function slide(row){
    row = filterZero(row);

    for(let i=0;i<row.length-1;i++){
        if(row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    }

    row = filterZero(row);

    while(row.length < cols){
        row.push(0);
    }

    return row;
}


function slideLeft(){
    for(let r=0;r<rows;r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for(let c=0;c<cols;c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];         
        row.reverse();              
        row = slide(row)            
        board[r] = row.reverse();   

        for (let c = 0; c < cols; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < cols; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < cols; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function rNum() {
    let y = Math.floor(Math.random() * 2);
    return y === 1 ? 4 : 2;
}

function generateRandomNum(x) {
    return Math.floor(Math.random() * x);
}

function setNew() {
    let emptyPos = [];
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === 0) emptyPos.push([i, j]);
        }
    }
    if (emptyPos.length === 0){
        var h = document.createElement("H1");
        var t = document.createTextNode("GAME OVER");
        h.appendChild(t);
        h.classList.add("game-over");
        document.body.appendChild(h);
        return;
    }
    let randNum = generateRandomNum(emptyPos.length);
    let number = rNum();
    let r = emptyPos[randNum][0];
    let c = emptyPos[randNum][1]; 
    board[r][c] = number;
    if(number == 4){
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        tile.innerText = "4";
        tile.classList.add("x4");
    }
    else{
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        tile.innerText = "2";
        tile.classList.add("x2");
    }
}














// // document.addEventListener('DOMContentLoaded', function () {
// //     const gameBoard = document.getElementById('game-board');
// //     const newGameBtn = document.getElementById('new-game-btn');
// //     const gameOverText = document.getElementById('game-over-text');
    
// //     let gridSize = 4; // Default grid size

// //     // Function to create the grid based on the size
// //     function createGrid(gridSize) {
// //         gameBoard.innerHTML = ''; // Clear previous content
        
// //         for (let i = 0; i < gridSize; i++) {
// //             for (let j = 0; j < gridSize; j++) {
// //                 const cell = document.createElement('div');
// //                 cell.className = 'cell';
// //                 cell.id = `cell-${i}-${j}`;
// //                 gameBoard.appendChild(cell);
// //             }
// //         }
// //     }

// //     // Function to update the grid with numbers
// //     function updateGrid(arr) {
// //         for (let i = 0; i < gridSize; i++) {
// //             for (let j = 0; j < gridSize; j++) {
// //                 const cell = document.getElementById(`cell-${i}-${j}`);
// //                 cell.textContent = arr[i][j] === 0 ? '' : arr[i][j];
// //             }
// //         }
// //     }

// //     // Function to start a new game
// //     function startNewGame() {
// //         gameOverText.textContent = ''; // Clear game over text
// //         // Call your backend code to start a new game
// //         fetch('/start-new-game', {
// //             method: 'POST',
// //             body: JSON.stringify({ gridSize }),
// //             headers: {
// //                 'Content-Type': 'application/json'
// //             }
// //         })
// //         .then(response => response.json())
// //         .then(data => {
// //             updateGrid(data);
// //         })
// //         .catch(error => console.error('Error starting new game:', error));
// //     }

// //     // Event listener for the new game button
// //     newGameBtn.addEventListener('click', startNewGame);

// //     // Initial setup
// //     createGrid(gridSize);
// //     startNewGame(); // Start a new game when the page loads
// // });


// function printarr(arr) {
//     let n = arr.length;
//     for (let i = 0; i < n; i++) {
//         let row = '';
//         for (let j = 0; j < n; j++) {
//             row += arr[i][j] + '  ';
//         }
//         console.log(row);
//     }
// }

// function rNum() {
//     let y = Math.floor(Math.random() * 2);
//     return y === 1 ? 4 : 2;
// }

// function generateRandomNum(x) {
//     return Math.floor(Math.random() * x);
// }

// function randomPos(arr) {
//     let emptyPos = [];
//     let n = arr.length;
//     for (let i = 0; i < n; i++) {
//         for (let j = 0; j < n; j++) {
//             if (arr[i][j] === 0) emptyPos.push([i, j]);
//         }
//     }
//     if (emptyPos.length === 0) return [-1, -1];
//     let randNum = generateRandomNum(emptyPos.length);
//     return emptyPos[randNum];
// }

// function top(arr) {
//     let n = arr.length;
//     for (let i = 0; i < n; i++) {
//         for (let j = 0; j < n; j++) {
//             if (arr[i][j] !== 0) {
//                 for (let k = 0; k < i; k++) {
//                     if (arr[k][j] === 0) {
//                         [arr[k][j], arr[i][j]] = [arr[i][j], arr[k][j]];
//                     }
//                     if (arr[k][j] === arr[i][j]) {
//                         arr[k][j] *= 2;
//                         arr[i][j] = 0;
//                     }
//                 }
//             }
//         }
//     }
//     let pos = randomPos(arr);
//     arr[pos[0]][pos[1]] = rNum();
//     printarr(arr);
// }

// function down(arr) {
//     let n = arr.length;
//     for (let i = n - 1; i >= 0; i--) {
//         for (let j = 0; j < n; j++) {
//             if (arr[i][j] !== 0) {
//                 for (let k = n - 1; k > i; k--) {
//                     if (arr[k][j] === 0) {
//                         [arr[k][j], arr[i][j]] = [arr[i][j], arr[k][j]];
//                     } else if (arr[k][j] === arr[i][j]) {
//                         arr[i][j] = 0;
//                         arr[k][j] *= 2;
//                     }
//                 }
//             }
//         }
//     }
//     let pos = randomPos(arr);
//     arr[pos[0]][pos[1]] = rNum();
//     printarr(arr);
// }

// function left(arr) {
//     let n = arr.length;
//     for (let i = 0; i < n; i++) {
//         for (let j = 0; j < n; j++) {
//             if (arr[j][i] !== 0) {
//                 for (let k = 0; k < i; k++) {
//                     if (arr[j][k] === 0) {
//                         [arr[j][k], arr[j][i]] = [arr[j][i], arr[j][k]];
//                     }
//                     if (arr[j][i] === arr[j][k]) {
//                         arr[j][k] *= 2;
//                         arr[j][i] = 0;
//                     }
//                 }
//             }
//         }
//     }
//     let pos = randomPos(arr);
//     arr[pos[0]][pos[1]] = rNum();
//     printarr(arr);
// }

// function right(arr) {
//     let n = arr.length;
//     for (let i = n - 1; i >= 0; i--) {
//         for (let j = 0; j < n; j++) {
//             if (arr[j][i] !== 0) {
//                 for (let k = n - 1; k > i; k--) {
//                     if (arr[j][k] === 0) {
//                         [arr[j][k], arr[j][i]] = [arr[j][i], arr[j][k]];
//                     }
//                     if (arr[j][k] === arr[j][i]) {
//                         arr[j][k] *= 2;
//                         arr[j][i] = 0;
//                     }
//                 }
//             }
//         }
//     }
//     let pos = randomPos(arr);
//     arr[pos[0]][pos[1]] = rNum();
//     printarr(arr);
// }

// document.addEventListener("keyup", (e) => {
//     if(e.code == "ArrowLeft"){
//         left(arr);
//     }
// })

// function game(gridSize) {
//     let arr = Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => 0));
//     let pos = randomPos(arr);
//     arr[pos[0]][pos[1]] = rNum();
//     pos = randomPos(arr);
//     arr[pos[0]][pos[1]] = rNum();

//     printarr(arr);

//     while (true) {
//         let check = randomPos(arr);
//         if (check[0] === -1) {
//             console.log("GAME OVER");
//             break;
//         }
//         console.log("enter input(w a s d): ");
//         let inp = prompt();
//         switch (inp) {
//             case 'w':
//                 top(arr);
//                 break;
//             case 's':
//                 down(arr);
//                 break;
//             case 'a':
//                 left(arr);
//                 break;
//             case 'd':
//                 right(arr);
//                 break;
//             default:
//                 console.log("invalid command");
//         }
//     }
// }

// while (true) {
//     let q = 1;
//     console.log("Press 1 for New Game\nPress 0 to end game");
//     q = parseInt(prompt());
//     if (q) {
//         let gridSize;
//         console.log("enter the size of the grid you want to play betwn (3-16): ");
//         gridSize = parseInt(prompt());
//         game(gridSize);
//     } else {
//         break;
//     }
// }

