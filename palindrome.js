let str;
function palindrome(str) {
    let newStr = str.toLowerCase();
    newStr = newStr.replace(/[^0-9a-zA-Z]/g, '');
    let revStr = newStr.split('').reverse().join('');
    
    if (newStr === revStr) {
      return true;
    } else {
      return false;
    } 
}

palindrome("satanoscillatemymetallicsonatas");