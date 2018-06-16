// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// get an Mongo objectID
// var objID = new ObjectID();
// console.log(objID);

// destructure on object:
// var user = { name: 'Me', age: 56 };
// var { name } = user;
// console.log(name);



MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.', err); // use return to keep rest of function from executing.
    }
    console.log('Connected...');
    db = client.db('TodoApp');

    // // retriave everything.
    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch', err);
    // });


    // // retriave if completed is true.
    // db.collection('Todos').find({ complete: true }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch', err);
    // });

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch', err);
    });


    db.collection('Users').find({ name: 'Me' }).count().then((count) => {
        console.log(`Users count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch', err);
    });


    // client.close();
});