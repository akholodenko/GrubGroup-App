App = new Object();
App.tpl = null;	// view template
App.user = null;

/**	app event types	*/
App.event = new Object();
App.event.suggestion_loaded = 'suggestion_loaded';
App.event.suggestions_loaded = 'suggestions_loaded';
App.event.no_results_loaded = 'no_results_loaded';
//App.event.show_loader = 'app_event_show_loader';

(function ($) {
	init_template_loader();

	User.init();	// initialize user (location, guid, etc)


	// define placeholder for currently displayed view in router
	Backbone.Router.prototype.current_view = null;

	// router for different views of application
	var AppRouter = Backbone.Router.extend({
		initialize: function() {
			console.log('init app router');
		},
		routes: {
			"": "home",
			"home":"home",
			"external/:url":"external"
		},
		error: null,
		// route for home
		home: function() {
			init_place_model();
			init_place_collection();
			init_suggestion_view(this.error);

			this.show_view(new App.SuggestionView());
		},
		// route for external event link in frame
		external: function(url) {
		},
		// show desired view
		show_view: function(view) {
			this.current_view = view;
			return view;
		}
	});


	// once location is set & user is created
	$('body').on(User.event_created, function (e) {
		// load templates for views
		App.tpl.loadTemplates(['suggestion.view','header.component'], function() {
			window.app = new AppRouter();
			Backbone.history.start();
		});
	});

	// if there's a problem getting geolocation
	$('body').on(User.event_geolocation_denied, function (e) {
		$('.app').html('Unable to determine your location');
	});

} (jQuery));