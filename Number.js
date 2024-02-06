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
// console.log(getSimple2sComplement(-3,4));

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
console.log(getSimpleDecimalFrom2sComplement([1,0,1,1]));
/** Convert the binary into Decimal number by performing 2's complement
 *  @param {[]} binary binary array
 * @returns {Number} decimal representation
 * @throws 
 */
function getSimpleDecimalFrom2sComplement(binary) {
	// check if the number is negative by it's MSB
	if (binary[0] == 0) {

		return convertToDecimal(binary)
	}
	// if negative then first perform 2's complement and return negative number
	else {
		give2sComplement(binary)

		return -convertToDecimal(binary)


	}
}


/** This is a function to test the preceeding code to ensure that the next
 * steps are right
 * @author Puran B Kalapala
 */
function puransTesting() {

	console.log(getHumanReadableArray(giveBinary(127, 10)))
	// console.log(giveBinary(1, 11))
	// console.log(giveBinary(2, 11))
	// console.log(giveBinary(3, 52))
	// console.log(giveBinary(127, 52))

	// console.log(giveBinary(127, 1))
}

/**
 * 
 * @param {Number} value Decimal number  
 * @returns {[]} splitted array of decimal number
 */
function splitNumberFromRadixPoint(value) {
	let integerPart = Math.floor(value)
	let decimalPart = value - integerPart
	return [integerPart, decimalPart]
}

// console.log(splitNumberFromRadixPoint(3.143));




/**Convert decimal number to JS number representation
 * 
 * @param {Number} value decimal number 
 */
function getJSNumberRepresentation(value) {
	if (Math.sign(value) == 0) {

	}
	else {
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
// puransTesting()