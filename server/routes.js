
var bodyParser = require('body-parser');

var SabreDevStudio = require('sabre-dev-studio');


var sabre_dev_studio = new SabreDevStudio({
  client_id:     'V1:rbf77ee2hyi6vb3t:DEVCENTER:EXT',
  client_secret: 'Avs2bWL4',
  uri:           'https://api.test.sabre.com'
});
var options = {};
/*var callback = function(error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(JSON.stringify(JSON.parse(data)));
  }
};
sabre_dev_studio.get('/v1/lists/supported/cities', options, callback);
sabre_dev_studio.get('/v1/shop/flights/fares?origin=NYC&departuredate=2015-05-25&returndate=2015-05-30&maxfare=200', options, callback);
*/
function sabreCall(q, res) {
  sabre_dev_studio.get(q, options, function(err, data) {
    response(res, err, data);
  });
}

function response(res, err, data) {
  console.log(JSON.stringify(data));
  if (err) {
    res.status(200).send({
      'status': false,
      'message': 'Error',
      'info': err
    });
  } else {
    res.status(200).send({
      'status': true,
      'message': 'Success',
      'info': data
    });
  }
}

module.exports = function (app) {


    // set database pool
    // api ---------------------------------------------------------------------
    // get all users
    app.get('/api/cities', function (req, res) {
        // use mysql to get all users in the database
        var options={};
        sabreCall('/v1/lists/supported/cities', res);
        //res.send({user:"users"});
    });

    // create new user
    app.get('/api/flights', function (req, res) {
      console.log("req.query.origin "+req.query.origin)
      console.log("req.query.departuredate "+req.query.departuredate)
      console.log("req.query.departuredate "+req.query.returndate)
      console.log("req.query.maxfare "+req.query.maxfare)
      sabreCall('/v1/shop/flights/fares?origin=' + req.query.origin +
                        '&departuredate=' + req.query.departuredate +
                        '&returndate=' + req.query.returndate +
                        '&maxfare=' + req.query.maxfare, res);

    });













    app.all("/api/*", function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, Accept");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, HEAD, DELETE, OPTIONS");
      return next();
   });
    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


};


/*---------- Database functions -----------*/
