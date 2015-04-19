// =============================================================================
// This is the main server file that starts up the NodeJS application using
// express and all other required modules to get the server off of the ground.
// Any configuration or deep level changes (think authentication methods) are
// made here and will be changed in this file if need be.
// =============================================================================

// =============================================================================
// MODULES
// =============================================================================

// Import required NodeJS modules
var express        = require("express");
	path           = require('path');
    app            = express();
    http           = require("http");
    passport       = require("passport");
    util           = require("util");
    morgan         = require("morgan");
    session        = require("express-session");
    bodyParser     = require("body-parser");
    cookieParser   = require("cookie-parser");
    methodOverride = require("method-override");
    mongoose       = require("mongoose");
    ejs			   = require("ejs");

// =============================================================================
// CONFIGURATIONS
// =============================================================================

// Configure passport, grab credentials
//var authConfig = require("./config/auth");

// Allo passport to serialize and deserialize users
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// // Input whichever strategy you would like to use
// passport.use(new GitHubStrategy({
//     clientID: authConfig.clientID,
//     clientSecret: authConfig.clientSecret,
//     callbackURL: authConfig.callbackURL
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // asynchronous verification, for effect...
//     process.nextTick(function () {

//       // To keep the example simple, the user's GitHub profile is returned to
//       // represent the logged-in user.  In a typical application, you would want
//       // to associate the GitHub account with a user record in your database,
//       // and return that user instead.
//       return done(null, profile);
//     });
//   }
// ));

// configure Express and express middlewear
// app.use(express.static(__dirname + '/client'));
// app.set('views', __dirname + '/client/html');
app.use(morgan("combined"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(methodOverride());

// configure EJS
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({
//   secret: authConfig.sessionSecret,
//   resave: false,
//   saveUninitialized: true
// }));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions
app.use(passport.initialize());
app.use(passport.session());

// =============================================================================
// DATABASE
// =============================================================================
// var dbConfig = require("./config/db");
// mongoose.connect(dbConfig.url);

// =============================================================================
// ROUTES
// =============================================================================
// var api = require("./routes/api");
// var auth = require("./routes/auth");
// var routes = require("./routes/routes");

// app.use("/api", api);
// app.use("/auth", auth);
// app.use("/", routes);

var user = {};
var listings = [];
listings[0] = {};
listings[1] = {};
http.get("http://172.31.244.174:3100/api/listings", function(res) {
  console.log("Got response: " + res.statusCode);
  res.on("data", function(chunk) {
	// console.log("BODY: " + chunk);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
user.first = "Natalie";
user.last = "Lane";

listings[0].id = "1";
listings[0].title = "HackRU Winner";
listings[0].location = { "city": "Rutgersville", "state": "NJ", "country": "US"};
listings[0].description = "This is the best job ever.";
listings[0].perks = ["free coffee", "admiration"];
listings[0].skills = ["being the best", "Java"];

listings[1].id = "2";
listings[1].title = "HackRU Dinner";
listings[1].location = { "city": "Noodles", "state": "NJ", "country": "US"};
listings[1].description = "This is the weirdest 1 AM dinner ever.";
listings[1].perks = ["chicken", "other meat"];
listings[1].skills = ["meat identification", "balls"];

app.get("/", function(req, res) {
  res.render("index", {user: user, listing: listings[0]});
});

app.post("/next", function(req, res) {
	console.log("Hey!");
	res.render("partials/job_card", {user: user, listing: listings[1]});
});

app.post("/more", function(req, res) {
	res.render("partials/full_job_card", {user: user, listing: listings[1]});
});

// The last middle wear to use is the 404 middlewear. If they didn't get
// anywhere show them the 404
app.use(function(req, res){
    res.sendStatus(404);
});

// =============================================================================
// START SERVER
// =============================================================================

var server = http.createServer(app);

// Start the server (taken from Andy which is taken from Cloud9)
server.listen(process.env.PORT || 3100, process.env.IP || "0.0.0.0", function() {
  var address = server.address();
  console.log("Server is now started on ", address.address + ":" + address.port);
});
