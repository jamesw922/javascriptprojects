const numberInput = document.querySelector('#number-input'),
      formSub = document.querySelector('#form');
var answer = "";
var output = document.querySelector('#output');
    
function convertToRoman(num) {
    let ones = {
        1: "I",
        2: "II",
        3: "III",
        4: "IV",
        5: "V",
        6: "VI",
        7: "VII",
        8: "VIII",
        9: "IX",
    };
    let tens = {
        10: "X",
        20: "XX",
        30: "XXX",
        40: "XL",
        50: "L",
        60: "LX",
        70: "LXX",
        80: "LXXX",
        90: "XC",
    };
    let cents = {
        100: "C",
        200: "CC",
        300: "CCC",
        400: "CD",
        500: "D",
        600: "DC",
        700: "DCC",
        800: "DCCC",
        900: "CM"
    };
    let mils = {
        1000: "M",
        2000: "MM",
        3000: "MMM"
    };
    
    let figure = num.split('');
    let s;
    let x;
    let c;
    let m;

    if (num < 10) {
        answer = ones[num];
    } else if (num > 9 && num < 100) {
        if (figure.indexOf('0') > -1) {
            answer = tens[num];
        } else {
            x = figure[0];
            s = figure[1];
            x = parseInt(x) * 10;
            s = parseInt(s);
            answer = tens[x] + ones[s];
          }
        } else if (num > 99 && num < 1000) {
            if (figure[1] === '0' && figure[2] === '0') {
            answer = cents[num];
            } else {
                c = figure[0];
                x = figure[1];
                s = figure[2];
                c = parseInt(c) * 100;
                x = parseInt(x) * 10;
                s = parseInt(s);
                answer = cents[c] + tens[x] + ones[s];
            }
        } else {
            if (num === 1000 || num === 2000 || num === 3000) {
            answer = mils[num];
            } else {
            m = figure[0];
            c = figure[1];
            x = figure[2];
            s = figure[3];
            m = parseInt(m) * 1000;
            c = parseInt(c) * 100;
            x = parseInt(x) * 10;
            s = parseInt(s);
            answer = mils[m] + cents[c] + tens[x] + ones[s];
            }
        }
    answer = answer.replace(/undefined/g , '');    
    
    if (answer !== "") {
       displayRomNum(`${answer}`); 
    }
    return answer;
}

formSub.addEventListener('submit', function(e){
    e.preventDefault();
    if (formSub.reportValidity()){
        convertToRoman(numberInput.value);
    } 
});

function displayRomNum(str) {
    output.textContent = str;
}