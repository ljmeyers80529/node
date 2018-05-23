const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.', err); // use return to keep rest of function from executing.
    }
    console.log('Connected...');
    db = client.db('TodoApp');

    // deleteMany

    // db.collection('Todos').deleteMany({ text: 'Something to do' }).then((result) => {
    //     console.log(result);
    // });

    // deleteOne

    // db.collection('Todos').deleteOne({ text: 'Yet, Something to do' }).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete

    // db.collection('Todos').findOneAndDelete({ complete: false }).then((result) => {
    //     console.log(result); // returns deleted record in the results object.
    // });


    db.collection('Users').deleteMany({ name: 'Me' }).then((result) => {
        console.log(result);
    });


    db.collection('Users').findOneAndDelete({ _id: new ObjectID("5b049987e66a701f64b1bd5d") }).then((result) => {
        console.log(result); // returns deleted record in the results object.
    });


    // client.close();
});