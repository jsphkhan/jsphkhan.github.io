define(['js/mediator/mediator'], function(mediator) {

	var TransactionListView = Backbone.View.extend({
		tagName: "div",
		className: "transaction-list-view",
		initialize: function() {
			console.log('Transaction List View initialized');

			//this.render();
		},
		render: function(args) {
			console.log('Transaction List View Rendered', args);
			this.$el.html('<h3>Transaction List View</h3>');
			if(typeof args === "object" && typeof args.name !== "undefined") {
				this.$el.append("<p>" + args.name + "</p><p>" + args.value + "</p>");
			}
			return this;
		}
	});

	return TransactionListView;
});