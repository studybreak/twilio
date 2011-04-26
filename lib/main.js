var util = require('util');

/*
 * tw is the twilio wrapper from lib/sms
 *
 */
var Main = function (tw) {
    this.tw = tw;
}

var self = null;

/*
 * Main responds to / and will send a txt message to a subscriber
 *
 */
Main.prototype.post = function(req, res) {
    var phone = req.body['phone'];
    console.log('received post from: %s', phone);

    res.send({status: 'ok'});
    self.tw.sendSMS(phone, 'The code word is: BALDERDASH');
}

Main.prototype.get = function(req, res) {
  console.log('yep');
  res.render('index');
}

var route = exports.route = function(app, tw) {
    self = new Main(tw);
    app.post('/getdeal', self.post);
    app.get('/', self.get);
}
