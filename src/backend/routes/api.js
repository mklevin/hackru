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
router.get("/searchers", function(req, res, next) {
  users = [];
  Searcher.find(function(err, searchers) {
    if (err) next(err);
    res.json(searchers);
  });
});

router.get("/searchers/id/:id", function(req, res, next) {
  Searcher.findById(req.params.id, function(err, searcher) {
    if (err) next(err);
    res.json(searcher);
  });
});

router.post("/searchers", function(req, res, next) {
  Searcher.create(req.body, function(err, searcher) {
    if (err) next(err);
    res.json(searcher);
  });
});

module.exports = router;
