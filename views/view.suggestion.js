var init_suggestion_view = function () {

	/**	Suggestion PLACE view	*/
	App.SuggestionView = Backbone.View.extend({
		el: $(".app"),
		view_content_el: null,
		button_container: null,
		hold_button: null,
		next_button: null,
		is_hold: false,
		template: _.template(App.tpl.get('suggestion.view')),
		initialize: function () {
			console.log('init suggestion view');

			this.model = new App.Place();
			this.model.on(App.event.suggestion_loaded, this.renderSuggestion, this);

			// render header UI
			this.renderHeader('GrubGroup says eat at...');

			// check if a place is "held" by user
			var hold_data = Utils.get_hold();

			if(hold_data === false)
				this.model.fetch_suggestion();
			else
				this.renderHoldPlace(hold_data);
		},
		renderHeader: function (text) {
			var header_template = _.template(App.tpl.get('header.component'));
			this.$el.html(header_template({'text' : text}));	// add template to header in UI

			// add view UI container and spinner until content loads
			this.$el.append("<div class='view_content'><img class='loader_image' src='images/ajax-loader.gif'/></div>");
			this.view_content_el = $('.view_content');
		},
		// render UI of place and hold button
		renderSuggestion: function () {
			this.view_content_el.html(this.template(this.model.toJSON()));	// add template to view in UI
			this.init_buttons();

			// send analytics about suggestion
			Track.sendSuggestionEvent(this.model.toJSON().location.city + ', ' + this.model.toJSON().location.state_code, this.model.toJSON().name);

			return this;
		},
		// render UI of place "held" by user
		renderHoldPlace: function (hold_data) {
			this.is_hold = true;
			this.model.set(hold_data);
			this.renderSuggestion();
		},
		init_buttons: function () {
			this.view_content_el.append("<div id='button_container'></div>");
			this.button_container = $("#button_container");

			this.init_hold_button();
			this.init_next_button();
		},
		// initialize hold button in UI
		init_hold_button: function () {
			var button_state = (this.is_hold) ? 'on' : 'off';	// determine if button is rendered turned ON or OFF

			this.button_container.append("<div id='hold_button' class='button round_corners_default " + button_state + "'>HOLD</div>");
			this.hold_button = $("#hold_button");
		},
		// initialize next button in UI
		init_next_button: function () {
			this.button_container.append("<div id='next_button' class='button round_corners_default'>NEXT</div>");
			this.next_button = $('#next_button');
		},
		events : {
			"click #hold_button" : "hold_button_toggle",
			"click #next_button" : "next_button_click"
		},
		hold_button_toggle: function (e) {
			// check if button is ON or OFF
			if(this.hold_button.hasClass('off')) this.hold_on();
			else  this.hold_off();

		},
		hold_on: function () {
			this.hold_button.removeClass('off').addClass('on');	// update UI for holding
			this.is_hold = true;	// set flag on for holding
			Utils.set_hold(this.model.toJSON());	// store place data in local storage
		},
		hold_off: function () {
			this.hold_button.removeClass('on').addClass('off');	// update UI for not holding
			this.is_hold = false;	// set flag off for holding
			Utils.clear_hold();	// clear stored value in local storage
		},
		next_button_click: function (e) {
			this.hold_off();	// clear hold before new suggestion
			//document.location = document.location;	// refresh suggestion
			this.view_content_el.html("<img class='loader_image' src='images/ajax-loader.gif'/>")
			this.model.fetch_suggestion();
		}
	});
};