var public_spreadsheet_url = "https://docs.google.com/spreadsheet/pub?key=0AiK02J6OppqxdGxCOEpWcDI2bXc0cnRmR1hCbk0zM2c&output=html";
var data;

//once tabletop gets its data, run this to store in the above variable data
var response = function(spreadsheetRows){	
	$('#userBday').submit(compareDates);
	$('#userBday').addClass('readyToSubmit');
	data = spreadsheetRows;
}

var compareDates = function(event){
	//tell the browser not to submit the form
	event.preventDefault();
	//format those date strings
	var numberCongressInOfficeLonger = 0;
	//grab the user birthday submitted through the form and format using moment
	var userBday = $('#inputUserBday').val();
	//loop over each row in the date_took_office column in the spreadsheet	
	for(var i = 0; i < data.length; i++){
		var congresspersonStartDate = data[i].datetookoffice;
		//if the congress start dates is before the user's birthdate, iterate
		if (moment(congresspersonStartDate).isBefore(userBday)) {
			numberCongressInOfficeLonger++
		}
	}
	//calculate the result total iterated as a percentage
	var percentOfCongressInOfficeLonger = Math.round((numberCongressInOfficeLonger / data.length) * 100);
	var percentOfCongressInOfficeLongerString = percentOfCongressInOfficeLonger + '%';
	//output the percentage into the div
	$('#bdayOutput').html( '<p><span id="congressLongerPercent">' + (percentOfCongressInOfficeLongerString) +'</span> of Congress has been in office longer than you\'ve been alive.' );
};

Tabletop.init( { 
    key: public_spreadsheet_url, callback: response, simpleSheet: true,
} )
