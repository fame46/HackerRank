'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the checkMagazine function below.
function checkMagazine(magazine, note) {
    let magDict = {};
    let works = '';

    //Populate magDict with words from the magWordArr
    for (let i = 0; i < magazine.length; i++){
        let word = magazine[i];
        magDict[word] = magDict[word] ? magDict[word] + 1 : 1; 
    }

    //Loop through the note and compare with magazine object
    for (let i = 0; i < note.length; i++){
        //magDict has the word needed for the note
        if (!(note[i] in magDict)) {
            works = 'No';
            break;
        } else {
            //In the magDict
            if (magDict[note[i]] < 1) {
                works = 'No'
                break;
            }
            //Subtract one from the number of words in dict
            magDict[note[i]] = magDict[note[i]] - 1;
        }
    }
    if (works === '') { works = 'Yes' }
    console.log(works);

}

function main() {
    const mn = readLine().split(' ');

    const m = parseInt(mn[0], 10);

    const n = parseInt(mn[1], 10);

    const magazine = readLine().split(' ');

    const note = readLine().split(' ');

    checkMagazine(magazine, note);
}
