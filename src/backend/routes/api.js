var router = require("express").Router();

// Import all models
var Searcher = require("../models/Searcher");
var Listing = require("../models/Listing");
var Employer = require("../models/Employer");
var Company = require("../models/Company");

// =============================================================================
// GETS
// =============================================================================

// ___________________users___________________
// Return all users
router.get("/users", loggedIn, function(req, res, next) {
  users = [];
  Searcher.find(function(err, searchers) {
    if (err) next(err);
    users = searchers;
    console.log(searchers);
  });
  Employer.find(function(err, employers) {
    if (err) next(err);
    users.concat(employers);
    res.json(users);
  });
});

// Return a specific user based on their mongodb id
router.get("/users/id/:id", loggedIn, function(req, res, next) {
  Searcher.findById(req.params.id, function(err, searcher) {
    if (err) next(err);
    res.json(searcher);
  });
  Employer.findById(req.params.id, function(err, employer) {
    if (err) next(err);
    if (employer !== null) {
      res.json(employer);
    }
  });
});

// ___________________companies___________________
// Return all companies
router.get("/companies", loggedIn, function(req, res, next) {
  Company.find(function(err, companies) {
    if (err) next(err);
    res.json(companies);
  });
});

// Return a specific company based on their mongodb id
router.get("/companies/id/:id", loggedIn, function(req, res, next) {
  Company.findById(req.params.id, function(err, comapny) {
    if (err) next(err);
    res.json(company);
  });
});

// ___________________listings___________________
// return all listings
router.get("/listings", function(req, res, next) {
  Listing.find( function(err, listings) {
    if (err) next(err);
    res.json(listings);
  });
});

// return a specific listing based on its mongodb id
router.get("/listings/id/:id", function(req, res, next) {
  Listing.findById(req.params.id, function(err, listing) {
    if (err) next(err);
    res.json(listing);
  });
});
// =============================================================================
// POSTS
// =============================================================================

// ___________________users___________________
// Create a new user, either a searcher or employer
router.post("/users/new", loggedIn, function(req, res, next) {
  req.body.googleid = req.user.id;
  if (req.body.type === "searcher") {
    Searcher.create(req.body, function(err, searcher) {
      if (err) next(err);
      res.json(searcher);
    });
  } else if (reg.body.type === "employer") {
    Employer.create(req.body, function(err, employer) {
      if (err) next(err);
      res.json(employer);
    });
  }
});

// Update the resume of a user
router.post("/users/id/:id/resume", loggedIn, function(req, res, next) {
  Searcher.findById(req.params.id, function(err, searcher) {
    if (err) next(err);
    if (searcher.type === "searcher") {
      searcher.resume = req.body;
      searcher.save();
    }
  });
});

// Update the search preferences of the user
router.post("/users/id/:id/searchprefs", loggedIn, function(req, res, next) {
  Searcher.findById(req.params.id, function(err, searcher) {
    if (err) next(err);
    if (searcher.type === "searcher") {
      searcher.searchPrefs = req.body;
      searcher.save();
    }
  });
});

// ___________________companies___________________
// Create a new company
router.post("/companies/new", loggedIn, function(req, res, next) {
  Company.create(req.body, function(err, company) {
    if (err) next(err);
    res.json(company);
  });
});

// ___________________listings___________________
// Create a new listing
router.post("/listings/new", function(req, res, next) {
  Listing.create(req.body, function(err, listing) {
    if (err) next(err);
    res.json(listing);
  });
});


router.post("/listings", loggedIn, function(req, res, next) {
  Listing.find({}, function(err, listings) {
    if (err) next(err);
    res.json(listings);
  });
});

// =============================================================================
// DELETE
// =============================================================================

// ___________________users___________________
router.delete("/users/id/:id", loggedIn, function(req, res, next) {
  Searcher.findByIdAndRemove(req.params.id, req.body, function(err, searcher) {
    if (err) next(err);
    if (searcher) res.json(searcher);
  });
  Employer.findByIdAndRemove(req.params.id, req.body, function(err, employer) {
    if (err) next(err);
    if (employer) res.json(employer);
  });
});

// ___________________companies___________________
router.delete("/companies/id/:id", loggedIn, function(req, res, next) {
  Company.findByIdAndRemove(req.params.id, req.body, function(err, company) {
    if (err) next(err);
    res.json(company);
  });
});

// ___________________listings___________________
router.delete("/listings/id/:id", loggedIn, function(req, res, next) {
  Listing.findByIdAndRemove(req.params.id, req.body, function(err, listing) {
    if (err) next(err);
    res.json(listing);
  });
});

// Check to see if a user is logged in, if not, redirect them
function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    console.log("not logged in");
    res.redirect("/");
  }
}

module.exports = router;
