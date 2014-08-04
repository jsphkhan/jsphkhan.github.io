
define(['js/modules/accountsummary/accountsummarymodel'],function(AccountSummaryModel) {
	var AccountSummaryCollection = Backbone.Collection.extend({
		initialize: function() {
			console.log('Account Summary Collection initialized');
		},
		model: AccountSummaryModel,
		parse: function(rawResponse) {
			console.log('Inside Parse', rawResponse.data);
			return rawResponse.data;
		}
	});
	return AccountSummaryCollection;
});