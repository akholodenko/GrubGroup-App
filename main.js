App = new Object();
App.tpl = null;	// view template
App.user = null;

/**	app event types	*/
App.event = new Object();
App.event.suggestion_loaded = 'suggestion_loaded';
//App.event.show_loader = 'app_event_show_loader';

(function ($) {
	init_template_loader();

	// define placeholder for currently displayed view in router
	Backbone.Router.prototype.current_view = null;

	// router for different views of application
	var AppRouter = Backbone.Router.extend({
		initialize: function() {
			console.log('init app router');
		},
		routes: {
			"": "home",
			"external/:url":"external"
		},
		// route for home
		home: function() {
			init_place_model();
			init_suggestion_view();
			/*
			init_event_model();
			init_events_model();
			init_day_model();
			init_days_model();

			init_event_view();
			init_events_view();
			*/

			this.show_view(new App.SuggestionView());
		},
		// route for external event link in frame
		external: function(url) {
			/*
			url = decodeURIComponent(url);
			console.log('load: ' + url);

			init_event_model();
			init_external_view();

			var event = new App.Event();
			event.set({ link: url });

			this.show_view(new App.ExternalView({ model: event }));
			*/
		},
		// show desired view
		show_view: function(view) {
			this.current_view = view;
			return view;
		}
	});

	// load templates for views
	App.tpl.loadTemplates(['suggestion.view'], function() {
		window.app = new AppRouter();
		Backbone.history.start();
	});

} (jQuery));