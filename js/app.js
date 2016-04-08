

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
		message: "test message"
},

{
		number: 12,
		name: 'Stand Comedy Club 3 & 4',
		address:  '28 York Place',
		zipcode: "EH1 3EP",
		latlng: {lat: 55.956461, lng: -3.190675},
		imgSrc: '#',
		show: 'TBD',
		message: "test message 2"
},

{
		number: 60,
		name: 'Canongate Kirk',
		address:  '153 Canongate',
		zipcode: "EH8 8BN",
		latlng: {lat: 55.951827, lng: -3.179609},
		imgSrc: '#',
		show: 'TBD',
		message: "test message 3"
}
]




var marker;

function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 55.95162, lng: -3.187821},
    scrollwheel: true,
    zoom: 12
  });


//iterates through venue array and creates markers for each location
// incorporate   marker.setMap(null)
for (var i = 0; i < 3; i++) {
var marker = new google.maps.Marker({
    position: initialVenues[i].latlng,
    map: map,
    //animation: google.maps.Animation.DROP,
    title: initialVenues[i].name

  });//end marker

var infowindow = new google.maps.InfoWindow({
    content: initialVenues[i].message
  });

marker.addListener('click', toggleBounce);
marker.addListener('click', function() {
infowindow.open(map, marker);
});

}//end marker for loop



function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}  // end toggleBounce


}//end initMap
















//KEy  AIzaSyCVPY0V9qzsmmP-J0JL8Obl72Md73sKlXo