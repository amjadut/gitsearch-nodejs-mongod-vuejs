var express = require('express');
var router = express.Router();
var gitsearch_reports_controller = require('../controllers/gitsearch_reports_controller');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET search listing. */
router.get('/list', urlencodedParser, function (req, res) {
	gitsearch_reports_controller.gitSearchReportAction(req,res);
});

module.exports = router;
