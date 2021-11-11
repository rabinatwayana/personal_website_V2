// base osm layer
var osmLayer =new ol.layer.Tile({
	title: 'Base Map',
	source: new ol.source.OSM(),
	type: 'base'
})

// initializing map object
var map = new ol.Map({
    target: 'mainMap',
    layers: [
      osmLayer
    ],

    view: new ol.View({
      center: ol.proj.fromLonLat([84.1240, 28.3949]),
      zoom: 7
    })
  });


// administrativelayer
var administrativeLayer = new ol.layer.Image({
	visible: false,
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8080/geoserver/miniProject/wms',
		params: {'Layers' : 'miniProject:Nepal_Country'},
		serverType: 'geoserver'
	})
});

// districtlayer
var districtLayer = new ol.layer.Image({
	visible: false,
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8080/geoserver/miniProject/wms',
		params: {'Layers' : 'miniProject:Nepal_District'},
		serverType: 'geoserver'
	})
});

// populationlayer
var populationLayer = new ol.layer.Image({
	visible: false,
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8080/geoserver/miniProject/wms',
		params: {'Layers' : 'miniProject:Population'},
		serverType: 'geoserver'
	})
});



// landcoverlayer
var landCoverLayer = new ol.layer.Image({
	visible: false,
	source: new ol.source.ImageWMS({
	    url: 'http://localhost:8080/geoserver/miniProject/wms',
	    params: {'LAYERS': 'miniProject:geotiff_coverage_LULC'},
	    serverType: 'geoserver'
	})
});
// DEMlayer
var DEMLayer = new ol.layer.Image({
	visible: false,
	source: new ol.source.ImageWMS({
	    url: 'http://localhost:8080/geoserver/miniProject/wms',
	    params: {'LAYERS': 'miniProject:geotiff_coverage'},
	    serverType: 'geoserver'
	})
});


// roadslayer
var roadsLayer = new ol.layer.Image({
	visible: false,
	source: new ol.source.ImageWMS({
	    url: 'http://localhost:8080/geoserver/miniProject/wms',
	    params: {'LAYERS': 'miniProject:Roads'},
	    serverType: 'geoserver'
	})
});

// making the list of above layers
layers = {
	'administrativeLayerLegend':administrativeLayer,
	'districtLayerLegend':districtLayer,
	'populationLayerLegend':populationLayer,
	'landCoverLayerLegend':landCoverLayer,  
	'DEMLayerLegend':DEMLayer,
	'roadsLayerLegend':roadsLayer
};

// adding the layers to map using for loop
for (var key in layers)
{
	map.addLayer(layers[key]);
}

// initializing checkboxes from the document
$(function (){
	$('.layerCheckBox').change(
		function() {
			var legend = $(this).attr('data-legend')// which is also the key for layers dictionary
			if ($(this).is(':checked'))
			{
				layers[legend].setVisible(true);
				hideAllLegendExcept(legend);
			}
			else
			{
				layers[legend].setVisible(false);
			}
		}
	)
});

