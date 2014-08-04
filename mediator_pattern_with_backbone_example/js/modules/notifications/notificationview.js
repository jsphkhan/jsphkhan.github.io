define([], function() {

	var TransactionListView = Backbone.View.extend({
		tagName: "div",
		className: "transaction-list-view",
		initialize: function() {
			console.log('Transaction List View initialized');

			this.render();
		},
		render: function() {
			console.log('Transaction List View Rendered');
			this.$el.html('<p>Transaction List View</p>');
		}
	});

	return new TransactionListView();
});