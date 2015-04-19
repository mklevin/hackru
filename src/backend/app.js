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
var dbConfig = require("./config/db");
mongoose.connect(dbConfig.url);

// =============================================================================
// ROUTES
// =============================================================================
var api = require("./routes/api");
// var auth = require("./routes/auth");
// var routes = require("./routes/routes");

app.use("/api", api);
// app.use("/auth", auth);
// app.use("/", routes);

app.get("/", function(req, res) {
  res.send("Hello world!");
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
