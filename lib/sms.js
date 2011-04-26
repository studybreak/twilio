var TwilioClient = require('twilio').Client
  , twiml = require('twilio').Twiml
  , util = require('util');

var TwilioWrapper = function (settings) {
    this.client = new TwilioClient(settings.twilio.sid, 
                                   settings.twilio.authToken, 
                                   settings.twilio.hostname);
}

TwilioWrapper.GO = "Go";
TwilioWrapper.NO = "No Go";

/*
 * Twilio will post an sms message to us when a merchant txts us
 * with a code
 *
 * The response should be a go / nogo response
 */
TwilioWrapper.prototype.post = function(req, res) {
    var body = req.body['Body'];
    var from = req.body['From'];
    console.log('from: %s', from);
    console.log('body: %s', body);

    res.header("content-type: text/xml");
    res.send("<Response><Sms>" + TwilioWrapper.GO + "</Sms></Response>");
}

TwilioWrapper.prototype.sendSMS = function(num, msg) {
    var phone = this.client.getPhoneNumber('4155992671');
        phone.sendSms(num, '2667-6737 ' + msg, null, function(sms) {
            sms.on('processed', function(reqParams, response) {
                console.log('Message processed, request params follow');
                console.log(reqParams);
            });
        });
};

var route = exports.route = function(app, settings) {
    var tw = new TwilioWrapper(settings);
    app.post('/sms', tw.post);
    return tw;
}
