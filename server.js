import config from './config';
import express from 'express';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import bodyParser from 'body-parser';

const server = express();
server.use(bodyParser.json());

server.use(sassMiddleware({
    src:path.join(__dirname, 'sass'),
    dest:path.join(__dirname, 'public')
}));

server.set('view engine', 'ejs');

// server.get('/', (req,res) => {
//     res.send('Hello Express');
// });

import serverRender from'./serverRender';

server.get(['/', '/contest/:contestId'], (req,res) => {
    serverRender(req.params.contestId).
    then(({initialMarkup,initialData}) => {
        res.render('index', {
            initialMarkup,
            initialData
        });
    }).catch(error => {
        console.error(error)
        res.status(404).send('Bad Request');
    })
});

server.use(express.static('public'));
server.use('/api', apiRouter);

// server.get('/about.html', (req, res) => {
//     fs.readFile('./about.html', (err, data) =>{
//         res.send(data.toString());
//     });
// })

server.listen(config.port, config.host, () => {
    console.info('Express listening on port ', config.port)
});