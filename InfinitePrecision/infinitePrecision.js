/* Class-based implementation of an infinite precision Integer. */

class InfiniteNumber {

	/** An internal member Array to contain the digits of the Infinite Integer.
	 * @private
	 * @type {Array<Number>}
	 */
	_internalArray = []

	constructor(inputObject) {

		if (typeof inputObject === "number") {
			if (inputObject % 1 != 0) {
				return new Error("Only integers are allowed")
			}
			else if (inputObject < 0) {
				return new Error("Cannot handel negative data")
			}
			let tempArray = []
			if (inputObject == 0) {
				tempArray = [0]
			}
			else {
				while (inputObject != 0) {
					tempArray.unshift((inputObject % 10))
					inputObject = inputObject / 10
				}
			}

			// deep copy 
			
			// console.log("You sent a number")
			
			// TODO validate the number and only then initialize the _internalArray
			
			// initialize the member array
			this._internalArray = [...tempArray]
			

		} else if (typeof inputObject === "string") {
			// console.log("You sent a String")

			// TODO validate the String and only then initialize the _internalArray
			let tempArray = []
			if(parseFloat(inputObject)===NaN){
				return new Error("Only number string are allowed")
			}
			else if((parseFloat(inputObject))%1!=0){
				return new Error("Only integer are allowed")
			}
			else{
				if(parseInt(inputObject)==0){
					tempArray = [0]
				}
				else{
					inputObject = parseInt(inputObject)

					while (inputObject != 0) {
						tempArray.unshift((inputObject % 10))
						inputObject = inputObject / 10
					}
			}

			}
			// initialize the member array
			this._internalArray = [...tempArray]


		

		} else if (typeof inputObject === "object") {  
			if(Array.isArray(inputObject)){
				for(let i=0;i<inputObject.length;i++){
					if(typeof inputObject[i]!='number'){
						return new Error("Only number in array are allowed")

					}
					
					
					else if(inputObject[i]%1!=0){
						return new Error("Only integers array are allowed")
					}
					else if(inputObject[i]<0){
						return new Error("Only positive integers are allowed")
					}
					
				}
				this._internalArray = [...inputObject]
			}
			else{
				let tempArray = []
				for (const key in inputObject) {
					if (Object.hasOwnProperty.call(object, key)) {
						const element = object[key];
						if(typeof element !='number'){
							return new Error ("Only number in array are allowed")
						}
						else if(element%1!=0){
							return new Error("Only integers array are allowed")
						}
						else if(element<0){
							return new Error("Only positive integers are allowed")
						}
						tempArray.unshift(element)
						
					}
				}
				this._internalArray = [...tempArray]
			}

			

			// TODO check if this object has getInternalArray() and make a deep copy
			// and assign it to local _internalArray

			// initialize the member array
			

		} else {        
			

			throw new Error(`Constuctor of IniniteNumber does not support this data`
				+ ` type ${typeof inputObject}`)
		}

	}

	/** Helper method to return the _internalArray variable which contains the
	 * Inifnite precision Integer.
	 * @returns {Array<Number>} the internal array representing individual digits
	 */
	getInternalArray() {
		// TODO
		return this._internalArray
	}

	/** Helper method to return the representation of this Infinite Precision
	 * 
	 * 
	 */
	getNumberAsString() {
		// TODO, concatenate the contents of _internalArray to a string and return
		let currentArray = this.getInternalArray()
		numberString = ""
		for (const i of currentArray ) {
			numberString +=i
		}
		return numberString
	}

}