const express = require('express'),
    path = require('path'),
    fs = require('fs'),
    cors = require('cors'),
    routers = require('./routes/routes.js');
const port = 3001;
require('./db/mongoose')
// const GuideRouter = require('./routes/Guide')
const TourRouter = require('./routes/Tour')


const app = express();
app.use(express.static(__dirname + '/public'));

app.use('/add_location/id', express.static(path.join(__dirname, 'html/add_location.html')));
app.use('/main', express.static(path.join(__dirname, 'html/index.html')));
app.use('/list_users', express.static(path.join(__dirname, 'html/index.html')));
app.use('/update_tour/id', express.static(path.join(__dirname, 'html/update_data.html')));
app.use('/add_tour', express.static(path.join(__dirname, 'html/createTour.html')));//Upload file add_user_form.html
app.use('/add_guide', express.static(path.join(__dirname, 'html/createGuide.html')));//Upload file add_user_form.html
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/myCss', express.static(path.join(__dirname, 'css')));
app.use('/public', express.static(path.join(__dirname, 'public')));

//restfull
//app.use(cors());
app.use(express.json());
// app.use(GuideRouter)
app.use(TourRouter)
app.use(express.urlencoded({ extended: true }));

// app.use('/', routers);

const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});