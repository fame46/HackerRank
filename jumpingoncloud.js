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

function findPaths(c, paths) {
     if (c.length > 1) {
          let path1 = paths.slice();
          let path2 = paths.slice();

          path1 = (c[1] !== 1) ? [ ...path1, 1 ] : 0;
          
          path2 = (c[2] !== 1) ? [ ...path2, 2] : 0;
          if (path1 === 0 && path2 === 0) {
               paths = 0;
          } else if (path1 !== 0 && path2 === 0) {
               return findPaths(c.slice(1), path1);
          } else if (path1 === 0 && path2 !== 0) {
               return findPaths(c.slice(2), path2); 
          } else if (path1 !== 0 && path2 !== 0) {
               path1 = findPaths(c.slice(1), path1);
               path2 = findPaths(c.slice(2), path2);
               return (path1.length < path2.length) ? path1 : path2;
          } 
     }
      
     return paths;
}

// Complete the jumpingOnClouds function below.
function jumpingOnClouds(c) {
    const min = 2;
     const max = 100;
     let jumps = 0;
     if (c.length >= min && c.length <= max) {
          jumps = findPaths(c, []);
     }
     return ((typeof jumps === "number") ? jumps : jumps.length);

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = jumpingOnClouds(c);

    ws.write(result + "\n");

    ws.end();
}
