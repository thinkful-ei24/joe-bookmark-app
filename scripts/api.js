const api = function() {
	console.log('api is running');
	const BASE_URL = ' https://thinkful-list-api.herokuapp.com/joe/bookmarks';

	const getBookmarks = function(callback) {
		//get bookmarks from api
		$.getJSON(`${BASE_URL}`, callback);
	};

	const createNewBookmark = function(bookmarkInfo, callback, errorCallback) {
		let newBookmark = JSON.stringify(bookmarkInfo);
		$.ajax({
			url: `${BASE_URL}`,
			method: 'POST',
			contentType: 'application/json',
			data: newBookmark,
			success: callback,
			error: errorCallback
		});
	};

	const deleteBookmark = function(id, callback, errorCallback) {
		//delete a bookmark on the api store
		$.ajax({
			url: `${BASE_URL}/${id}`,
			method: 'DELETE',
			contentType: 'application/json',
			success: callback,
			error: errorCallback
		});
	};

	return {
		getBookmarks,
		createNewBookmark,
		deleteBookmark
	};
}();