/*
* We have to create 4 main functions 
* 1] getSimple2sComplement
* 2] getSimpleDecimalFrom2sComplement
* 3] getJSNumberRepresentation
* 4] getNumericFromJSRepresentation
*/


/** Convert the number into its binary representation of requested length 
 * @param {Number} inputNumber decimal number to convert
 * @param {Number} lengthOfOutput length of bits to prepresent
 * @returns {[Number]} binary representation of inputNumber with lengthOfOutput length
 * @throws {Error} when the inputNumber cannot be fit into the lengthOfOutput array
 */
function giveBinary(inputNumber, lengthOfOutput) {

	// declaring an empty array to be populated for returning as output
	let outputArray = []
	let inputNumberCopy = inputNumber

	// repeatedly divide to find the quotient and populate the binary representation
	while (inputNumber != 0) {
		outputArray.unshift(inputNumber % 2)
		inputNumber = Math.floor(inputNumber / 2)
	}


	// return the outputArray of minimum length, if lengthOfOutput not specified
	if (lengthOfOutput == undefined) {
		return outputArray
	}

	if (lengthOfOutput - outputArray.length < 0) {
		throw new Error(`The ${inputNumberCopy} cannot be fit into an array of ` + 
		`length ${lengthOfOutput}`)
	} 
	
	let iterationCount = (lengthOfOutput - outputArray.length)

	for (let i = 0; i < iterationCount; i++) {
		outputArray.unshift(0)
	}

	return outputArray
}

/** Function to convert an array to human readable format
 * @param {*} arrayOfNumbers the array to be converted to readable format
 * @return {String} a huamn readable array format of this number
 */
function getHumanReadableArray(arrayOfNumbers) {
	let returnString = "[ "

	for (let index = 0; index < arrayOfNumbers.length; index++) {
		const currentNumber = arrayOfNumbers[index];

		returnString += arrayOfNumbers[index]

		if (index != (arrayOfNumbers.length-1)) {
			returnString += ", "
		} else {
			returnString += " "
		}
	}

	return returnString + "]"
}

/** give 2's complement of array
 * 
 * @param {[]} inputBinaryArray binary array
 * @returns {[]} 2's complement of the given array
 */
function give2sComplement(inputBinaryArray) {
	// Do 1's complement by simply substituting 0 by 1 nad vice-versa 
	for (let i = 0; i < inputBinaryArray.length; i++) {
		if (inputBinaryArray[i] == 0) {

			inputBinaryArray[i] = 1

		}
		else {
			inputBinaryArray[i] = 0
		}
	}


	//2's complement by adding 1 to last bit
	let carry = 1
	for (let i = inputBinaryArray.length - 1; i >= 0; i--) {
		let sum = inputBinaryArray[i] + carry
		inputBinaryArray[i] = sum % 2
		carry = Math.floor(sum / 2)

	}
	//return the 2's complement binary
	return inputBinaryArray
}


// console.log(give2sComplement([0,0,1,0]));

/** Convert any decimal number to its 2's complement
 * @param {Number} inputDecimalNumber decimal number
 * @param {Number} lengthOfOutput length of bits to represent 2's complement 
 * @returns {[]} binary 2's complement
 * @throws {Error} digits length should be less then 52
*/
function getSimple2sComplement(inputDecimalNumber, lengthOfOutput) {
	//check if the length of output mentioned is not greater then 52
	if (lengthOfOutput > 52) {
		throw new Error("Length of digit should not exceed 52")

	}
	// check if the number is negative or not
	// if number posistive then simply return the binary representation
	if (Math.sign(inputDecimalNumber) == 1 || Math.sign(inputDecimalNumber) == 0) {
		return giveBinary(inputDecimalNumber, lengthOfOutput)
	}
	// if the number is negative then perform 2's complement 
	else {
		inputDecimalNumber = -inputDecimalNumber

		let outputBinaryArray = giveBinary(inputDecimalNumber, lengthOfOutput)

		return give2sComplement(outputBinaryArray)
	}

}
// console.log(getSimple2sComplement(-12,11));

/**Convert binary to decimal
 * 
 * @param {[]} inputBinaryArray binary array
 * @returns {Number} decimal representation
 */
function convertToDecimal(inputBinaryArray) {
	let power = 1
	let sum = 0
	for (let i = inputBinaryArray.length - 1; i >= 0; i--) {
		sum = power * inputBinaryArray[i] + sum
		power = power * 2
	}
	return sum
}
// console.log(getSimpleDecimalFrom2sComplement([1,0,1,1]));

/** Convert the binary into Decimal number by performing 2's complement
 *  @param {[]} inputBinaryArray binary array
 * @returns {Number} decimal representation
 * @throws 
 */
function getSimpleDecimalFrom2sComplement(inputBinaryArray) {
	// check if the number is negative by it's MSB
	if (inputBinaryArray[0] == 0) {

		return convertToDecimal(inputBinaryArray)
	}
	// if negative then first perform 2's complement and return negative number
	else {
		give2sComplement(inputBinaryArray)

		return -convertToDecimal(inputBinaryArray)


	}
}


/** This is a function to test the preceeding code to ensure that the next
 * steps are right
 * @author Puran B Kalapala
 */
function puransTesting() {

	// console.log(getHumanReadableArray(giveBinary(127, 10)))
	// console.log(giveBinary(1, 11))
	// console.log(giveBinary(2, 11))
	// console.log(giveBinary(3, 52))
	// console.log(giveBinary(127, 52))

	// console.log(giveBinary(127, 1))
}

