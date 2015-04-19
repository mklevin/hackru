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
  params = {
    number: 10,
    type: "internship",
    skills: [],
    location: [],
    time: "Summer2015",
    edu: [],
    exp: []
  };

  if (req.query.number) params.number = req.query.number;
  if (req.query.skills) params.skills = req.query.skills.split(",");
  if (req.query.type) params.type = req.query.type;
  if (req.query.location) params.location = req.query.location.split(",");
  if (req.query.time) params.time = req.query.time;
  if (req.query.edu) params.edu = req.query.edu;
  if (req.query.exp) params.exp = req.query.exp;

  var fields = {
    type: params.type,
    count: params.number,
    skip: Math.floor((Math.random() * 100) + 1)
  };

  console.log(params);
  Listing.find(fields, function(err, listings) {
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

// Update the resume of a user
router.post("/users/id/:id/resume", function(req, res, next) {
  Searcher.findById(req.params.id, function(err, searcher) {
    if (err) next(err);
    if (searcher.type === "searcher") {
      searcher.resume = req.body;
      searcher.save();
    }
  });
});

// Update the search preferences of the user
router.post("/users/id/:id/searchprefs", function(req, res, next) {
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
router.post("/companies", function(req, res, next) {
  Company.create(req.body, function(err, company) {
    if (err) next(err);
    res.json(company);
  });
});

// ___________________listings___________________
router.post("/listings", function(req, res, next) {
  Listing.create(req.body, function(err, listing) {
    if (err) next(err);
    res.json(listing);
  });
});

// =============================================================================
// DELETE
// =============================================================================

// ___________________users___________________
router.delete("/users/id/:id", function(req, res, next) {
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
router.delete("/companies/id/:id", function(req, res, next) {
  Company.findByIdAndRemove(req.params.id, req.body, function(err, company) {
    if (err) next(err);
    res.json(company);
  });
});

// ___________________listings___________________
router.delete("/listings/id/:id", function(req, res, next) {
  Company.findByIdAndRemove(req.param.id, req.body, function(err, listing) {
    if (err) next(err);
    res.json(listing);
  });
});

module.exports = router;
