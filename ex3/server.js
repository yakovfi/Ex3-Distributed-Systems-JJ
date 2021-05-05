const express = require('express'),
    path = require('path'),
    fs = require('fs'),
    cors = require('cors'),
    routers = require('./routes/routes.js');
const port = 3001;

const app = express();
app.use(express.static(__dirname + '/public'));


app.use('/add_location', express.static(path.join(__dirname, 'html/add_location.html')));
app.use('/main', express.static(path.join(__dirname, 'html/index.html')));
app.use('/list_users', express.static(path.join(__dirname, 'html/index.html')));
app.use('/add_user', express.static(path.join(__dirname, 'html/add_user_form.html')));//Upload file add_user_form.html
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/myCss', express.static(path.join(__dirname, 'css')));
app.use('/public', express.static(path.join(__dirname, 'public')));

//restfull 
//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routers);

const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});