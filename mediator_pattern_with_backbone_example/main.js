require(['js/modules/accountsummary/accountsummaryview', 'js/modules/transactionlist/transactionlistview', 'js/modules/trackspending/trackspendingview', 'js/mediator/mediator'], function(AccountSummaryView, TransactionListView, TrackSpendingView, mediator) {

	var MainView = Backbone.View.extend({
		el: "#container",
		events: {
			'click #as':'handleAs',
			'click #tl':'handleTl',
			'click #ts':'handleTS'
		},
		handleAs: function() {
			console.log('Account Summary Click');
			this.$el.find('#holder').html(new AccountSummaryView().render().el);

		},
		handleTl: function(args) {
			console.log('Transaction List Click');
			this.$el.find("#holder").html(new TransactionListView().render(args).el);

		},
		handleTS: function() {
			console.log('Track Spending Click');
			this.$el.find("#holder").html(new TrackSpendingView().render().el);

		},
		initialize: function() {
			console.log('Application initialized');
			var self = this;
			//configuring the mediator subscribers
			mediator.subscribe('handleRowClick', function(args) {
				//alert('Handle Row Click through Mediator');
				self.handleTl(args);
			});
		}
	});
	

	new MainView();
});