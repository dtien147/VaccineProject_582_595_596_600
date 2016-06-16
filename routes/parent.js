var express = require('express');
var router = express.Router();

router.get('/parent/:parentEmail', function(req, res) {
	var db = req.db;
	var children = db.get("children");
	var email = req.params.parentEmail;
	children.find({'parent-email': email}, function(err, childrenList)
		{

			if (err)
			{
				console.log(err);
				res.render('parent.ect', {});
			}

			else if (childrenList!=null)
			{
				console.log(childrenList);
				res.render('parent.ect',
					{
						children: childrenList
					});
			}
			
			else
			{
				res.render('parent.ect', {});
			}
		});

});


router.post('/parent/:parentEmail', function(req, res) {
	var db = req.db;
	var children = db.get('children');	
	var email = req.params.parentEmail;
	children.insert({'parent-email': email, 'child_name': req.body.child_name, 'birthday': req.body.datepicker, 'gender': req.body.sex});
	
});


router.post('/parent/:parentEmail/removechild/:childId', function(req, res) {
	var ObjectID = require('mongodb').ObjectID;
	var db = req.db;
	var children = db.get('children');	
	var id = req.params.childId;
	var objId = new ObjectID (id);
	var email = req.params.parentEmail;
	
	children.remove({'parent-email': email, '_id': objId}, function (err, result)
		{
			 if (err) {
                console.log(err);
            }
			
			else
			{
			
				console.log(result);
			}
		});

	
});




module.exports = router;