import express from 'express';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';


let mdb;
MongoClient.connect(config.mongodbUri, (err, client) =>{
    assert.equal(null, err);

    mdb = client.db('test');
});

const router = express.Router();

router.get('/contests', (req, res) =>{
    let contests = {}; 
    mdb.collection('contests').find({})
        .each((err, contest) =>{
            assert.equal(null,err);            

            if(!contest){// no more contests
                res.send(contests);
                return;
            }
            contests[contest.id] = contest;
        });
});

router.get('/contests/:contestId', (req, res) =>{
        //req.params.contestId
    
});

export default router;