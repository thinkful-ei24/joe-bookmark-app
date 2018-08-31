const api = function() {
	const BASE_URL = ' https://thinkful-list-api.herokuapp.com/joe/items';

	const getBookMarks = function(callback) {
		$.getJSON(BASE_URL, callback);
	};

	const createBookMark = function(title, success, error) {
		const newBookMark = title;
		console.log(newBookMark);

		$.ajax({

		});
	};

	return {

	};
}();