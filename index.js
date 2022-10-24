class HandleISBN {

  cleanISBN (isbn) {
    const isbnStr = isbn.toString();
    const formatISBN = isbnStr.replace(/\s+|\-/g,  '');
    return formatISBN;
  }

  #calculateISBN13CheckNum (isbn) {
    const numsToMultiplyWith = '131313131313';
    const listAllMultiplied = [];
    const modularOfIBSN13 = 10;
    
    for (let i = 0; i < numsToMultiplyWith.length; i++) {
      listAllMultiplied.push(parseInt(isbn.charAt(i)) * parseInt(numsToMultiplyWith.charAt(i)));
    }
    const sumAllMutiplied = listAllMultiplied.reduce((acc, val) => acc + val, 0);
    const remainder = sumAllMutiplied % modularOfIBSN13;
  
    if (remainder === 0) {
      return remainder;
    } else {
      const getCheckNum = modularOfIBSN13 - remainder;
      return getCheckNum;
    }
  }

  isISBN13(isbn) {
    const isbnStr = this.cleanISBN(isbn);
    const removedCheckNum = isbnStr.slice(0, 12)
    if (
      (!isbnStr.startsWith('978') && !isbnStr.startsWith('979')) 
      || isbnStr.length !== 13 
      || isNaN(Number(isbnStr))) 
      {
      return false;
    }

    const getCheckNum = this.#calculateISBN13CheckNum(removedCheckNum);
    return getCheckNum === parseInt(isbnStr.slice(-1));
  }

  #calculateISBN10CheckNum(isbnStr) {
    const listAllMultiplied = [];
    let digitsWeight = 10;
    const modularOfIBSN10 = 11;
    for(let i = 0; i < isbnStr.length; i++) {
      listAllMultiplied.push(parseInt(isbnStr.charAt(i)) * digitsWeight);
      digitsWeight--;
    }
    const sumAllMutiplied = listAllMultiplied.reduce((acc, val) => acc + val, 0);
    const allCheckNumDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let result;
    for(let i = 0; i < allCheckNumDigits.length; i++) {
      let addCheckNum = sumAllMutiplied + i;
      if(addCheckNum % modularOfIBSN10 === 0) {
        result = i;
        break;
      }
    }
    return result;
  }

  isISBN10(isbn) {
    const isbnStr = this.cleanISBN(isbn);
    let re = /(?![x])[a-z]$/i;
    const listAllMultiplied = [];
    const removedCheckNum = isbnStr.slice(0, 9)
    let digitsWeight = 10;
    const modularOfIBSN10 = 11;
    if (isbnStr.length !== 10 || re.test(isbnStr) || isNaN(Number(removedCheckNum))) {
      return false;
    }
    if (re.test(isbnStr)) {
      return false;
    }
    
    // Regex matches Aa-Zz except Xx, so when it is false it means the ISBN includes Xx
    // then a check is done to calculate the check sum to see if it equals 10
    const getCheckSum = this.#calculateISBN10CheckNum(removedCheckNum);
    if (re.test(isbnStr) === false && isNaN(Number(isbnStr))) {
      if (getCheckSum === 10) {
        return true;
      }
      return false;
    }

    if (getCheckSum === parseInt(isbnStr.slice(-1))) {
      return true;
    } else {
      return false;
    }
  }

  convertISBN13To10 (isbn) {
    const isbnStr = this.cleanISBN(isbn);
    if (isbnStr.startsWith('979')) {
      throw new Error('Cannot convert ISBN starting with 979')
    }
    if(this.isISBN13(isbnStr)){
      let result;
      let isbnStringToEval = isbnStr.slice(3, 12);
      const checkNumDivider = 11;
    
      const getCheckNum = this.#calculateISBN10CheckNum(isbnStringToEval);
      
      switch(getCheckNum) {
        case 0:
          result = isbnStringToEval + getCheckNum.toString();
          break;
        case 10:
          result = isbnStringToEval + 'X';
          break;
        default:
          const subtractFrmDivider = checkNumDivider - getCheckNum;
          result = isbnStringToEval + subtractFrmDivider.toString()
          break;
      }
      return result
    }
    throw new Error('NOT ISBN 13');
  }

  ConvertISBN10T013 (isbn) {
    const oldIsbn13Prefix = '978';
    const isbnStr = this.cleanISBN(isbn);

    if(this.isISBN10(isbnStr)){
      let isbnStringToEval = oldIsbn13Prefix + isbnStr.slice(0, 9);

      const getCheckNum = this.#calculateISBN13CheckNum(isbnStringToEval);
      let result = isbnStringToEval + getCheckNum.toString();

      return result;
    }
    throw new Error('NOT ISBN 10');
  }
}


module.exports = HandleISBN;