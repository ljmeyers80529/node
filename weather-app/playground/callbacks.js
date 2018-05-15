var getUser = (id, callback) => {
    var user = {
        id: id,
        name: "me"
    };
    setTimeout(() => {
        callback(user);
    }, 3000);
};

getUser(1, (userObj) => {
    console.log(userObj);
});