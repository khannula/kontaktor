/**
 * Created by Kari on 7.7.2015.
 */

var app = angular.module('scotchTodo', []);

app.controller('mainController',['$scope', '$http', function($scope, $http) {
    $scope.formdata = {};
    $scope.todos = [];
    $scope.orderProp = 'nimi';

    $scope.selected = null;
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
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
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
     * Delete selected contact from json data
     * @param id
     */
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log('Success mainController DELETE /api/todos: ' +data);
            })
            .error(function(data) {
                console.log('Error mainController DELETE /api/todos: ' + data);
            });
    };

    /**
     * Select the current contact and copy json data
     * @param contact
     */
    $scope.selectContact = function( contact ) {

        hideIt();
        $scope.selected = (JSON.parse(JSON.stringify(contact)));

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

} ] );