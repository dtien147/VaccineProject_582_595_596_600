var app = angular.module("myApp", []);

var newDose = function() {
    var dose = {};
    dose.start = {};
    dose.start.unit = "Hour"
    dose.end = {};
    dose.end.unit = "Hour"
    dose.afterFirst = false;
    return dose;
}

var newVaccine = function() {
    var vaccine = {};
    vaccine.doses = [];
    vaccine.girlOnly = false;
    return vaccine;
}

app.controller('myCtrl', function($scope, $http) {    
    $scope.vaccineList = loadVaccines();
    $scope.newVaccine = false;
    $scope.tempVaccine = null;

    $scope.createVaccine = function() {
        $scope.newVaccine = true;
        $scope.curVaccine = newVaccine();
        $scope.curDose = newDose();
        $scope.tempVaccine = $scope.curVaccine;
        $("#content-header").html("New Vaccine");
    }

    $scope.editVaccine = function(vaccine) {
        $scope.newVaccine = true;
        $scope.curVaccine = vaccine;
        $scope.tempVaccine = jQuery.extend(true, {}, vaccine);
        $scope.curDose = newDose();
        $("#content-header").html("Edit Vaccine");
    };

    $scope.saveVaccine = function() {
        var data = {
            'vaccine': $scope.curVaccine
        };
        $http.post('/save_vaccine', data).success(function(res) {
            if (res !== false) {
                alert("Success");
                $scope.curVaccine.id = res;
                if ($scope.vaccineList.indexOf($scope.curVaccine) === -1) {
                    $scope.vaccineList.push($scope.curVaccine);
                }
                $scope.newVaccine = false;
                $("#content-header").html("Vaccine List");
            } else {
                alert("Failed");
            }
        });
    };

    $scope.deleteVaccine = function(vaccine) {
        var data = {
            'id': vaccine.id
        };
        $http.post('/delete_vaccine', data).success(function(res) {
            if (res === true) {
                alert("Success");
                $scope.vaccineList.splice($scope.vaccineList.indexOf($scope.curVaccine), 1);
            } else {
                alert("Failed");
            }
        });
    }

    $scope.cancelEditVaccine = function() {
        if ($scope.tempVaccine !== $scope.curVaccine) {
            var index = $scope.vaccineList.indexOf($scope.curVaccine);
            $scope.vaccineList[index] = $scope.tempVaccine;
        }
        $scope.newVaccine = false;
        $("#content-header").html("Vaccine List");
    }

    $scope.createDose = function() {
        $scope.curDose = newDose();
        $scope.tempDose = null;
        $('#doseModal').modal('toggle');
        $('model-title').html('New dose');
    }

    $scope.cancelEditDose = function() {
        if ($scope.tempDose !== $scope.curDose) {
            var index = $scope.curVaccine.doses.indexOf($scope.curDose);
            $scope.curVaccine.doses[index] = $scope.tempDose;
        }
    }

    $scope.saveDose = function() {
        if ($scope.curVaccine.doses.indexOf($scope.curDose) === -1) {
            $scope.curVaccine.doses.push($scope.curDose);
            $scope.curDose = newDose();
        }
        $('#doseModal').modal('toggle');
    };

    $scope.editDose = function(dose) {
        $scope.curDose = dose;
        $scope.tempDose = jQuery.extend(true, {}, dose);
        $('#doseModal').modal('toggle');
        $('model-title').html('Edit dose');
    }

    $scope.deleteDose = function(dose) {
        $scope.curVaccine.doses.splice($scope.curVaccine.doses.indexOf(dose), 1);
    }
});
