/**
 * Created by Kari on 7.7.2015.
 */

var app = angular.module('scotchTodo', []);
var selected = null;

app.controller('mainController',['$scope', '$http', function($scope, $http) {
    $scope.formdata = {};
    $scope.todos = [];
    $scope.orderProp = 'nimi';
    $scope.a = null;
    $scope.b = null;
    $scope.showMe = true;

    /**
     * Get all contacts from json
     */
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = JSON.parse(data);
            console.log('Success mainController GET: ' +data);
        })
        .error(function(data) {
           console.log('Error mainController GET: ' +data);
        });

    /**
     * Add new contact to database
     */
    $scope.saveContact = function(contactData) {
        message = JSON.stringify(contactData);
        console.log('core.js POST NEW contact ' +message);

        $http.post('/api/todos', contactData)
            .success(function(data) {
                // Update whole contact list in left column
                $scope.todos = JSON.parse(data);
                console.log('Success mainController POST NEW contact: ' +data);
            })
            .error(function(data) {
                console.log('Error mainController POST NEW contact: ' + data);
            });
    };

    /**
     * Modify contact to json data
     */
    $scope.modifyContact = function(contactData, seldata) {
        message = JSON.stringify(contactData);
        console.log('core.js POST/MODIFY /api/todos/:id ' +message);
        console.log('MODIFY contact, id: ' +contactData._id);

        $http.post('/api/todos/' +contactData._id, contactData)
            .success(function(data) {
                console.log('Success mainController POST/MODIFY: ' +data);
                // Show new data in selection
                updateSelected(data);
                // Update whole contact list in left column
                $scope.todos = JSON.parse(data);
            })
            .error(function(data) {
                console.log('Error mainController POST/MODIFY: ' + data);
            });
    };

    /**
     * Show selected contacts with changed data.
     * @param data
     */
    function updateSelected(data) {
        var data2 = JSON.parse(data);
        $.each(data2, function(i, item){
            console.log("Modified is " + i + "|" + item.nimi);
            if(item._id == $scope.selected._id){
                console.log("MATCH!! ");
                $scope.selected.nimi = item.nimi;
                $scope.selected.katuosoite = item.katuosoite;
                $scope.selected.postinro = item.postinro;
                $scope.selected.kaupunki = item.kaupunki;
                $scope.selected.puhelinkoti = item.puhelinkoti;
                $scope.selected.puhelintyo = item.puhelintyo;
                $scope.selected.email = item.email;
            }
        });
    }

    /**
     * Delete selected contact from database
     * @param id
     */
    $scope.deleteContact = function(data, alltodos) {
        console.log('DELETE id: ' +data._id);

        $http.delete('/api/todos/' +data._id)
            .success(function(data) {
                // Update whole contact list in left column
                // Kha 22.6. not needed?
                $scope.todos = JSON.parse(data);
                //$scope.alltodos = JSON.parse(data);
                $scope.selected = null;
                // Hide poista-button and pic circle!!!!!!
                hideElements();
                console.log('Success mainController DELETE: ' +data);
            })
            .error(function(data) {
                console.log('Error mainController DELETE: ' + data);

            });
    };

    /**
     * Hide deleted contact info after Ok clicked.
     */
    function hideElements()
    {
        console.log('hideElements() called ');
        document.getElementById("selectedPic").style.display = 'none';
        document.getElementById("myHr").style.display = 'none';
    }

    /**
     * Select the current contact and copy json data
     * @param contact
     */
    $scope.selectContact = function( contact ) {
        $scope.showMe = true; // Enable Poista button
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

    /**
     * Clear form before adding new contact
     */
    $scope.clearFormdata = function() {
        $scope.editableContact = null;

        // clear selected data and buttons if visible
        $scope.selected = null;
        $scope.myToggleBtn();
    }

    /**
     * Toggle Poista and Muokkaa buttons after click
     */
    $scope.myToggleBtn = function() {
        $scope.showMe = !$scope.showMe;
    }

} ] );