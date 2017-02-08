function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function newRandomizer() {
    let funcSwap = function(matrix, loc1, loc2){
        loc1 = [loc1[0]-1, loc1[1] -1];
        loc2 = [loc2[0]-1, loc2[1]-1];
        let temp = matrix[loc1[0]][loc1[1]];
        matrix[loc1[0]][loc1[1]]= matrix[loc2[0]][loc2[1]];
        matrix[loc2[0]][loc2[1]] = temp;
        loc2 = [loc2[0]+1, loc2[1]+1];
        return [matrix, loc2];
    };
    
    let matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
    let currLoc = [4, 4];
    for( let totalRandomMoves = 300;totalRandomMoves > 0; totalRandomMoves--) {
        let allowedMoves = 5;
        allowedMoves -= currLoc[0] == 1 || currLoc[0] == 4;
        allowedMoves -= currLoc[1] == 1 || currLoc[1] == 4;
        let randomMove = getRandomInt(1, allowedMoves );
        if(currLoc[0] !== 1) {
            randomMove--;
            if(randomMove === 0){
                [matrix, currLoc] = funcSwap( matrix, currLoc, [currLoc[0]-1,currLoc[1]]);
                continue;
            }
        }
        if(currLoc[0] !== 4) {
            randomMove--;
            if(randomMove === 0){
                [matrix, currLoc] = funcSwap( matrix, currLoc, [currLoc[0]+1,currLoc[1]]);
                continue;
            }
        }
        if(currLoc[1] !== 1) {
            randomMove--;
            if(randomMove === 0){
                [matrix, currLoc] = funcSwap( matrix, currLoc, [currLoc[0],currLoc[1]-1]);
                continue;
            }
        }
        if(currLoc[1] !== 4) {
            randomMove--;
            if(randomMove === 0){
                [matrix, currLoc] = funcSwap( matrix, currLoc, [currLoc[0],currLoc[1]+1]);
            }
        }
    }
}

function randomizer(){
    let flags = [], locZero = [], count = 0;
    // Should set up the matrix and location Zero
    let matrix = [[],[],[],[]];
    flags[15] = false;
    for(let index=0; index < 16; index++){
        // As the number is [0,1)
        let randomNo = getRandomInt(1, 17 - index );
        let indexArray = 0;
        while(randomNo > 0) {
            if(! flags[indexArray] ){
                randomNo--;
            }
            indexArray++;                                                                                                                            
        }                                                                                                                                            
        // Allocate at indexArray -1 location                                                                                                        
        flags[indexArray - 1] = true;
        matrix[Math.floor(index/4)][index%4] = indexArray;
        if( indexArray === 1) {
            locZero.push( Math.floor(index/4), index%4 );
        }
        if( indexArray === index + 1 ) {
            count++;
        }
    }
    return [matrix, locZero, count];
}

function getIndex( x, y) {
    return x*4 + y + 1;
}

function swap( matrix, loc1, loc2, count) {
    let index1 = getIndex( loc1[0], loc1[1] ), index2 = getIndex( loc2[0], loc2[1] );
    let identifier = 'l';
    let docElem1 = document.getElementById(identifier + (index1).toString());
    let docElem2= document.getElementById(identifier + (index2).toString());
    docElem1.innerHTML = matrix[ loc2[0] ][ loc2[1] ];
    docElem2.innerHTML = matrix[ loc1[0] ][ loc1[1] ];
    
    if( matrix[loc1[0]][loc1[1]] === loc1[0]*4 + loc1[1] + 1) {
        count--;
    }
    if( matrix[loc2[0]][loc2[1]] === loc2[0]*4 + loc2[1] + 1) {
        count--;
    }
    if( matrix[loc1[0]][loc1[1]] === loc2[0]*4 + loc2[1] + 1) {
        count++;
    }
    if( matrix[loc2[0]][loc2[1]] === loc1[0]*4 + loc1[1] + 1) {
        count++;
    }

    let temp = matrix[loc1[0]][loc1[1]];
    matrix[loc1[0]][loc1[1]] = matrix[loc2[0]][loc2[1]];
    matrix[loc2[0]][loc2[1]] = temp;
    if( matrix[loc1[0]][loc1[1]] === index1) {
        docElem1.setAttribute('bgcolor', '00FF00');
    } else { 
        docElem1.setAttribute('bgcolor', 'FF0000');
    }
    docElem2.setAttribute('bgcolor', '0000FF');
    return [ matrix, loc2, count];
}

function handleUp( matrix, locZero, count ){
    if( locZero[0] === 0 ) {
        return [ matrix, locZero, count ];
    }
    return swap(matrix, locZero, [locZero[0] - 1, locZero[1]], count);
}

function handleLeft( matrix, locZero, count ){
    if( locZero[1] === 0 ) {
        return [ matrix, locZero, count ];
    }
    return swap(matrix, locZero, [locZero[0], locZero[1]-1], count);
}

function handleRight( matrix, locZero, count ){
    if( locZero[1] === 3 ) {
        return [ matrix, locZero, count ];
    }
    return swap( matrix, locZero, [locZero[0], locZero[1] + 1], count);
}

function handleDown( matrix, locZero, count ){
    if( locZero[0] === 3 ) {
        return [ matrix, locZero, count ];
    }
    return swap(matrix, locZero, [locZero[0] + 1, locZero[1]], count);
}

function display( matrix ) {
    console.log('Current matrix state');
    let arr = [0,1,2,3];
    for( let i of arr){
        let row = '';
        for( let j of arr ){
            if( matrix[i][j] < 10 ) {
                row += ' ';
            }
            row += matrix[i][j] + ' ';
        }
        console.log(row);
    }
}

function updateMatrix( matrix ) {
    let identifier = 'l';
    for(let index = 0;index<16; index++) {
        let docElem = document.getElementById(identifier + (index+1).toString());
        docElem.innerHTML = matrix[Math.floor(index/4)][index%4];
        if(matrix[Math.floor(index/4)][index%4] === 1) {
            docElem.setAttribute('bgcolor','0000FF');
        } else if(matrix[Math.floor(index/4)][index%4] === index + 1) {
            docElem.setAttribute('bgcolor','00FF00');
        } else {
            docElem.setAttribute('bgcolor','FF0000');
        }
    }
}

var matrix;
var locZero;
var count = 0;

function onLoad() {
    [matrix, locZero, count] = randomizer();
    updateMatrix( matrix );
    display(matrix);
}

document.onkeydown = function(e) {
    let funcLookup = {
        37: handleLeft,
        38: handleUp,
        39: handleRight,
        40: handleDown
    };
    let keyvalue = e.keyCode.toString();
    if( keyvalue in funcLookup ){
        [matrix, locZero, count] = funcLookup[keyvalue]( matrix, locZero, count );
        display(matrix);
        if( count === 16) {
            alert("WIN!!");
        }
    }
}

