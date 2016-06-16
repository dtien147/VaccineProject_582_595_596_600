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

	children.insert({'child_name': req.body.child_name, 'birthday': req.body.datepicker, 'gender': req.body.sex});

	res.redirect('/parent');
	
});

router.post('/parent/removechild/:childId', function(req, res) {
	var ObjectID = require('mongodb').ObjectID;
	var db = req.db;
	var children = db.get('children');	
	var id = req.params.childId;
	var objId = new ObjectID (id);
	
	children.remove({'_id': objId}, function (err, result)
		{
			 if (err) {
                console.log(err);
            }
			
			else
			{
				console.log("hi");
				console.log(result);
			}
		});

	res.redirect('/parent');
	
});




module.exports = router;