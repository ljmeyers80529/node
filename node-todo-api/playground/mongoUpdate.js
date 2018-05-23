const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.', err); // use return to keep rest of function from executing.
    }
    console.log('Connected...');
    db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5b04999cf53ff72858892056")
    // }, {
    //     $set: { complete: true }
    // }, { returnOriginal: false }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        name: 'MeX X'
    }, {
        $set: { name: 'Me' },
        $inc: { age: -1 }
    }, { returnOriginal: false }).then((result) => {
        console.log(result);
    });

    // client.close();
});