// let fs = require('fs')

// // asynchronous read 
// fs.readFile('input.txt',function(err,data){
//     if(err){
//         return console.log(err);
//     }
//     console.log("Asynchronus read: " +data.toString());
// })

// // synchronous read 
// let data1 = fs.readFileSync('input.txt')
// console.log("synchronous read: " + data1.toString());




// // Asynchronous - Opening File
// console.log("opening file!");
// fs.open('input.txt', 'r+', function(err, fd) {
// if (err) {
// 	return console.error(err);
// }
// console.log("File open successfully");	 
// });



// var buf = new Buffer(1024);

// console.log("opening an existing file");
// fs.open('input.txt', 'r+', function(err, fd) {
// if (err) {
// 	return console.error(err);
// }
// console.log("File opened successfully!");
// console.log("reading the file");
	
// fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
// 	if (err){
// 		console.log(err);
// 	}
// 	console.log(bytes + " bytes read");
	
// 	// Print only read bytes to avoid junk.
// 	if(bytes > 0){
// 		console.log(buf.slice(0, bytes).toString());
// 	}
// });
// });


// var fs = require("fs");

// console.log("writing into existing file");
// fs.writeFile('input.txt', 'Geeks For Geeks', function(err) {
// if (err) {
// 	return console.error(err);
// }
	
// console.log("Data written successfully!");
// console.log("Let's read newly written data");
	
// fs.readFile('input.txt', function (err, data) {
// 	if (err) {
// 		return console.error(err);
// 	}
// 	console.log("Asynchronous read: " + data.toString());
// });
// });


// var fs = require('fs');

// var data = "\nLearn Node.js";

// // Append data to file
// fs.appendFile('input.txt', data, 'utf8',

// 	// Callback function
// 	function(err) { 
// 		if (err) throw err;

// 		// If no error
// 		console.log("Data is appended to file successfully.")
// });


// var fs = require('fs');

// var ddd = "\nLearn Node.js";

// // Append data to file
// fs.appendFileSync('input.txt', ddd, 'utf8');
// console.log("Data is appended to file successfully.")


// // Close the opened file.
// fs.close(fd, function(err)) {
//     if (err) {
//         console.log(err);
//     } 
//     console.log("File closed successfully.");
//     }
    
//     var fs = require("fs");

//     console.log("deleting an existing file");
//     fs.unlink('input.txt', function(err) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("File deleted successfully!");
//     });

let fs = require('fs').promises
const myObject = {
    name: 'Sagar',
    age: 22,
    city: 'Hyderabad',
  };
const jsonString = JSON.stringify(myObject,null,2);
const filePath = 'input.txt';


async function writeObjectToFile() {
  try {
    await fs.writeFile(filePath, jsonString);
    console.log('Object successfully written to file!');
  } catch (err) {
    console.error(`Error writing to file: ${err.message}`);
  }
}

writeObjectToFile();