/**Will take any decimal number and split it from radix point
 * 
 * @param {Number} inputDecimalNUmber Decimal number  
 * @returns {[]} splitted array of decimal number
 */
function splitNumberFromRadixPoint(inputDecimalNUmber) {
	let stringFromatNumber = inputDecimalNUmber.toString()
	let splittedNumberArray = stringFromatNumber.split('.')
	splittedNumberArray[1] = "0." + splittedNumberArray[1]
	for(let i=0;i<splittedNumberArray.length;i++){
		splittedNumberArray[i] = parseFloat(splittedNumberArray[i])
	}
	return splittedNumberArray
}

// console.log(splitNumberFromRadixPoint(3));




/**
 * 
 * @param {Number} inputFloatNumber decimal number after radix point
 * @returns {[Number]} array of number representating binary 
 */
function handelAfterRadixPointNumber(inputFloatNumber){

	// while the number not become 1 or after some iterations 
	// multiply by 2 and check for the floor part and append in resultant
	let iterationCount = 0
	let resultant = []
	while(inputFloatNumber!=1 && iterationCount!=10){
		inputFloatNumber = inputFloatNumber * 2
		resultant.push(Math.floor(inputFloatNumber))
		if(inputFloatNumber>1){
			inputFloatNumber = inputFloatNumber -1
		}
		iterationCount++

	}
	return resultant
}


/**Convert decimal number to JS number representation
 * 
 * @param {Number} inputDeciamlNumber decimal number 
 */
function getJSNumberRepresentation(inputDeciamlNumber) {
	// check if number is negative 
	// if negative make number positive and store a flag for future
	let flag = 0
	if (Math.sign(inputDeciamlNumber) == -1) {
		inputDeciamlNumber = -(inputDeciamlNumber)
		flag = -1
	}
	
		// first split the number from radix point 
		// then calculate the binary of each part separatly
		// merge and convert it into normal form
		let splitted = splitNumberFromRadixPoint(inputDeciamlNumber)

		// for left part
		let beforeRedixPointNumber = giveBinary(splitted[0])

		// for right part
		let afterRadixPointNumber = handelAfterRadixPointNumber(splitted[1])


		// store the length of beforeRadixPointNumber so that we know where to add '.'
		let lengthTillRadixPoint = beforeRedixPointNumber.length

		// combined the array so that  2's complementary can be done
		let combinedBinaryNumber = [...beforeRedixPointNumber,...afterRadixPointNumber]
		if(flag == -1){
			combinedBinaryNumber = give2sComplement(combinedBinaryNumber)
		}
		

		// now check for first leading one 
		let positionOfLeadingOne 
		for(let i=0;i<combinedBinaryNumber.length;i++){

			if(combinedBinaryNumber[i]===1){
				positionOfLeadingOne = i
				break

				
			}
		}
		// calculate the exponent part 
		let Exponent = (lengthTillRadixPoint-1) - positionOfLeadingOne
		
		// now calculate the binary for the exponent in 11 bit
		let ExponentBinaryArray= getSimple2sComplement(Exponent,11)

		// according to js representation we have exponent first in array
		let jsRepresentation = [...ExponentBinaryArray] 

		//now according to the implicit representation of float we take
		//RHS of most signficant 1 
				
		for(let i=Exponent;i<combinedBinaryNumber.length;i++){
			jsRepresentation.push(combinedBinaryNumber[i])

		}
		// // if the length of array is not in 63 bits the nappend 0 at end
		// // TODO: change the bits to original 
		if(jsRepresentation.length != 16){
			let jsRepresentationLength = jsRepresentation.length
			for(let i=0;i<(16 -jsRepresentationLength);i++){
				jsRepresentation.push(0)
			}
		}

		

		return jsRepresentation
	}


/**
 * 
 * @param {Array<Number} jsRepresentation input js representation
 * @returns {Number} output decimal number
 */
function getNumericFromJSRepresentation(jsRepresentation){
	// get the exponent from the array first
	let Exponent =[]
	for(let i=0;i<11;i++){
		Exponent.push(jsRepresentation[i])
	}
	// converting to decimal
	let ExponentToDecimal = getSimpleDecimalFrom2sComplement(Exponent)

	// taking out mantisa 

	let mantisa = []
	for(let i=11;i<jsRepresentation.length;i++){
		mantisa.push(jsRepresentation[i])
	}
	// before radix point number
	let beforeRedixPointNumber = [1]
	for(let i=0;i<ExponentToDecimal;i++){
		beforeRedixPointNumber.push(mantisa[i])
	}
	// after radix point
	let afterRadixPointNumber = []
	for(let i=ExponentToDecimal;i<mantisa.length;i++){
		afterRadixPointNumber.push(mantisa[i])

	}
	// convert before radix point binary number to decimal
	let decimalNumber = convertToDecimal(beforeRedixPointNumber)
	
	// convert the afterRadixPointNumber to decimal
	let floatPart = 0
	let power = 1/2
	for(let i=0;i<afterRadixPointNumber.length;i++){
		floatPart = power*afterRadixPointNumber[i] + floatPart
		power = power/2

	}
	// add the decimal part
	decimalNumber = decimalNumber+floatPart

	// return the  decimal number
	return decimalNumber




}
		
		


	



// let arr = getSimple2sComplement(-4,11)
// console.log(getSimpleDecimalFrom2sComplement(arr));
// puransTesting()

console.log(getJSNumberRepresentation(3.14));

console.log(getNumericFromJSRepresentation([
	0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 1, 1, 0, 0,
	1, 0, 0, 0, 1, 1, 1,
	1
  ]));