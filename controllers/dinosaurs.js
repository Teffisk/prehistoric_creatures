var express = require('express');
var router = express.Router();
var fs = require('fs');
var dinoData = fs.readFileSync('./dinos.json')
dinoData = JSON.parse(dinoData);
console.log(dinoData)


router.get('/', function(req, res) {
	var nameFilter = req.query.nameFilter;
	if (nameFilter) {
		filteredData = dinoData.filter(function(dino){
			return dino.name.toLowerCase() === nameFilter.toLowerCase();
		});
		res.render('dinosaurs/index', {items: filteredData});
	} else {
	res.render('dinosaurs/index', {items: dinoData});
	}
})

router.get('/new', function(req, res) {
	res.render('dinosaurs/new');
})

router.post('/', function(req, res) {
	//add the data to our array
	dinoData.push(req.body);
	//save our dinosaur to our json file
	fs.writeFileSync('./dinos.json', JSON.stringify(dinoData));
	//redirect the user to the homepage
	res.redirect('/dinosaurs');
})

router.get('/:idx', function(req, res){
	if (req.params.idx< dinoData.length){
	res.render('dinosaurs/show', {dino: dinoData[req.params.idx]})
	} else {
		res.send("We only have "+dinoData.length+" dinosaurs at this time.")
	}
});

 module.exports = router;