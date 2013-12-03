var app = app || {};

app.AppView = Backbone.View.extend({
	events : {
		'click .add' : 'addPendiente'
	},
	initialize : function() {
		this.$input = this.$('#new-todo');
		this.$main = this.$('#main');
		this.listenTo(this.collection, 'add', this.addOne);
	},
	addOne : function(pendiente) {
		var view = new app.PendienteView({
			model : pendiente
		});
		this.$('#todo-list').append(view.render().el);
	},
	newAttributes : function() {
		return {
			title : this.$input.val().trim(),
			completed : false
		};
	},
	addPendiente : function(event) {
		this.collection.create(this.newAttributes());
		this.$input.val('');
	}
});
