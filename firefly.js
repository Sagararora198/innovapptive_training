let k=0
let count = 0
let randX = Math.floor(Math.random()*30) 
let randY = Math.floor(Math.random()*50) 
function firefly(){

    // while(true){

        if(count==1){
            let deltaX = Math.floor(Math.random()*3)-1
            let deltaY = Math.floor(Math.random()*3)-1
            randX = randX-deltaX
            randY = randY-deltaY
        }
        for(let i=0;i<30;i++){
            for(let j=0;j<50;j++){
                if(randX==0&&randY==0){
                    deltaX = Math.floor(Math.random()*2)
                    deltaY = Math.floor(Math.random()*2)
                    randX = randX +deltaX
                    randY = randY + deltaY


                }
                else if(randX==29&&randY==49){
                    
                        deltaX = Math.floor(Math.random()*2)
                        deltaY = Math.floor(Math.random()*2)
                        randX = randX - deltaX
                        randY = randY - deltaY

                }
                else if(randX==49&&randY==0){
                    
                        deltaX = Math.floor(Math.random()*2)
                        deltaY = Math.floor(Math.random()*2)
                        randX = randX -deltaX
                        randY = randY + deltaY
                }
                else if(randX==29&&randY==0){
                    
                        deltaX = Math.floor(Math.random()*2)
                        deltaY = Math.floor(Math.random()*2)
                        randX = randX +deltaX
                        randY = randY - deltaY
                }
                else if(randX>0 &&randX<=29){
                        if(randY==0){
                            deltaX = Math.floor(Math.random()*2)
                            deltaY = Math.floor(Math.random()*3)-1
                            randX = randX +deltaX
                            randY = randY + deltaY
                        }
                        else if(randY==49){
                            deltaX = Math.floor(Math.random()*2)
                            deltaY = Math.floor(Math.random()*3)-1
                            randX = randX-deltaX
                            randY = randY - deltaY 

                        }
                }
                else if(randY>0 && randY<=50){
                    if(randX==0){
                        deltaX = Math.floor(Math.random()*3) -1
                        deltaY = Math.floor(Math.random()*2) 
                        randX = randX +deltaX
                        randY = randY + deltaY
                    }
                    else if(randX==29){
                        deltaX = Math.floor(Math.random()*3) -1
                        deltaY = Math.floor(Math.random()*2) 
                        randX = randX -deltaX
                        randY = randY + deltaY
                    }
                }
                if((i==0 && j==0 ||(i==0 && j==49)||(i==29&&j==0)||(i==29 && j==49)) ){
                    process.stdout.write("+") 
                }
                else if(i==0||i==29){
                    process.stdout.write("-") 

                }
                else if(j==0 || j==49){
                    process.stdout.write("|") 
                }
                else if(i==randX && j==randY){
                    process.stdout.write("*") 
                    count = 1
                    
                }
                else {
                    process.stdout.write(" ") 
                }



            }
            console.log("");
            
        }
        k++
        
        
    }
// }

// firefly()
setInterval(firefly,200)


// const readline = require('readline');

// // Function to create a 2D grid
// // function createGrid(rows, cols) {
// //     return Array.from({ length: rows }, () => Array(cols).fill(' '));
// // }
// function createGrid(rows, cols) {
//     return Array.from({ length: rows }, (_, i) => {
//         if (i === 0 || i === rows - 1) {
//             // Fill the first and last rows with horizontal borders
//             return Array(cols).fill('-');
//         } else {
//             // Fill other rows
//             return Array.from({ length: cols }, (_, j) => {
//                 if (j === 0 || j === cols - 1) {
//                     // Fill the first and last columns with vertical borders
//                     return '|';
//                 } else {
//                     // Fill the inner cells with spaces
//                     return ' ';
//                 }
//             });
//         }
//     });
// }




// // Function to print the game grid
// function printGrid(grid) {
//     console.clear();
//     grid.forEach(row => console.log(row.join('')));
// }

// // Function to update the game state
// async function updateGame() {
//     // Your game logic goes here
//     // This is a simple example of a snake moving to the right

//     snake[0].y++;
//     if (snake[0].y >= cols) {
//         snake[0].y = 0;
//     }

//     // Clear the grid
//     grid = createGrid(rows, cols);

//     // Draw the snake on the grid
//     snake.forEach(segment => {
//         grid[segment.x][segment.y] = 'O';
//     });

//     // Draw food on the grid
//     grid[food.x][food.y] = 'X';

//     // Print the updated grid
//     printGrid(grid);

//     // Wait for a short time before the next update
//     await new Promise(resolve => setTimeout(resolve, 100));
// }

// // Initialize game variables
// const rows = 10;
// const cols = 20;
// let grid = createGrid(rows, cols);
// let snake = [{ x: 0, y: 0 }];
// let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };

// // Function to handle user input
// async function handleInput() {
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });

//     return new Promise(resolve => {
//         rl.question('Press Enter to exit...', () => {
//             rl.close();
//             resolve();
//         });
//     });
// }

// // Main game loop
// async function gameLoop() {
//     while (true) {
//         await updateGame();
//     }
// }

// // Run the game
// (async () => {
//     const inputPromise = handleInput();
//     const gamePromise = gameLoop();

//     // Wait for either input or game to finish
//     await Promise.race([inputPromise, gamePromise]);

//     console.log('Game over!');
//     process.exit();
// })();

