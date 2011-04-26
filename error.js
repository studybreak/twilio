// Provide our app with the notion of NotFound exceptions
var NotFound = exports.NotFound = function(path) {
  this.name = 'NotFound';
  if (path) {
    Error.call(this, 'Cannot find ' + path);
    this.path = path;
  } 
  else {
    Error.call(this, 'Not Found');
  }
  Error.captureStackTrace(this, arguments.callee);
}

// Inherit from `Error.prototype`.
NotFound.prototype.__proto__ = Error.prototype;

var setup = exports.setup = function(app) {
    // We can call app.error() several times as shown below.
    // Here we check for an instanceof NotFound and show the
    // 404 page, or we pass on to the next error handler.
    app.error(function(err, req, res, next){
      if (err instanceof NotFound) {
        res.render('404.jade', { status: 404, error: err, layout: false}); 
      } else {
        next(err);
      }
    });

    // Here we assume all errors as 500 for the simplicity of
    // this demo, however you can choose whatever you like
    app.error(function(err, req, res){
      console.log('something strange is afoot: %s', err);
      res.render('500.jade', { status: 500, error: err, layout: false }); 
    });
}

// if none of the routes work then 404
var create404Handler = exports.create404Handler = function(app) {
    app.use(function(req, res, next){
      next(new NotFound(req.url));
    });
}
