/**	Utils class	*/

Utils = function () {}

Utils.getLocation = function (callback) {
  	if (navigator.geolocation)
	    navigator.geolocation.getCurrentPosition(callback, function showError(error) {
	    		var error_message = '';
			  	switch(error.code) 
			    {
				    case error.PERMISSION_DENIED:
				      error_message = "We were not allowed to identify your location."
				      break;
				    case error.POSITION_UNAVAILABLE:
				      error_message = "We had a problem identifying your location."
				      break;
				    case error.TIMEOUT:
				      error_message = "We had a problem identifying your location."
				      break;
				    case error.UNKNOWN_ERROR:
				      error_message = "We had a problem identifying your location."
				      break;
			    }

				console.log(error_message);

				$('body').trigger(User.event_geolocation_denied, [{'message' : error_message}]);	// trigger event for geolocation denied
		  });
    else
		console.log("Geolocation is not supported by this browser.");
}

// returns GUID
Utils.get_guid = function () {
	var guid = null;

	// if browser supports localStorage
	if(typeof(Storage)!=="undefined") {
		// if user previously visited, retrieve GUI from localStorage
		if(localStorage.grubgroup_guid)
			guid = localStorage.grubgroup_guid;
		// if user is new, generate GUI and set in localStorage
		else {
			guid = UUID.create();
			localStorage.grubgroup_guid = guid;	// store new user's GUID for future reference
		}
	}
	// for this app instance, assign GUID
	else
		guid = UUID.create();

	return guid;
}

/**	store place's details in local storage	*/
Utils.set_hold = function (hold_data) {
	// if browser supports localStorage, store
	if(typeof(Storage)!=="undefined") {
		localStorage.grubgroup_hold = JSON.stringify(hold_data);
		return true;
	}
	else return false;
}

/**	get last held place from local storage	*/
Utils.get_hold = function () {
	var hold_data;
	// if browser supports localStorage
	if(typeof(Storage)!=="undefined") {
		// if there's data for holding
		if(localStorage.grubgroup_hold) hold_data = JSON.parse(localStorage.grubgroup_hold);
		else hold_data = false;

	}
	else hold_data = false;

	return hold_data;
}

Utils.clear_hold = function () {
	// if browser supports localStorage
	if(typeof(Storage)!=="undefined") {
		localStorage.removeItem('grubgroup_hold');
		return true;
	}
	else return false;
}