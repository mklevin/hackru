var router = require("express").Router();

// Import all models
var Searcher = require("../models/Searcher");
var Resume = require("../models/Resume");
var SearchPrefs = require("../models/SearchPrefs");
var Listing = require("../models/Listing");
var Employer = require("../models/Employer");
var Company = require("../models/Company");

// =============================================================================
// GETS
// =============================================================================

// ___________________users___________________
// Return all users
router.get("/users", function(req, res, next) {
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
router.get("/users/id/:id", function(req, res, next) {
  Searcher.findById(req.params.id, function(err, searcher) {
    if (err) next(err);
    if (searcher) {

      // Check to see if they have filled out any search preferences or resume yet
      // if so, add that
      if (searcher.searchPreferences) {
        SearchPrefs.findById(searcher.searchPreferences, function(err, prefs) {
          if (err) next(err);
          searcher.searchPreferences = prefs;
        });
      }
      if (searcher.resume) {
        Resume.findById(searcher.resume, function(err, resume) {
          if (err) next(err);
          searcher.resume = resume;
        });
      }
    }

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
router.get("/companies", function(req, res, next) {
  Company.find(function(err, companies) {
    if (err) next(err);
    res.json(companies);
  });
});

// Return a specific company based on their mongodb id
router.get("/companies/id/:id", function(req, res, next) {
  Company.findById(function(err, comapny) {
    if (err) next(err);
    res.json(company);
  });
});

// ___________________listings___________________
// return all listings
router.get("/listings", function(req, res, next) {
  Listing.find(function(err, listings) {
    if (err) next(err);
    res.json(listings);
  });
});

// return a specific listing based on its mongodb id
router.get("/listings/id/:id", function(req, res, next) {
  Listing.findById(function(err, listing) {
    if (err) next(err);
    res.json(listing);
  });
});

// =============================================================================
// POSTS
// =============================================================================

// ___________________users___________________
// Create a new user, either a searcher or employer
router.post("/users", function(req, res, next) {
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

module.exports = router;
