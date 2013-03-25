dojo.require("esri.map");
//dojo.require("dijit.dijit");
dojo.require("esri.arcgis.utils");
dojo.require("dojo.parser");

var mapObj, Select_Point_Symbol_blue, WMRef;
var zoomLevel = 15; //16; // 2012-11-28 Changed by FGf

function initDojo() {
  
	esri.config.defaults.io.alwaysUseProxy = false;
	
    WMRef = new esri.SpatialReference({
        wkid: 3857
    });
	
	mapObj = new esri.Map("mapDiv", {
		basemap: "gray",
		displayGraphicsOnPan: false,
		fadeOnZoom: true,
		extent: new esri.geometry.Extent({xmin:-13076273.521312295,ymin:3998459.1681107134,xmax: -13001365.233592922,ymax:4057162.80583365,spatialReference:{wkid:102100}}), //min: -13076273.521312295, ymin: 3998459.1681107134, xmax: -13001365.233592922, ymax: 4057162.80583365
		zoom: 12,
		slider: true
	});
	
	dojo.connect(mapObj, "onLoad", function() {
		console.log("Map onLoad event");
		
		//after map loads, connect to listen to mouse move & drag events
		//http://developers.arcgis.com/en/javascript/jssamples/map_xycoords.html	  
		dojo.connect(mapObj, "onMouseMove", showCoordinates);
		dojo.connect(mapObj, "onMouseDrag", showCoordinates);
	  
	});
	
    Select_Point_Symbol_blue = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 30,
		new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
		new dojo.Color([0, 0, 255]), 4),
		new dojo.Color([0, 0, 255, 0]));
}

function showCoordinates(evt) {
	//get mapPoint from event
	//The map is in web mercator - modify the map point to display the results in geographic
	var mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);
	//display mouse coordinates
	dojo.byId("info").innerHTML = mp.x.toFixed(3) + ", " + mp.y.toFixed(3);
}

//START ADDING GRAPHICS
function zoomCenterMap(in_point) {
    mapObj.setLevel(zoomLevel);
    mapObj.centerAt(in_point);
    // Wiggle the Map
    //doMapWiggle();
}

// Zoom to a Latitude / Longitude Point
function zoomToLatLon(x, y) {
    var _point = new esri.geometry.Point(x, y, WMRef); 
    var _wmpoint = esri.geometry.geographicToWebMercator(_point);
    addSelectPoint(_wmpoint);
}

// Add a "Selected" Point on the Map
function addSelectPoint(in_point) {
    mapObj.graphics.clear();
    var selectingGraphic = new esri.Graphic(in_point, Select_Point_Symbol_blue);
    selectingGraphic.setAttributes({ "CloseMe":"" });//added to dismiss this graphic on click
    mapObj.graphics.add(selectingGraphic);
    // Zoom to Point
    zoomCenterMap(in_point);
}
