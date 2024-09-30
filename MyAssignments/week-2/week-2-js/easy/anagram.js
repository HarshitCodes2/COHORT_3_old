/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
    const anaMap = new Map();

    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    if(str1.length != str2.length){
        return false;
    }

    for(let i = 0; i < str1.length; i++){
        let val = anaMap.get(str1[i]);
        if(val == undefined){ val = 0;}
        anaMap.set(str1[i], (val + 1));
    }
    for(let i = 0; i < str2.length; i++){
        let val = anaMap.get(str2[i]);
        if(val == undefined){ val = 0;}
        anaMap.set(str2[i], (val - 1));
    }

    for (let value of anaMap.values()) {
        if (value != 0){
            return false;
        }
    }

    return true;
}



module.exports = isAnagram;
