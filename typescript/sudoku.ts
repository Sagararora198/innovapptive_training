const fs = require('fs')

/**Prints the sudoku
 * 
 * @param path path of the puzzle
 * @returns string which contain sudoku
 * @throws error reading the record 
 */
function readSudoku(path: string): string {
    try {
        const data: string = fs.readFileSync(path, 'utf-8')
        return data
    }
    catch (err) {
        return err.message


    }

}

/** convert the content of file into a 2d array of numbers
 * 
 * @param contentOfFile content of file in string format
 * @returns 2-d array of numbers containing sudoku 
 */
function make2dArray(contentOfFile: string): number[][] {
    const lines: string[] = contentOfFile.trim().split('\n')


    const sudokuArray: number[][] = lines.map(line => line.trim().split(/\s+/).map(Number))
    return sudokuArray
}

/**Will solve the sudoku and give the resutant 2d array
 * 
 * @param sudoku input 2d array containing sudoku
 */
function solveSudokuHelper(sudoku: number[][],checkNumber:number): number[][] {
    // row flag and column flag to eleminate the row and column
    let rowFlag: boolean[] = []
    let columnFlag: boolean[] = []
    // initialize the row flag and column flag with true
    for (let i: number = 0; i < sudoku.length; i++) {
        rowFlag.push(true)
    }
    for (let i: number = 0;i< sudoku[0].length; i++) {
        columnFlag.push(true)
    }
    
    
        // define a checknumber which will have all the number from 1-9
        // check checknumber in sudoku and if found mark that row and column flase
        for (let i: number = 0; i < sudoku.length; i++) {
            for (let j: number = 0; j < sudoku[0].length; j++) {
                if (sudoku[i][j] == checkNumber) {
                    rowFlag[i] = false
                    columnFlag[j] = false
                }
            }
        }
        for (let allBoxes: number = 0; allBoxes < 9; allBoxes++) {
            // for choosing different box index every time
            let rowStartIndex: number = 0
            let rowEndIndex: number = 3
            let columnStartIndex: number = 0
            let columnEndIndex: number = 3
            // now delare one flag for number to check if the number already present in box
            let flagForNumber: boolean = false

            // check if it already present
            loop1: for (let i: number = rowStartIndex; i < rowEndIndex; i++) {
                loop2: for (let j: number = columnStartIndex; j < columnEndIndex; j++) {
                    if (sudoku[i][j] == checkNumber) {
                        flagForNumber = true
                        break loop1
                    }
                }
            }
            // if not present then add that number
            if (flagForNumber == false) {
                 for (let i: number = rowStartIndex; i < rowEndIndex; i++) {
                     for (let j: number = columnStartIndex; j < columnEndIndex; j++) {
                        if (rowFlag[i] == true && columnFlag[j] == true && sudoku[i][j] == 0) {
                            sudoku[i][j] = checkNumber
                            rowFlag[i] = false
                            columnFlag[j] = false
                        }
                    }
                }
            }
            // update the index for next round
            columnStartIndex = columnEndIndex
            columnEndIndex += 3
            if (columnStartIndex == 9) {
                columnStartIndex = 0
                columnEndIndex = 3
                rowStartIndex += 3
                rowEndIndex += 3
            }
        }
        
    
    return sudoku

}
// function solveSudokuHelper(sudoku: number[][],checkNumber:number): number[][] {
//     let rowFlag: boolean[] = []
    
//     let columnFlag: boolean[] = []

    
//     // for (let checkNumber: number = 1; checkNumber <= 9; checkNumber++) {
//         for (let i: number = 0; i < sudoku.length; i++) {
//             rowFlag.push(true)
//         }
//         for (let i: number = 0;i< sudoku[0].length; i++) {
//             columnFlag.push(true)
//         }
//         for (let i: number = 0; i < sudoku.length; i++) {
//             for (let j: number = 0; j < sudoku[0].length; j++) {
//                 if (sudoku[i][j] == checkNumber) {
//                     rowFlag[i] = false;
//                     columnFlag[j] = false;
//                 }
//             }
//         }

//         for (let allBoxes: number = 0; allBoxes < 9; allBoxes++) {
//             let rowStartIndex: number = Math.floor(allBoxes / 3) * 3;
//             let rowEndIndex: number = rowStartIndex + 3;
//             let columnStartIndex: number = (allBoxes % 3) * 3;
//             let columnEndIndex: number = columnStartIndex + 3;

//             for (let i: number = rowStartIndex; i < rowEndIndex; i++) {
//                 for (let j: number = columnStartIndex; j < columnEndIndex; j++) {
//                     if (rowFlag[i] && columnFlag[j] && sudoku[i][j] == 0) {
//                         sudoku[i][j] = checkNumber;
//                         rowFlag[i] = false
//                         columnFlag[j] = false
//                     }
//                 }
//             }
//         }
    
//     return sudoku;
// }
function solveSudoku(sudokuArray:number[][]):number[][]{
    for(let i:number =1;i<=9;i++){
        sudokuArray = solveSudokuHelper(sudokuArray,i)
    }
    return sudokuArray
}
function loopUntilDone(sudokuArray:number[][]):number[][]{
    for(let i:number=0;i<100;i++){
        sudokuArray = solveSudoku(sudokuArray)
    }
    return sudokuArray
}

const fileContent: string = readSudoku('puzzle1.txt')
const sudokuArray: number[][] = make2dArray(fileContent)
const solvedSuddoku:number[][] = loopUntilDone(sudokuArray)
console.log(solvedSuddoku);
