exports.gitSearchReportAction = function(reqObj,renderResponse) {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";
	var dataFind = {username: 'amjad'};
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("gitsearch");
		var page_num = reqObj.query.current_page_num;
		if (typeof page_num === 'undefined') {
			page_num = 1;
		}
		var take_count = 30;
		var skip_count = (page_num - 1) * take_count;
		/* Find the count of search results in the collection */
		dbo.collection("gitsearch").count(dataFind, function(err, result) {
			if (err) throw err;

			var totalCount = result;
			if (totalCount == 0) {
				/* If count is zero then render the page with default data */

				renderResponse.render('reports/gitsearch_report',{totalCount: totalCount, totalPages: 1, takeCount: take_count, currentPage: page_num, data: []});
			}
			else {
				/* If count is non-zero then using skip and limit take paginated data and render the page */
				dbo.collection("gitsearch").find(dataFind,{ projection: { _id: 0, username: 1, totalCount: 1, takeCount: 1, searchValue: 1, currentPage: 1 } }).skip(skip_count).limit(take_count).toArray(function(err, reportResponse) {
					if (err) throw err;
					if (reportResponse) {
						var totalPages = 1;
						if (totalCount%take_count==0) {
							totalPages = Math.floor(totalCount/take_count);
						}
						else {
							totalPages = Math.floor(totalCount/take_count);
							totalPages++;
						}

						renderResponse.render('reports/gitsearch_report',{totalCount: totalCount, totalPages: totalPages, takeCount: take_count, currentPage: page_num, data: reportResponse});
					}
				});
			}
		});
	});
}