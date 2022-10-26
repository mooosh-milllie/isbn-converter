# isbn-converter


This package is for ISBN conversion and validation. ISBN 10 can be converted to ISBN 13, vice versa. The project uses the ISBN Standard to verify if an input is indeed an ISBN, this is done by calculating the check number which is the last digit of the ISBN, if it does not match then it is definitely not an ISBN.

The same method stated above is also used to convert, in other to convert it also checks that the input supplied is really an ISBN, if the check number matches then it can be converted, there are other check done as well, like checking if the iSBN starts with **979**, because new ISBN 13 that starts with **979** does not have an equivalent ISBN 10.

ISBN10 and ISBN13 can be validated using the isISBN10 and isISBN13 methods respectively. The project has been tested with all quite a lot of ISBNs and can be used in project for validation and conversions.  

npm install isbn-converter

```
const IsbnConverter = require('isbn-converter');
const convertISBN = new IsbnConverter();

const isISBN10 = convertISBN.isISBN10('0435909886');// true

const isISBN10 = convertISBN.isISBN10('04359098868');//false

const isISBN13 = convertISBN.isISBN13('9780435909888');//true

const isISBN13 = convertISBN.isISBN13('9760435909888');//false

const isbn13ToIsbn10 = convertISBN.convertISBN13To10('9780435909888');//0435909886

const isbn10ToIsbn13 = convertISBN.ConvertISBN10T013('0435909886');//9780435909888
```

I know there are some naming conventions that I didn't follow and I will correct them in version 2.0.0.
Incase any issues are encountered, feel free to leave a report. Happy Coding!