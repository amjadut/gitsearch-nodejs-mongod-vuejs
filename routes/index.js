var express = require('express');
var router = express.Router();
var gitsearch_controller = require('../controllers/gitsearch_controller');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET landing page. */
router.get('/', function(req, res, next) {

	res.render('git_search/gitsearch',{totalCount: 0, totalPages: 0, takeCount: 30, currentPage: 1, searchValue: '', data: [], errorMessage: ''});
});

/* GET search results page. */
router.get('/gitsearch', urlencodedParser, function (req, res) {

	gitsearch_controller.performGitSearch(req,res);
});

module.exports = router;
