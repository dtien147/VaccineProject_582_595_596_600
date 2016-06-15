var express = require('express');
var router = express.Router();

router.get('/parent', function(req, res) {
	var db = req.db;
	var children = db.get("children");
	children.find({}, function(err, childrenList)
		{

			if (err)
			{
				console.log(err);
			}

			else
			{
				console.log(childrenList);
				res.render('parent.ect',
					{
						children: childrenList
					});
			}
		});

});


router.post('/parent:parentEmail', function(req, res) {
	var db = req.db;
	var children = db.get('children');	
	var email = req.params.parentEmail;
	children.insert({'parent-email': email, 'child_name': req.body.child_name, 'birthday': req.body.datepicker, 'gender': req.body.sex});
	
});



router.post('/parent', function(req, res) {
	var db = req.db;
	var children = db.get('children');	
	console.log(req.body.child_name, req.body.datepicker,req.body.sex);

	children.insert({'child_name': req.body.child_name, 'birthday': req.body.datepicker, 'gender': req.body.sex});
	
});




module.exports = router;