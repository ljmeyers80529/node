var square1 = (x) => {
    var result = x * x;
    return result;
};

var square2 = (x) => x * x; // same as above. {} is implied as well as the return.

console.log(square1(9));
console.log(square2(9));

var user1 = {
    name: "me",
    sayHi: () => {
        console.log(`Hi`);
    }
};

var user2 = {
    name: "me",
    sayHi: () => {
        console.log(`Hi, I'm ${this.name}`); // does not work.
    }
};

var user3 = {
    name: "me",
    sayHi: () => {
        console.log(arguments);
        console.log(`Hi, I'm ${this.name}`); // does not work.
    },
    sayHiAlt() {
        console.log(arguments);
        console.log(`Hi, I'm ${this.name}`);
    }
};
user1.sayHi();
user2.sayHi();
user3.sayHiAlt(1, 2, 3);
user3.sayHi(1, 2, 3);