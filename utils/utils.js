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
				      Track.send_deny_geolocation_event();
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
			    
			    $('.tip').text(error_message).show();

				$('body').trigger(User.event_request_zipcode, []);	// get zipcode manually from user
			  });    
    else
    	$('.tip').text("Geolocation is not supported by this browser.").show();
}

// returns GUID
Utils.get_guid = function () {	
	var guid = null;
	
	// if browser supports localStorage
	if(typeof(Storage)!=="undefined") {
		// if user previously visited, retrieve GUI from localStorage
		if(localStorage.eventgrazer_guid)
			guid = localStorage.eventgrazer_guid;	
		// if user is new, generate GUI and set in localStorage
		else {
			guid = UUID.create();	
			localStorage.eventgrazer_guid = guid;	// store new user's GUID for future reference
		}
	}
	// for this app instance, assign GUID
	else
		guid = UUID.create();
		
	return guid;
}
// returns formatted date based on input
Utils.formatTime = function (date) {
    var start_date = date.split(" ");
    var start_date_day = start_date[0];
    var start_date_time  = start_date[1];

    start_date_day = start_date_day.split("-");
    start_date_time = start_date_time.split(":");

    var d = new Date(start_date_day[0], start_date_day[1] - 1, start_date_day[2], start_date_time[0], start_date_time[1], start_date_time[2] );

    return (d.toLocaleTimeString());
}

// returns formatted date based on input
Utils.formatDate = function (date) {
    var start_date = date.split(" ");
    var start_date_day = start_date[0];
    var start_date_time  = start_date[1];

    start_date_day = start_date_day.split("-");
    start_date_time = start_date_time.split(":");
	    
    var d = new Date(start_date_day[0], start_date_day[1] - 1, start_date_day[2], start_date_time[0], start_date_time[1], start_date_time[2] );
    return (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();
}

// return formatted day's date
Utils.formatDay = function (date) {
	var day, date, month, year;
	
	switch (date.getUTCDay()) {
		case 0:
			day = "Sunday";
			break;
		case 1:
			day = "Monday";
			break;
		case 2:
			day = "Tuesday";
			break;
		case 3:
			day = "Wednesday";
			break;
		case 4:
			day = "Thursday";
			break;
		case 5:
			day = "Friday";
			break;
		case 6:
			day = "Saturday";
			break;														
	}
	
	switch (date.getUTCMonth()) {
		case 0:
			month = "January";
			break;
		case 1:
			month = "February";
			break;
		case 2:
			month = "March";
			break;
		case 3:
			month = "April";
			break;
		case 4:
			month = "May";
			break;
		case 5:
			month = "June";
			break;
		case 6:
			month = "July";
			break;
		case 7:
			month = "August";
			break;
		case 8:
			month = "September";
			break;
		case 9:
			month = "October";
			break;
		case 10:
			month = "November";
			break;
		case 11:
			month = "December";
			break;															
	}
	
	return day + ', ' + month + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear();
}