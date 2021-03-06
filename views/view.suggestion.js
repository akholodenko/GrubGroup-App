var init_suggestion_view = function () {

	/**	Suggestion PLACE view	*/
	App.SuggestionView = App.ParentView.extend({
		button_container: null,
		hold_button: null,
		next_button: null,
		is_hold: false,
		template: _.template(App.tpl.get('suggestion.view')),
		initialize: function () {
			console.log('init suggestion view');

			this.collection = new App.Places();	// instance of collection of places
			this.collection.on(App.event.suggestions_loaded, this.renderSuggestion, this);	// listener for list of places loaded
			this.collection.on(App.event.no_results_loaded, this.renderNoSuggestions, this);	// listener for no places found

			this.model = new App.Place();

			// render header/footer UI
			this.renderHeader('GrubFor.me says eat at...');
			this.renderFooter();

			// check if a place is "held" by user
			var hold_data = Utils.get_hold();

			// get places or show hold place
			if(hold_data === false) this.collection.fetch_suggestions();
			else this.renderHoldPlace(hold_data);
		},
		renderFooter: function () {
			this.$el.append("<div class='footer'></div>");
			this.footer = $('.footer');
			this.init_buttons();
		},
		// render UI of place and hold button
		renderSuggestion: function () {
			if(!this.is_hold)	// only if place isn't being held, get the next suggestion
				this.model = this.collection.fetch_suggestion();

			if(this.model != null) {
				console.log('count:' + this.collection.length + ', index: ' + this.collection.index);

				// add current location to view (used for map link)
				this.model.attributes['latitude'] = App.user.latitude;
				this.model.attributes['longitude'] = App.user.longitude;
				this.model.attributes['is_driving'] = App.user.settings.is_driving;

				this.view_content_el.html(this.template(this.model.toJSON()));	// add template to view in UI

				// send analytics about suggestion
				Track.sendSuggestionEvent(this.model.toJSON().location.city + ', ' + this.model.toJSON().location.state_code, this.model.toJSON().name);
			}
			return this;
		},
		renderNoSuggestions: function () {
			console.log('no suggestions found');
		},
		// render UI of place "held" by user
		renderHoldPlace: function (hold_data) {
			this.is_hold = true;
			this.hold_button.removeClass('off').addClass('on');	// update UI for holding
			this.model.set(hold_data);
			this.renderSuggestion();	// render hold place

			// in background, get list of suggestions once hold is off
			this.collection.fetch_suggestions(true);
		},
		init_buttons: function () {
			this.footer.append("<div id='button_container'></div>");
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
			"click a" : "hold_on", // click on any link turns on HOLD
			"click #hold_button" : "hold_button_toggle",
			"click #next_button" : "next_button_click"
		},
		hold_button_toggle: function (e) {
			// check if button is ON or OFF
			if(this.hold_button.hasClass('off')) this.hold_on(e);
			else  this.hold_off(e);

		},
		hold_on: function (e) {
			this.hold_button.removeClass('off').addClass('on');	// update UI for holding
			this.is_hold = true;	// set flag on for holding
			Utils.set_hold(this.model.toJSON());	// store place data in local storage
			Track.sendHoldButtonEvent(true);	// send analytics
		},
		hold_off: function (e) {
			this.hold_button.removeClass('on').addClass('off');	// update UI for not holding
			this.is_hold = false;	// set flag off for holding
			Utils.clear_hold();	// clear stored value in local storage
			Track.sendHoldButtonEvent(false);	// send analytics
		},
		next_button_click: function (e) {
			this.hold_off();	// clear hold before new suggestion
			//document.location = document.location;	// refresh suggestion
			this.view_content_el.html("<img class='loader_image' src='images/ajax-loader.gif'/>")
			Track.sendNextButtonEvent();	// send analytics
			this.renderSuggestion();
		}
	});
};