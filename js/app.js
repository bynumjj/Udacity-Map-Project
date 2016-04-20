

var map, infowindow, marker;

var initialVenues = [

{
		number: 230,
		name: 'St Ninians Hall',
		address:  '40 Comely Bank',
		zipcode: "EH4 1AG",
		LatLng: {lat: 55.959488, lng: -3.225575},
		imgSrc: '#',
		windowContent: "test message 1"
},

{
		number: 12,
		name: 'Stand Comedy Club 3 & 4',
		address:  '28 York Place',
		zipcode: "EH1 3EP",
		LatLng: {lat: 55.956461, lng: -3.190675},
		imgSrc: '#',
		windowContent: 'test message 2'
},

{
		number: 60,
		name: 'Canongate Kirk',
		address:  '153 Canongate',
		zipcode: "EH8 8BN",
		LatLng: {lat: 55.951827, lng: -3.179609},
		imgSrc: '#',
		windowContent: "test message 3"
}
];

// Venue() turns initial input data into ko.observable format.
// creates markers and click functions and adds them to venue items
// as a property.
var Venue = function(data) {
this.number = ko.observable(data.number);
this.name = ko.observable(data.name);
this.address = ko.observable(data.address);
this.zipcode = ko.observable(data.zipcode);
this.latlng = ko.observable(data.latlng);
this.imgSrc = ko.observable(data.imgSrc);

this.infowindow = new google.maps.InfoWindow();

this.marker = new google.maps.Marker({
    position: data.LatLng,
    map: map,
    animation: google.maps.Animation.DROP,
    title: data.name,
    content: data.windowContent
  });// end var marker
alert(this.marker.position);
// for toggling marker visibility
this.marker.visible = true;

// add click functions to markers
this.marker.addListener('click', (function() {
		// adds content to infowindow
	infowindow.setContent(this.content);
		//opens info window
	infowindow.open(map, this);
		// adds bounce animation
	if (this.getAnimation() !== null) {
    this.setAnimation(null);
  } else {
    this.setAnimation(google.maps.Animation.BOUNCE);
  }  // close else
  } // close function
)); // close marker.addListener
}// end Venue()


// ViewModel code
var ViewModel = function() {

var self = this;
this.searchTerm = ko.observable("");
this.venueList = ko.observableArray([]);

// adds each venue to observable array venueList
initialVenues.forEach(function(item){
	self.venueList.push(new Venue(item))
});

alert(this.venueList()[0].marker.position);
// creates the map
this.map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 55.95162, lng: -3.187821},
    scrollwheel: true,
    zoom: 12
  });

// pushes filtered venues into filteredList array
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
	}, self);  // end fileredList

}  // end ViewModel

function initMap() {
ko.applyBindings(new ViewModel());  //initializes ViewModel
}



// GoogleMaps key:  AIzaSyCVPY0V9qzsmmP-J0JL8Obl72Md73sKlXo