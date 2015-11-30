/**
 * Created by Kari on 7.7.2015.
 */

var app = angular.module('scotchTodo', []);
var selected = null;

app.controller('mainController',['$scope', '$http', function($scope, $http) {
    $scope.formdata = {};
    $scope.todos = [];
    $scope.orderProp = 'nimi';

    //$scope.selected = null;
    $scope.a = null;
    $scope.b = null;

    /**
     * Get all contacts from json
     */
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = JSON.parse(data);
            console.log('Success mainController GET /api/todos: ' +data);
        })
        .error(function(data) {
           console.log('Error mainController GET /api/todos: ' +data);
        });


    /**
     * Add new contact to json data
     */
    $scope.saveUser = function(contactData) {
        message = JSON.stringify(contactData);
        console.log('core.js POST /api/todos ' +message);
        console.log('NEW contact ');

        //$http.post('/api/todos', $scope.formData)
        $http.post('/api/todos', contactData)
            .success(function(data) {
                $scope.formData = {}; // clear the form
                $scope.todos = data;
                console.log('Success mainController POST /api/todos: ' +data);
            })
            .error(function(data) {
                console.log('Error mainController POST /api/todos: ' + data);
            });
    };

    /**
     * Modify contact to json data
     */
    $scope.modifyContact = function(contactData) {
        message = JSON.stringify(contactData);
        console.log('core.js POST/MODIFY /api/todos/:id ' +message);
        console.log('MODIFY contact, id: ' +contactData._id);

        $http.post('/api/todos/' +contactData._id, contactData)
            .success(function(data) {
                $scope.formData = {}; // clear the form
                // FIKSAA - uusi data kaikkialle
                //$scope.todos = [];
                //$scope.todos = angular.copy(JSON.stringify(data));
                $scope.formData = angular.copy(JSON.stringify(data));
                console.log('Success mainController POST/MODIFY: ' +data);
                // KOKEILE LÄH get-kysely erikseen!!!!!!
            })
            .error(function(data) {
                console.log('Error mainController POST/MODIFY: ' + data);
            });
    };

    /**
     * Delete selected contact from json data
     * @param id
     */
    $scope.deleteTodo = function(id) {
        console.log('DELETE /api/todos: ' +id);
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                //$scope.todos = data;
                $scope.todos = JSON.parse(data);
                $scope.selected = null;
                // Hide poista-button and pic circle!!!!!!
                hideElements();
                // TODO: poista-button still visible after delete - should be hidden. Code below doesn't work.
                //setVisible();
                console.log('Success mainController DELETE /api/todos: ' +data);
            })
            .error(function(data) {
                console.log('Error mainController DELETE /api/todos: ' + data);

            });
    };

    /**
     * Hide deleted contact info after Ok clicked.
     */
    function hideElements()
    {
        console.log('hideElements() called ');
        document.getElementById("selectedPic").style.display = 'none';
        // TODO: If poista-button hidden it is not visible anymore. Fix this sonehow.
        //document.getElementById("poistaBtn").style.display = 'none';
        //$("#poistaBtn").toggle();
        document.getElementById("myHr").style.display = 'none';
    }


    /**
     * Select the current contact and copy json data
     * @param contact
     */
    $scope.selectContact = function( contact ) {

        hideIt();
        $scope.selected = (JSON.parse(JSON.stringify(contact)));

        // copy data to be used in form edit
        $scope.showEdit();
    }

    /**
     * Contactinfo area is not visible at start and is
     * made visible after contact selected from list.
     */
    function hideIt(){
        $scope.a = document.getElementById("contactinfo");
        $scope.b = document.getElementById("twtr-containerii");

        $scope.a.style.display = "inline";
        $scope.b.style.display = "inline";

        //alert("hideIt() funkkarissa");

        //$scope.a.style.display = ($scope.a.style.display == "none") ? "inline" : "none";

        //$("#contactinfo").removeClass('hide');

    }

    /**
     * Copy selected contact info to editable form data.
     */
    $scope.showEdit = function () {
        console.log('showEdit() called ');
        $scope.editableContact = angular.copy($scope.selected);
        // this works too
        //$scope.editableContact = $scope.selected.nimi;
    }

} ] );