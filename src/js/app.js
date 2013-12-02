var app = app || {};
var ENTER_KEY = 13;
app.pendientes = new app.Pendientes();
app.AppView = Backbone.View.extend({
	el : '#pendientesapp',
	events : {
		'keypress #new-todo' : 'createOnEnter',
	},
	initialize : function() {
		this.$input = this.$('#new-todo');
		this.$main = this.$('#main');
		this.listenTo(app.Pendientes, 'add', this.addOne);
		app.Todos.fetch();
	},

	addOne : function(pendiente) {
		var view = new app.PendienteView({
			model : pendiente
		});
		$('#todo-list').append(view.render().el);
	},
	newAttributes : function() {
		return {
			title : this.$input.val().trim(),
			order : app.Pendientes.nextOrder(),
			completed : false
		};
	},

	createOnEnter : function(event) {
		if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
			return;
		}
		app.pendientes.create(this.newAttributes());
		this.$input.val('');
	},

	toggleAllComplete : function() {
		var completed = this.allCheckbox.checked;
	}
 });
    new app.AppView();