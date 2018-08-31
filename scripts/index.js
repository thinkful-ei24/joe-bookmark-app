$(document).ready(function() {
	bookmarkList.bindEventListeners();
  
	api.getBookmarks((bookmarks) => {
		bookmarks.forEach((item) => store.addBookmark(item));
		bookmarkList.render();
	});
});