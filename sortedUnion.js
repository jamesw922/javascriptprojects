function uniteUnique(arr) {
    let args = [].concat(...arguments);
    let setX = new Set(args);
    let newArr = [...setX];
    
    console.log(setX);
    console.log(newArr);
    return newArr;
}
  
  uniteUnique([1, 3, 2], [1, [5, [7]]], [2, [4]]);