var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');


app.set('view engine', 'ejs');

app.use(ejsLayouts);
app.use(express.urlencoded({extended: false}))

app.use('/dinosaurs', require('./controllers/dinosaurs'));
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'));

app.get('/', function(req, res) {
	res.send('This is the home route');
	console.log(dinoData)
});



app.listen(8000);
