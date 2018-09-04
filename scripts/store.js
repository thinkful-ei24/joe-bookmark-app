const store = function() {
	console.log('store is running');
	const addBookmark = function(bookmark) {
		bookmark.expand = false;
		this.bookmarks.push(bookmark);
	};

	const findById = function(id) {
		this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id === id);
	};

	const findAndDelete = function(id) {
		this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
	};

	const setSearchTerm = function(term) {
		this.searchTerm = term;
	};

	return {
		bookmarks: [],
		sortByRating: 0,
		searchTerm: '',
		addingBookmark: false,
		ratingSort: 1,
		searchTerm: '',
		addBookmark,
		findById,
		findAndDelete,
		setSearchTerm
	};
} ();