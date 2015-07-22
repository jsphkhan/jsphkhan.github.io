//Model
var app = app || {};

app.Book = Backbone.Model.extend({
	defaults: {
		coverImage: 'img/placeholder.png',
		title: 'No title',
		author: 'Unknown',
		releaseDate: 'Unknown',
		keywords: 'None'
	},
	initialize: function() {
		console.log('Model Instance Created');
	},
	parse: function(response) {
		response.id = response._id; //this is important since backbone does not understand _id
		return response;
	}
});