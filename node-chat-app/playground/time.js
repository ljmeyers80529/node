var moment = require('moment');

var date = moment();
console.log(date.format('MMM Do, YYYY'));

var doy = parseInt(date.format('DDD'), 10);
console.log('DOW: ', doy);

if (typeof(doy) === 'number') {
    console.log('Correct, a number');
} else {
    console.log('Incorrect, not a number');
}