// Function to handle the send button click
async function handleSend() {
    const inputElement = document.querySelector('.inputUrl').value;
    // console.log(inputElement.value);

    // call fetch api
    const response = await fetch(inputElement, {
        method: "GET",
        mode: "cors"
    })
    const data = await response.json()
    let objectdata = data[0]
    console.log(data);
    let responseoutput = document.querySelector('.response')
    responseoutput.value = ''
    responseoutput.value = '{\n'
    for (const i in objectdata) {
        if (Object.hasOwnProperty.call(objectdata, i)) {
            const element = objectdata[i];
            responseoutput.value += `${i} : ${element} \n`

        }
    }
    responseoutput.value += '\n}'

}
// let previousKeyInput = ''; // Variable to store the previous value of .key

// function handelInput() {
//     const inputKeyElement = document.querySelector('.inp');
//     const urlText = document.querySelector('.inputUrl');

//     // Get the current input value
//     const currentInputValue = urlText.value;



//     // Calculate the difference between the new input and the previous input
//     const diff = getDifference(inputKeyElement.value, previousKeyInput);

//     // If the input is a deletion, remove characters from .inputUrl
//     if (diff.startsWith('-')) {
//         // Remove the deleted characters from .inputUrl
//         const deletedChars = diff.slice(1); // Exclude the '-' indicating deletion
//         const lastIndexOfDeletedChars = currentInputValue.lastIndexOf(deletedChars);

//         if (lastIndexOfDeletedChars !== -1) {
//             urlText.value = currentInputValue.substring(0, lastIndexOfDeletedChars);
//         }
//     } else {
//         // Append .inputUrl before the new characters from .key
//         urlText.value = currentInputValue + diff;
//     }

//     // Update the previousKeyInput for the next comparison
//     previousKeyInput = inputKeyElement.value;
// }

// // Function to calculate the difference between two strings
// function getDifference(newStr, oldStr) {
//     let diff = '';

//     for (let i = 0; i < newStr.length || i < oldStr.length; i++) {
//         if (newStr[i] !== oldStr[i]) {
//             if (i < oldStr.length) {
//                 diff += '-' + oldStr[i]; // Indicates deletion and append the deleted character
//             } else {
//                 diff += newStr[i];
//             }
//         }
//     }

//     return diff;
// }

// let previousValueInput=''
// function handelValueInput(){
//     const inputKeyElement = document.querySelector('.value');
//     const urlText = document.querySelector('.inputUrl');

//     // Get the current input value
//     const currentInputValue = urlText.value;



//     // Calculate the difference between the new input and the previous input
//     const diff = getDifference(inputKeyElement.value, previousKeyInput);

//     // If the input is a deletion, remove characters from .inputUrl
//     if (diff.startsWith('-')) {
//         // Remove the deleted characters from .inputUrl
//         const deletedChars = diff.slice(1); // Exclude the '-' indicating deletion
//         const lastIndexOfDeletedChars = currentInputValue.lastIndexOf(deletedChars);

//         if (lastIndexOfDeletedChars !== -1) {
//             urlText.value = currentInputValue.substring(0, lastIndexOfDeletedChars);
//         }
//     } else {
//         // Append .inputUrl before the new characters from .key
//         urlText.value = currentInputValue + diff;
//     }

//     // Update the previousKeyInput for the next comparison
//     previousKeyInput = inputKeyElement.value;
// }

document.addEventListener('DOMContentLoaded', function () {
    const inputUrl = document.getElementById('urlInput')
    const queryInput = document.getElementById('inp')
    queryInput.addEventListener('input', function () {
        const queryParams = this.value.trim()
        if (inputUrl.value.includes('?')) {
            const urlWithoutParams = inputUrl.value.split('?')[0]
            inputUrl.value = urlWithoutParams + '?' + queryParams

        }
        else {
            inputUrl.value = inputUrl.value.trim() + '?' + queryParams
        }
    })
})
document.addEventListener('DOMContentLoaded', function () {
    const inputUrl = document.getElementById('urlInput')
    const queryInput = document.getElementById('valueinp')
    queryInput.addEventListener('input', function () {
        const queryParams = this.value.trim()
        if (inputUrl.value.includes('=')) {
            const urlWithoutParams = inputUrl.value.split('=')[0]
            inputUrl.value = urlWithoutParams + '=' + queryParams

        }
        else {
            inputUrl.value = inputUrl.value.trim() + '=' + queryParams
        }
    })
})

function addQuestionMark() {
    const inputdata = document.querySelector('.inputUrl')
    inputdata.value = inputdata.value + '?'
}
function addEqualMark() {
    const inputdata = document.querySelector('.inputUrl')
    inputdata.value = inputdata.value + '='
}