//Collection
var app = app || {};

app.Library = Backbone.Collection.extend({
	model: app.Book,
	url: '/api/books'   //URL defined the by Node server
});