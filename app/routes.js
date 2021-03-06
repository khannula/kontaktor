/**
 * Created by Kari on 7.7.2015.
 */

var path = require('path');
var fs = require('fs');
var Contact    = require('./models/contact');

module.exports = function(app) {

// api ---------------------------------------------------------------------

    /**
     * Get all contacts
     */
    app.get('/api/todos', function(req, res) {

        console.log('routes.js: app.get() ');

        Contact.find(function(err, data) {
            if (err) {
                console.log('Cannot find() ERROR: ', err);
                res.send(err);
            }
            else {
                res.json(JSON.stringify(data));
            }
        });
    });

    /**
     * Create a new contact and send back all contacts after creation
     */
    app.post('/api/todos', function(req, res) {

        console.log('routes.js: app.post() NEW ');
        console.log(JSON.stringify(req.body));

        var newContact = new Contact();
        newContact.nimi = req.body.nimi;
        newContact.katuosoite = req.body.katuosoite;
        newContact.postinro = req.body.postinro;
        newContact.kaupunki = req.body.kaupunki;
        newContact.puhelinkoti = req.body.puhelinkoti;
        newContact.puhelintyo = req.body.puhelintyo;
        newContact.email = req.body.email;

        newContact.save(function(err) {
            if (err) {
                console.log('New contact save() ERROR: ', err);
                res.send(err);
            }
            else {
                console.log('Contact created!');
                // Send back all connections
                Contact.find(function(err, data) {
                    if (err) {
                        console.log('Cannot find() ERROR: ', err);
                        res.send(err);
                    }
                    else {
                        res.json(JSON.stringify(data));
                    }
                });
            }
        });
    });

    /**
     * Modify contact and send back all contacts after creation
     */
    app.post('/api/todos/:contact_id', function(req, res) {

        console.log('routes.js: app.post() MODIFY ');
        console.log(JSON.stringify(req.body));
        console.log('req.body.id', req.body['_id']);

        // use Contact model to find the contact we want
        Contact.findById(req.body['_id'], function(err, tempContact) {
            if (err) {
                console.log('findById() ERROR: ', err);
                res.send(err);
            }
            else if(tempContact) {
                // update the contacts info
                console.log('tempContact.nimi A ', tempContact.nimi);
                console.log('req.body[nimi]: ', req.body['nimi']);
                tempContact.nimi = req.body['nimi'];
                console.log('tempContact.nimi', tempContact.nimi);
                tempContact.katuosoite = req.body['katuosoite'];
                tempContact.postinro = req.body['postinro'];
                tempContact.kaupunki = req.body['kaupunki'];
                tempContact.puhelinkoti = req.body['puhelinkoti'];
                tempContact.puhelintyo = req.body['puhelintyo'];
                tempContact.email = req.body['email'];

                tempContact.save(function (err) {
                    if (err) {
                        console.log('Save ERROR ', err.message);
                    }
                    else{
                        console.log('Save UPDATED! ', tempContact);
                        res.statusCode = 200;
                        res.statusText = 'Ok';

                        // send all back
                        Contact.find(function(err, data) {
                            if (err)
                                res.send(err);
                            res.json(JSON.stringify(data));
                        });
                    }
                });
            }
            else{
                console.log('findOne() not found!');
                res.statusCode = 404;
                res.statusText = 'Not found';
                res.send();
            }
        });
    });

    /**
     * Delete contact and send back all contacts after creation
     */
    app.delete('/api/todos/:contact_id', function(req, res) {

        console.log('routes.js: app.delete() AA id:' +req.params.contact_id);
        console.log(JSON.stringify(req.body));

        // For some reason this kind of finfById does not work in delete.
        //Contact.findById(req.body['_id'], function(err, tempContact) {

        Contact.findById(req.params.contact_id, function(err, tempContact) {
            if (err) {
                console.log('Delete findById() ERROR: ', err);
                res.send(err);
            }
            else if(tempContact) {
                // Found - Delete contact
                console.log('tempContact.nimi ', tempContact.nimi);

                tempContact.remove(function (err) {
                    if (err) {
                        console.log('Delete ERROR ', err.message);
                    }
                    else{
                        console.log('Delete OK! ', tempContact);
                        res.statusCode = 200;
                        res.statusText = 'Ok';

                        /* send all back*/
                        Contact.find(function(err, data) {
                            if (err)
                                res.send(err);
                            res.json(JSON.stringify(data));
                        });
                    }
                });
            }
            else{
                console.log('findOne() in delete not found!');
                res.statusCode = 404;
                res.statusText = 'Not found';
                res.send();
            }
        });

        /* Just a DEMO, sends shorter list back
        fs.readFile('app/partials/contacts_2_items.json', 'utf8', function (err, data) {
            console.log('routes.js: fs.readFile() delete ');
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                //throw err;
                console.log('Error fs.readFile(): ' + err);
                res.send(err);
            }
            else {
                console.log('fs.readFile() GET JSON success! ');
                console.log('Data: ' + data);
                res.json(data);
            }
        });*/
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });

};