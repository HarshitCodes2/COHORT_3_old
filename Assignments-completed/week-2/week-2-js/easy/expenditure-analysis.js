/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {

    let temp = {};

    for(let i = 0; i < transactions.length; i++){
        let cat = transactions[i].category;
        let pri = transactions[i].price;
        if(temp[cat] == undefined){
            temp[cat] = pri;
        }
        else{
            temp[cat] += pri;
        }
    }
    
    let ans = [];

    for(const property in temp){
        ans.push({
            "category" : property,
            "totalSpent" : temp[property]
        })
    }

    console.log(ans);
    return ans;
}

// calculateTotalSpentByCategory([
//     {
// 		id: 1,
// 		timestamp: 1656076800000,
// 		price: 10,
// 		category: 'Food',
// 		itemName: 'Pizza',
//     },
//     {
// 		id: 1,
// 		timestamp: 1656076800000,
// 		price: 10,
// 		category: 'Food',
// 		itemName: 'Pizza',
//     },
//     {
// 		id: 1,
// 		timestamp: 1656076800000,
// 		price: 10,
// 		category: 'Clothes',
// 		itemName: 'Pizza',
//     },
//     {
// 		id: 1,
// 		timestamp: 1656076800000,
// 		price: 10,
// 		category: 'Clothes',
// 		itemName: 'Pizza',
//     },
//     {
// 		id: 1,
// 		timestamp: 1656076800000,
// 		price: 10,
// 		category: 'Clothes',
// 		itemName: 'Pizza',
//     }
// ])

module.exports = calculateTotalSpentByCategory;
