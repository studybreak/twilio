var express = require('express')
  , settings = require('./settings')
  , error = require('./error')
  , sms = require('./lib/sms')
  , main = require('./lib/main');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', settings.VIEWS_DIR);
  app.set('view engine', settings.VIEW_ENGINE);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.logger({ format: '":method :url" :status' }))
  app.use(app.router);
  app.use(express.static(settings.STATIC_DIR));
});

// setup error handlers
error.setup(app);

// Routes
var tw = sms.route(app, settings);
main.route(app, tw);

error.create404Handler(app);

if (!module.parent) {
  app.listen(settings.SERVER_PORT);
  console.log("Express server listening on port %d", app.address().port);
}
