var app = app || {};
app.Pendiente = Backbone.Model.extend({
	defaults : {
		title : '',
		completed : false
	},

	changeState : function() {
		this.save({
			completed : !this.get('completed')
		});
	}

});

