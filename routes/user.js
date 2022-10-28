const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = require('../secret');
const Logger = require("../utils/loger");
const logger = new Logger();


MongoClient.connect(url, (err, db) => {
    if (err){
        throw err
    }
       
    console.log("connected to Mongodb server");
    db.close();
})

const client = new MongoClient(url, {

    useNewUrlParser: true,
    useUnifiedTopology: true

})

const User = client.db('people').collection('friends');
//get users
module.exports.getUsers = (req, res) => {
    logger.info('GET ALL USERS')
    User.find().toArray().then(results => {
        // console.log(results);
        logger.info('RESPONSE', JSON.stringify(results))
        res.send(JSON.stringify(results));
    })
}

module.exports.storeUser = (req, res) => {
    logger.info('STORE USER IN DATABASE', JSON.stringify(req.body))
    if (req.body==null){
        console.log("hello")
        res.writeHead(500, {'Content-Type': 'text/event-stream'});
    
    }
    User.insertOne(req.body).then(results => {
        //  console.log(results);
        logger.info('RESPONSE', JSON.stringify(results))
        res.contentType('application/json');
        res.send(JSON.stringify(req.body));
    })
}


module.exports.getUser = (req, res) => {
    logger.info('GET METHOD', JSON.stringify(req.params))
    // console.log(req.params);
    User.find(req.params).toArray().then(results => {
        // console.log(results);
        logger.info('Response', JSON.stringify(results))
        res.send(JSON.stringify(results));
    })
}

module.exports.deleteUser = (req, res) => {
    logger.info('DELETE USER FROM DATABASE', JSON.stringify(req.body))

    User.deleteOne({

        _id: ObjectId(req.body._id)
    }).then(results => {
        logger.info('RESPONSE', JSON.stringify(results))

        let status = 200;
        if (results.deletedCount == 0) {
        
            res.status(500).send({message:"failed to delete"})

        }
        res.send({ status })
        logger.info('STATUS', status)
    }).catch(error => {

        logger.error('ERROR', JSON.stringify(error))
        throw error
    })
}


module.exports.updateUser = (req, res) => {
    // console.log(req.body);
    logger.info('UPDATE USER IN DATABASE', JSON.stringify(req.body))
    User.findOneAndUpdate({
        _id: ObjectId(req.body._id)
    }, {
        $set: {
            name: req.body.name
        }
    }, { upsert: false }).then(results => {
        // console.log(results);
        logger.info('RESPONSE', JSON.stringify(results))
        res.send(JSON.stringify(results));
    })
}

