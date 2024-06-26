const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
const bodyParser = require('body-parser');
const CreateUser = require('./routes/CreateUser');
const ItemManagement = require('./routes/ItemManagement')
require('./DBconnect');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.use(CreateUser);
app.use('/item',ItemManagement);

app.listen(3001); 