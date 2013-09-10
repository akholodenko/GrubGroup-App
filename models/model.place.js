var init_place_model = function () {
	/**	PLACE model	*/
	App.Place = Backbone.Model.extend({
		defaults: {
			id: "",
			is_claimed: false,
			distance: 0,
			mobile_url: "",
			rating_img_url: "",
			review_count: 0,
			name: "",
			snippet_image_url: "",
			rating: 0,
			url: "",
			location: {
				city: "",
				display_address: [""],
				neighborhoods: [""],
				postal_code: "",
				country_code: "",
				address: [""],
				state_code: ""
			},
			phone: "",
			snippet_text: "",
			image_url: "",
			categories: [[""]],
			display_phone: "",
			rating_img_url_large: "",
			is_closed: true,
			rating_img_url_small: ""
		},
		fetch_suggestion: function () {
			var that = this;

			// default location to 128 King if not set
			if(App.user == null || (App.user.latitude == null || App.user.longitude == null)) {
				App.user.latitude = '37.77951';
				App.user.longitude = '-122.39071';
			}

			var api_url = 'http://artem.dev.inpwrd.net/?radius=1250&lat=' + App.user.latitude + '&lon=' + App.user.longitude + '&callback=?';
			console.log('calling API: ' + api_url);
			console.log('location: ' + App.user.latitude + ',' + App.user.longitude);

			$.getJSON(api_url, null, function (response) {
				that.parse(response); // call the parse function, to process the results and create models in collection
			});
		},
		parse: function (response) {
			console.log(response);
			this.set(response);
			this.trigger(App.event.suggestion_loaded);
		}
	});
};