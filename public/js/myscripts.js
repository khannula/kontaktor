/**
 * Created by Kari on 29.7.2015.
 */
/*
window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));

twttr.widgets.createFollowButton(
    'TwitterDev',
    document.getElementById('twtr-container'),
    {
        size: 'large'
    }
);


*/


function setVisible()
{
    console.log('setVisible() called ');
    //$("#poistaBtn").toggle();
    document.getElementById("poistaBtn").style.display = 'block';
}
