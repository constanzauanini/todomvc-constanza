var app = app || {};

app.Pendientes = Backbone.Collection.extend({
	
	 model: app.Pendiente,
	 localStorage: new Backbone.LocalStorage('pendientes-backbone')	
});

