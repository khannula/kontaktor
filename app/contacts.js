/**
 * Created by Kari on 2.11.2015.
 */

/*
 * GET contact by id.
 */
/*
exports.json = function(req, res) {
    console.log('contacts.js: BEGIN ');
    //Contact.findById(req.params.contact_id, function(err, contact) {
    Contact.findOne(req.params._id, function(err, contact) {
        console.log('contacts.js: body: ');
        console.log(JSON.stringify(req.body));
        if (err)
            res.send(err);
        res.json(contact);
    });

    Contact.save(function(err, contact, count) {
        //tempContact.save(function(err) {
        if (err)
            res.send(err);

        res.json(contact);
        //res.json(contact);
        //res.json({ message: 'Contact updated!' });
    });
};*/