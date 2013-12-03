 var app = app || {};


  $(function() {
	var pendientes=new app.Pendientes();
    new app.AppView({
    	el : '#pendientesapp',
    	collection : pendientes
    });
    pendientes.fetch();
  });
  