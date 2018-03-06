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
  let sum;
  let operator;
  let miniExp;
  let newArg;
  let newExpArr;

  // we need to start operations on the last numbers first, so reversing makes this easier.
  let reversedExp = exp.split(' ').reverse().join(' ');
  // look ahead verifies negative numbers are not included in the match
  let matchResult = reversedExp.match(/(\+|-)(?=(\s))/);
  // encapsulate this behavior to use in if and else if conditions below
  const mathPlusNewExp = (result, exp) => {
    // identify math operator
    operator = result;
    // collect numbers to operate with in an array
    miniExp = exp.split(" ").reverse().slice(0, exp.split(" ").reverse().indexOf(operator));
    // evaluate the operation expression
    sum = miniExp.reduce((prev, current) => eval(`${current} ${operator} ${prev}`));
    // create new array with 1 less operator, with sum of operation expression in its place
    return [...exp.split(' ').reverse().slice(exp.split(" ").reverse().indexOf(operator) + 1).reverse(), sum];
  }
  // proceed if the above is not null
  if (matchResult) {
    newExpArr = mathPlusNewExp(matchResult[0], exp);
    // format new expression array to then pass as argument in recursion call
    newArg = newExpArr.join(" ");
    return expEval(newArg);
  // if matchResult is null but there is only 1 operator left, the above regex won't work bc of the lookahead, so check the non-reversed version, repeat each line of the above
  } else if (exp.match(/(\+|-)(?=(\s))/)) {
    newExpArr = mathPlusNewExp(exp.match(/(\+|-)(?=(\s))/)[0], exp);
    // if length > 1, that means there is more to evaluate
    if (newExpArr.length > 1) {
      newArg = newExpArr.join(" ");
      return expEval(newArg);
    } else {
    // if we wind up here, that means there are no operators left to use and we have found our total
      return sum;
    }
  } else {
    // if we wind up here, we weren't given an operator and we just display the number given
    return parseInt(exp);
  }
}
// test expression string
console.log(expEval("+ 5 - 5 + 22 - 100 + 200 - 10000 5555"))
