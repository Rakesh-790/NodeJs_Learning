console.log("start");

setTimeout(() => {
    console.log("2");
  }, 1000);

setTimeout(() => {
    console.log("inside timeout");
}, 0);

console.log("end");


const add = require('./math');

console.log(add(2, 3));