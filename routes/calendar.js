var express = require ('express');
var router = express.Router();
var moment = require('moment');

moment().format();

router.get('/calendar', function (req, res)
{
  if (req.user===undefined)
    {
      res.redirect('/login');
    }

    else {
      var eventsList = [];
      var child = req.db.get("children");
      var vaccines = req.db.get("vaccines");

      child.find({'parent-email': req.user['email']}, function(err, childrenList)
      {
         if (err){
           console.log(err);
         }

         vaccines.find({},function(err, vaccinesList)
         {
           if (err){
             console.log(err);
           }

           for (var i = 0; i < childrenList.length; i++) {
              for (var j = 0; j < vaccinesList.length; j++){
                  for (var k = 0; k < vaccinesList[j].doses.length; k++) {
                      var startTime = moment(childrenList[i].birthday,"DD-MM-YYYY");
                      var endTime = moment(childrenList[i].birthday,"DD-MM-YYYY");
                      var doseObj = vaccinesList[j].doses[k];

                      if (doseObj['start'].unit === "Hour"){
                          startTime.add(vaccinesList[j].doses[k].start.value, 'h');
                      }
                      if (doseObj['start'].unit === "Day"){
                          startTime.add(vaccinesList[j].doses[k].start.value, 'd');
                      }
                      if (doseObj['start'].unit === "Month"){
                          startTime.add(vaccinesList[j].doses[k].start.value, 'M');
                      }
                      if (doseObj['start'].unit === "Year"){
                          startTime.add(vaccinesList[j].doses[k].start.value, 'y');
                      }

                      if (doseObj['end'].unit === "Hour"){
                          endTime.add(vaccinesList[j].doses[k].end.value, 'h');
                      }
                      if (doseObj['end'].unit === "Day"){
                          endTime.add(vaccinesList[j].doses[k].end.value, 'd');
                      }
                      if (doseObj['end'].unit === "Month"){
                          endTime.add(vaccinesList[j].doses[k].end.value, 'M');
                      }
                      if (doseObj['end'].unit === "Year"){
                          endTime.add(vaccinesList[j].doses[k].end.value, 'y');
                      }

                      eventsList.push({
                        title: vaccinesList[j].name,
                  			start: startTime.format("YYYY-MM-DD HH-mm-ss"),
                  			end: endTime.format("YYYY-MM-DD HH-mm-ss"),
                  			allDay: false
                      });
                  }
              }
            }
            res.render("calendar.ect", {data:eventsList});
         });
      });

    }

});

module.exports = router;
