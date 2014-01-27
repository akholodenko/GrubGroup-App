var init_place_collection = function () {
	/**	Collection of Places	*/
	App.Places = Backbone.Collection.extend({
		model: App.Place,
		index: 0,	// hold current index of place to be returned for suggestion
		/*comparator: function (day) {
		 return day.date;
		 },*/
		fetch_suggestion: function () {
			if(this.length) {
				if(this.length <= this.index)	// index went past available set of items
					this.index = 0;	// reset index

				return this.at(this.index++);
			}
			else {
				this.fetch_suggestions();
				return null;
			}
		},
		fetch_suggestions: function (in_background) {
			var that = this;

			// default location to 128 King if not set
			if(App.user == null || (App.user.latitude == null || App.user.longitude == null)) {
				App.user.latitude = '37.77951';
				App.user.longitude = '-122.39071';
			}

			var AWS_API = 'http://artem.dev.inpwrd.net';
			var APPFOG_API = 'http://grubformeapi.aws.af.cm';

			var api_url = APPFOG_API + '/yelp/all?radius=1250&lat=' + App.user.latitude + '&lon=' + App.user.longitude + '&callback=?';
			console.log('calling API: ' + api_url);
			console.log('location: ' + App.user.latitude + ',' + App.user.longitude);

			$.getJSON(api_url, null, function (response) {
				that.parse(response, in_background); // call the parse function, to process the results and create models in collection
			});
		},
		parse: function (response, in_background) {
			var that = this;

			if(response == null) response = new Array();

			this.reset(); // clear current set of days (models)

			// no events found
			if(response.length == 0) {
				this.trigger(App.event.no_results_loaded);
			}
			else {
				// for each day, loop through to process events
				response.forEach(function(item, index, array) {
					var place = new App.Place();
					place.set(item);
					that.add(place);
				});

				// trigger event if request is not to run in the background
				if(in_background ==  undefined || in_background ==  false)
					this.trigger(App.event.suggestions_loaded);
			}
		}
	});
};