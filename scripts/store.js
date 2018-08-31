const store = function() {
	console.log('store is running');
	const addBookmark = function(bookmark) {
		bookmark.expand = false;
		this.bookmarks.push(bookmark);
	};

	const findById = function(id) {
		this.items = this.items.filter(bookmark => bookmark.id === id);
	};

	const findAndDelete = function(id) {
		this.items = this.items.filter(bookmark => bookmark.id !== id);
	};


	return {
		bookmarks: [],
		sortByRating: 0,
		searchTerm: '',
		addingBookmark: false,
		ratingSort: 0,
		addBookmark,
		findById,
		findAndDelete,
	};
} ();