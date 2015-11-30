/**
 * Created by Kari on 2.11.2015.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var contactSchema   = new Schema({
    nimi: String,
    katuosoite: String,
    postinro: String,
    kaupunki: String,
    puhelinkoti: String,
    puhelintyo: String,
    email: String

});

module.exports = mongoose.model('Contact', contactSchema);
