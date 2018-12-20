var express = require('express');
var router = express.Router();
var fs = require('fs');
var creatureData = fs.readFileSync('./prehistoric.json');
creatureData = JSON.parse(creatureData);


router.get('/', function(req, res) {

	var nameFilter = req.query.nameFilter;
	if (nameFilter) {
		filteredData = creatureData.filter(function(creature){
			return creature.name.toLowerCase() === nameFilter.toLowerCase();
		});
		res.render('prehistoric_creatures/index', {items: filteredData});
	} else {
	res.render('prehistoric_creatures/index', {items: creatureData});
	}
})

router.get('/new', function(req, res) {
	res.render('prehistoric_creatures/new');
})

router.post('/', function(req, res) {
	//add the data to our array
	creatureData.push(req.body);
	//save our creature to our json file
	fs.writeFileSync('./prehistoric.json', JSON.stringify(creatureData));
	//redirect the user to the homepage
	res.redirect('/prehistoric_creatures');
})

router.get('/:idx', function(req, res){
	if (req.params.idx< creatureData.length){
	res.render('prehistoric_creatures/show', {items: creatureData[req.params.idx]})
	} else {
		res.render('prehistoric_creatures/index', {items: creatureData});
	}
});

 module.exports = router;