function generateMatrix(row,column,requiredSum){
    let rowarray = []
    let matrix = []
    let num = 1
    for(let i=0;i<row;i++){
        for(let j=0;j<column;j++){
            rowarray.push(num)
            num ++

        }
        matrix.push(rowarray)
        rowarray=[]
    }

    
    while(checkSum(matrix,requiredSum)!=true){
        updatematrix(matrix,row,column,requiredSum)
    }

    return matrix

}

function checkSum(matrix, requiredSum) {
    const rowCount = matrix.length;
    const columnCount = matrix[0].length;

    // Check row sums
    for (let i = 0; i < rowCount; i++) {
        const rowSum = matrix[i].reduce((sum, value) => sum + value, 0);
        if (rowSum !== requiredSum) {
            return false;
        }
    }

    // Check column sums
    for (let j = 0; j < columnCount; j++) {
        const columnSum = matrix.reduce((sum, row) => sum + row[j], 0);
        if (columnSum !== requiredSum) {
            return false;
        }
    }

    return true;
}
function updatematrix(matrix,row,column,requiredSum){
// Increment one value from each row and check the sum
for (let i = 0; i < row; i++) {
    matrix[i][0]++;
    
    
    
     
}

return null;
}




let result = generateMatrix(3,3,4)
console.log(result);