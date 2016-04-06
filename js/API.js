function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // Google Streetview requests
var $street = $("#street").val();
var $city = $('#city').val();

var address = $street + ', ' + $city;
$greeting.text("So, you want to live at " + address + " ?");

var streetViewURL = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + address + '';
$body.append('<img class="bigimg" src="' + streetViewURL + '">');


// New York Times API


var nytKey = '71b356ad06eaae33e5ce4f0fb0a3a9fa:1:53370606';
var nytURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + $city +
    "&sort=newest&api-key=" + nytKey;

$.getJSON(nytURL, function(data) {

$nytHeaderElem.text('New York Times articles about ' + $city);
var articles = data.response.docs
var className = '<li class ="article">'
for (var i = 0; i < articles.length; i++) {
article = articles[i];
var url = '<a href="' + article.web_url + '">'
var headline = article.headline.main + '</a>'
var snippet = '<p>' + article.snippet + '</p></li>'
$nytElem.append(className + url + headline + snippet)
};

}).fail(function(e) {
    $nytHeaderElem.text("New York Times Articles Could Not Be Found")
});


// wikipedia API
// creates error message if request fails
var wikiRequestTimeout = setTimeout(function() {
    $wikiElem.text('failed to get wikipedia resources');
}, 8000);


var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + $city + '&prop=revisions&rvprop=content&format=json&callback=wikiCallback'

$.ajax({
    url: wikiURL,
    dataType: 'jsonp',
    success:  function(response) {

var articleList = response[1];

for (var i = 0; i < articleList.length; i++) {
articleStr = articleList[i];
var url = 'http://en.wikipedia.org/wiki/' + articleStr;
$wikiElem.append('<li><a href="' + url + '">'  + articleStr + '</a></li>');
};

clearTimeout(wikirequestTimeout);
    }
});






//Don't edit below
return false

}

$('#form-container').submit(loadData);
