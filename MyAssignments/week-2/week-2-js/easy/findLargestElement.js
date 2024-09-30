/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {

    if(numbers.length == 0){
        return undefined;
    }

    let ans = Number.MIN_SAFE_INTEGER;

    for(let i in numbers){
        if(numbers[i] > ans){
            ans = numbers[i];  
        } 
    }

    return ans;
}

findLargestElement([1, 2, 3, 4, 5, 6,]);

module.exports = findLargestElement;