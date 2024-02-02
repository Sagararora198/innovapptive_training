// function getFib() {
            
//     let userInput =879

    
//     if (!userInput || userInput < 0 || userInput % 1 !== 0 || typeof userInput=="string" ) {
//         console.log("Enter non-negative value");
//         return;
//     }
//     if(Number.isSafeInteger(userInput)){
    
//         let result = [0, 1];
//         for (let i = 2; i < userInput; i++) {
//             if(Number.isSafeInteger((result[i-1]+result[i-2]))){
//                 result.push(result[i-1]+result[i-2])
//             }
//             else{
//                 console.log("number too long");
//                 return
//             }

//         }
//         let index = result.length
        
//         console.log(result[index-1]);
//     }
//     else{
//         console.log("enter small integer");
//     }
// }
// getFib()

const pi = 3.14159625
let num = pi.toFixed(2)
console.log(typeof num);