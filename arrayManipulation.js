'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the arrayManipulation function below.
function arrayManipulation(n, queries) {
    const arr = Array(n + 1);
    let maxValue = 0,
    currentNumber = 0;
    queries.forEach(([startRange, endRange, value]) => {
            arr[startRange] = arr[startRange] || { start: 0, end: 0 };
            arr[endRange] = arr[endRange] || { start: 0, end: 0 };
            arr[startRange].start += value;
            arr[endRange].end += value;
     });
    arr.forEach((cell) => {
       if (cell) {
            currentNumber += cell.start;
            if (currentNumber > maxValue) {
                maxValue = currentNumber;
            }
            currentNumber -= cell.end;
        }
    });
    return maxValue;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    let queries = Array(m);

    for (let i = 0; i < m; i++) {
        queries[i] = readLine().split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    let result = arrayManipulation(n, queries);

    ws.write(result + "\n");

    ws.end();
}
