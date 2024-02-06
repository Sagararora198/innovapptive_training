/*
* We have to create 4 main functions 
* 1] getSimple2sComplement
* 2] getSimpleDecimalFrom2sComplement
* 3] getJSNumberRepresentation
* 4] getNumericFromJSRepresentation
*/




/** Convert the number into its binary representation 
 * @param {Number} value decimal number to convert
 * @param {Number} digit length of bits to prepresent
 * @returns {[]} binary representation
 */
function giveBinary(value,digit){
    let arr = []

    while(value!=0){
        
        arr.unshift(value%2)
        value = Math.floor(value/2)

    }
    if(digit=undefined){
        return arr
    }
    let remainingLength = digit-arr.length
    for(let i=0;i<remainingLength;i++){
        arr.unshift(0)
    }

    return arr
}

/** give 2's complement of array
 * 
 * @param {[]} binary binary array
 * @returns {[]} 2's complement of the given array
 */
function give2sComplement(binary){
    for(let i=0;i<binary.length;i++){
        if(binary[i]==0){
            
            binary[i]=1
            
        }
        else{
            binary[i]=0
        }
    }
    
    
    //2's complement
    let carry = 1
    for(let i = binary.length - 1; i >= 0; i--){
        let sum = binary[i] + carry
        binary[i] = sum % 2
        carry = Math.floor(sum/2)
       
    }
    return binary
}

/** Convert any decimal number to its 2's complement
 * @param {Number} value decimal number
 * @param {Number} digit length of bits to represent 2's complement 
 * @returns {[]} binary 2's complement
 * @throws {Error} digits length should be less then 52
*/
function getSimple2sComplement(value,digit){
    if(digit>52){
        throw new Error("Length of digit should not exceed 52")
        
    }
    if(Math.sign(value)==1 || Math.sign(value)==0){
        return giveBinary(value,digit)
    }
    else {
        value = -value
        
        let binary = giveBinary(value,digit)

        return give2sComplement(binary)  
    }
    
}


/**Convert binary to decimal
 * 
 * @param {[]} binary binary array
 * @returns {Number} decimal representation
 */
function convertToDecimal(binary){
    let power = 1
    let sum = 0
    for(let i=binary.length-1;i>=0;i--){
       sum = power*binary[i] + sum
       power = power*2
    }
    return sum
}

/** Convert the binary into Decimal number by performing 2's complement
 *  @param {[]} binary binary array
 * @returns {Number} decimal representation
 * @throws 
 */
function getSimpleDecimalFrom2sComplement(binary){
    if(binary[0]==0){

        return convertToDecimal(binary)
    }
    else{
        give2sComplement(binary)

        return -convertToDecimal(binary)


    }
}


/**
 * 
 * @param {Number} value Decimal number  
 * @returns {[]} splitted array of decimal number
 */
function splitNumberFromRadixPoint(value){
    let integerPart = Math.floor(value)
    let decimalPart = value-integerPart
    return [integerPart,decimalPart]
}

// console.log(splitNumberFromRadixPoint(3.143));




/**Convert decimal number to JS number representation
 * 
 * @param {Number} value decimal number 
 */
function getJSNumberRepresentation(value){
    if(Math.sign(value)==0){

    }
    else{
        // first split the number from radix point 
        // then calculate the binary of each part separatly
        // merge and convert it into normal form
        let splitted = splitNumberFromRadixPoint(value)

        // for left part
        let leftPart = giveBinary(splitted[0])

        // for right part
        

        


    }
    

}


// let arr = getSimple2sComplement(-4,11)
// console.log(getSimpleDecimalFrom2sComplement(arr));
