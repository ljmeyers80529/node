var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('Hey, it worked');
        reject("Error, unable to fulfill promise.")
    }, 2500)
});

somePromise.then((message) => {
    console.log('Success ', message);
}, (errorMessage) => {
    console.log('Error: ', errorMessage);
});