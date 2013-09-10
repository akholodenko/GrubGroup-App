var init_suggestion_view = function () {

	/**	Suggestion PLACE view	*/
	App.SuggestionView = Backbone.View.extend({
		el: $(".app"),
		hold_button: null,
		is_hold: false,
		template: _.template(App.tpl.get('suggestion.view')),
		initialize: function () {
			console.log('init suggestion view');

			this.model = new App.Place();
			this.model.on(App.event.suggestion_loaded, this.renderSuggestion, this);

			// check if a place is "held" by user
			var hold_data = Utils.get_hold();

			if(hold_data === false)
				this.model.fetch_suggestion();
			else
				this.renderHoldPlace(hold_data);
		},
		// render UI of place and hold button
		renderSuggestion: function () {
			this.$el.html(this.template(this.model.toJSON()));	// add template to view in UI
			this.init_hold_button();
			return this;
		},
		// render UI of place "held" by user
		renderHoldPlace: function (hold_data) {
			this.is_hold = true;
			this.model.set(hold_data);
			this.renderSuggestion();
		},
		// initialize hold button in UI
		init_hold_button: function () {
			var button_state = (this.is_hold) ? 'on' : 'off';	// determine if button is rendered turned ON or OFF

			this.$el.append("<div id='hold_button' class='round_corners_default " + button_state + "'>HOLD</div>");
			this.hold_button = $("#hold_button");
		},
		events : {
			"click #hold_button" : "hold_button_toggle"
		},
		hold_button_toggle: function (e) {
			// check if button is ON or OFF
			if(this.hold_button.hasClass('off')) {
				this.hold_button.removeClass('off').addClass('on');	// update UI for holding
				this.is_hold = true;	// set flag on for holding
				Utils.set_hold(this.model.toJSON());	// store place data in local storage
			}
			else {
				this.hold_button.removeClass('on').addClass('off');	// update UI for not holding
				this.is_hold = false;	// set flag off for holding
				Utils.clear_hold();	// clear stored value in local storage
			}

		}
	});
};