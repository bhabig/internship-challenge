'use strict';

/*
formatting assumptions:
  1) if an operator is at the beginning of the string, it is always followed by a space (i.e. "- 5 5")
  2) if a string does not start with an operator, it won't contain any at all based on the formula (i.e. not going to receive something like "5 5" or "5 + 5" or "5 5 +" or even " + 5 5")
  3) operators after the first operator will always be surrounded by spaces (i.e. "- 5 + 2 8")
  4) negative numbers are allowed (i.e. "+ -5 -10")
  5) only the + and - operators will be seen and none of: --, ++, +=, -=
  6) there will always be exactly 2 numbers added together at a time by 1 operator
*/

const expEval = (exp) => {
  let second_sum;
  let first_sum;
  let firstOperator;
  let miniExp;
  let newExpArr;
  let newArg;
  let reversedExp = exp.split(' ').reverse().join(' ');
  // look ahead verifies negative numbers are not included in the match
  let matchResult = reversedExp.match(/(\+|-)(?=(\s))/);
  // proceed if the above is not null
  if (matchResult) {
    firstOperator = matchResult[0];
    miniExp = exp.split(" ").reverse().slice(0, exp.split(" ").reverse().indexOf(firstOperator));
    first_sum = miniExp.reduce((prev, current) => eval(`${current} ${firstOperator} ${prev}`));
    newExpArr = [...exp.split(' ').reverse().slice(exp.split(" ").reverse().indexOf(firstOperator)+1).reverse(), first_sum];
      newArg = newExpArr.join(" ");
      return expEval(newArg);


  } else if (exp.match(/(\+|-)(?=(\s))/)) {
    let secondOperator = exp.match(/(\+|-)(?=(\s))/)[0];
    let miniExp2 = exp.split(" ").reverse().slice(0, exp.split(" ").reverse().indexOf(secondOperator));
    second_sum = miniExp2.reduce((prev, current) => {
      return eval(`${current} ${secondOperator} ${prev}`);
    });
    let newerExpArr = [...exp.split(' ').reverse().slice(exp.split(" ").reverse().indexOf(secondOperator) + 1).reverse(), second_sum];
    if (newerExpArr.length > 1) {
      newArg = newerExpArr.join(" ");
      return expEval(newArg);
    } else {
      return second_sum;
    }
  } else {
    return parseInt(exp);
  }
}

console.log(expEval("+ 5 - 5 + 22 - 100 + 200 - 10000 5555"))
