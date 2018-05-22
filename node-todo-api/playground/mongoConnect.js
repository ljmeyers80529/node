const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.', err); // use return to keep rest of function from executing.
    }
    console.log('Connected...');
    db = client.db('TodoApp');

    db.collection('Todos').insertOne({ // add to todos collection.
        text: 'Something to do',
        complete: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    });

    db.collection('Users').insertOne({ // add to users collection.
        name: 'Me',
        age: 57,
        location: 'Fresno, ca'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    });

    client.close();
});