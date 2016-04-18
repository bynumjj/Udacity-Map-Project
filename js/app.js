

var initialVenues = [
//NOTE:  This data could be downloaded from a server as a JSON
{
		number: 230,
		name: 'St Ninians Hall',
		address:  '40 Comely Bank',
		zipcode: "EH4 1AG",
		latlng: {lat: 55.959488, lng: -3.225575},
		imgSrc: '#',
		show: 'TBD',
		message: "test message",
		searchTerm: '',
		visible: true
},

{
		number: 12,
		name: 'Stand Comedy Club 3 & 4',
		address:  '28 York Place',
		zipcode: "EH1 3EP",
		latlng: {lat: 55.956461, lng: -3.190675},
		imgSrc: '#',
		show: 'TBD',
		message: "test message 2",
		searchTerm: '',
		visible: true
},

{
		number: 60,
		name: 'Canongate Kirk',
		address:  '153 Canongate',
		zipcode: "EH8 8BN",
		latlng: {lat: 55.951827, lng: -3.179609},
		imgSrc: '#',
		show: 'TBD',
		message: "test message 3",
		searchTerm: '',
		visible: true
}
];




var marker;

function initMap() {

  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 55.95162, lng: -3.187821},
    scrollwheel: true,
    zoom: 12
  }); // close var map


//iterates through venue array and creates markers for each location
// incorporate marker.setMap(null) to hide markers
// TODO  fix all onclicks bound to last maker
var makeMarker = function() {

for (var i = 0; i < initialVenues.length; i++) {
var marker = new google.maps.Marker({
    position: initialVenues[i].latlng,
    map: map,
    animation: google.maps.Animation.DROP,
    title: initialVenues[i].name

  });//end var marker

var infowindow = new google.maps.InfoWindow({
    content: initialVenues[i].message
  }); // end infowindow

marker.addListener('click', function() {
infowindow.open(map, marker);
});


function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}  // end toggleBounce

marker.addListener('click', toggleBounce);


}//end marker for loop
} //end makeMarker()

makeMarker()

} // end initMap






//Venue() turns initial input data into ko.observable format.
var Venue = function(data) {
this.number = ko.observable(data.number);
this.name = ko.observable(data.name);
this.address = ko.observable(data.address);
this.zipcode = ko.observable(data.zipcode);
this.latlng = ko.observable(data.latlng);
this.imgSrc = ko.observable(data.imgSrc);
this.visible = ko.observable(true);
}// end Venue()



// ViewModel code

var ViewModel = function() {

var self = this;
this.venueList = ko.observableArray([]); // will hold all new venues
this.searchTerm = ko.observable("");
initialVenues.forEach(function(item){  //  for each venue in intial venues, it converts it into Venue object
	self.venueList.push(new Venue(item) ) // and stores it in venueList array
});


this.filteredList = ko.computed(function() {
		var filter = self.searchTerm().toLowerCase();
		if (!filter) {
			return self.venueList();
		} else {
			return ko.utils.arrayFilter(self.venueList(), function(item) {
				var string = item.name().toLowerCase();
				return (string.indexOf(filter) >= 0);
			});
		}
	}, self);






/*
var filter = self.searchTerm().toLowerCase();
console.log(filter)
if (!filter) {
	return this.venueList();
} //end if

else {
	return ko.utils.arrayFilter(self.venueList(), function(venueItem) {
	return ko.utils.stringStartsWith(venueItem.name().toLowerCase(), filter);
}); // end fucntion(Venue.name)

}  // end utils.arrayFilter

}, self);   //end filteredVenues()

console.log(this.filteredVenues())

*/

/*this.filteredVenues = ko.computed(function() {
self.venueList().forEach(function(venueItem) {
	alert(self.venueItem.name)
	if ((self.venueItem.name.toLowerCase().indexOf(self.searchTerm().toLowerCase())) === -1) {
		return venueItem.visible = false
	}
	else {
		return venueItem.visible = true
	} // end else
}); // end forEach
}, self*/

}  // end ViewModel

ko.applyBindings(new ViewModel());  //initializes ViewModel


//draft filter function

/*
self.venueList().forEach(function(venueItem) {
	if ((venueItem.name.toLowerCase().indexOf(self.searchTerm().toLowerCase())) === -1) {
		return self.visible = false
	}
	else {
		return self.visible = true
	} // end else
}); // end forEach
*/




//this.currentVenue = ko.observable(this.venueList()[0]);  //asssigns venue object to currentVenue
//don't need this to display in nav list.  used for click function
// end ViewModel

/* This code could be used to add click functionality to select marker
this.incrementCounter = function() {
	self.currentCat().clickCount(self.currentCat().clickCount() + 1);
		};

// changes currentCat to cat clicked on in HTML list of cats
this.setCat = function(clickedCat) {
self.currentCat(clickedCat);
			}; // end setCat */

















//KEy  AIzaSyCVPY0V9qzsmmP-J0JL8Obl72Md73sKlXo