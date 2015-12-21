var url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
var attrib='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
var cartoDbMap = new L.TileLayer(url, {attribution: attrib}); 

customMarker = L.circleMarker;

var map = L.map('map', {
    center: [40.71623733, -73.98472309],
    zoom: 15,
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    },
    layers: [cartoDbMap]
});

$.ajax({
    dataType: 'jsonp',
    url: "https://gist.github.com/mtvaccaro/810550ef313f81d942b8#file-les_sales_geocoded-json",
    success: function(response) {
        $.each(eval(response), function(key, val) {  
        var lon = val.lon;
        var lat = val.lat;
        var date = val.saledate;
        var price = val.price;
        var address = val.address;
        var apt = val.apt;
        var yrbuilt = val.yrbuilt;
        var popUpContent = "<dl><dt>"+address+" "+apt+ "</dt>"
                            + "<dt>Year Built: "+yrbuilt+"</dt>"
                            + "<dt>Sale Date: "+date+ "</dt>" 
                            + "<dt>Price: " + "$"+ price + "</dt>"
                            "</dl>";
        
        marker = new customMarker([lat,lon], {
            opacity: 0.4
        });
        marker.bindPopup(popUpContent);
        marker.setRadius(5);
        marker.addTo(map)
    });
    }
});

