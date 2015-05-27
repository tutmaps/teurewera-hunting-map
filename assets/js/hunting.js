var map, featureList, huntingareaSearch = [], maraeSearch = [], campsiteSearch = [], carparkSearch = [], hutSearch = [];

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

$(document).on("mouseover", ".feature-row", function(e) {
  highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
});

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(huntingareas.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  $('#sidebar').toggle();
  map.invalidateSize();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  $("#sidebar").toggle();
  map.invalidateSize();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  $('#sidebar').hide();
  map.invalidateSize();
});

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

function syncSidebar() {
  /* Empty sidebar features */
  $("#feature-list tbody").empty();
  /* Loop through maraes layer and add only features which are in the map bounds */
  maraes.eachLayer(function (layer) {
    if (map.hasLayer(maraeLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/marae.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
 
  /* Loop through campsites layer and add only features which are in the map bounds */
  campsites.eachLayer(function (layer) {
    if (map.hasLayer(campsiteLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/camping.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Loop through carparks layer and add only features which are in the map bounds */
  carparks.eachLayer(function (layer) {
    if (map.hasLayer(carparkLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/carpark.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Loop through huts layer and add only features which are in the map bounds */
  huts.eachLayer(function (layer) {
    if (map.hasLayer(hutLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/hut.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Update list.js featureList */
  featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });
}

/* Basemap Layers */
L.mapbox.accessToken = 'pk.eyJ1IjoidGUtdXJ1LXRhdW1hdHVhIiwiYSI6Ik9EQ1ZRRHcifQ.GEzpoVoQluLYpyjnjq2RtQ';
var mapboxStreets = L.tileLayer('https://a.tiles.mapbox.com/v4/maptec.l62kg4fn/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
    maxZoom: 14,
    minZoom: 5,
    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank"></a>'
});
var mapboxSatellite = L.tileLayer('https://a.tiles.mapbox.com/v4/maptec.l622jkj0/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
    maxZoom: 11,
    minZoom: 5,
    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank"></a>'
});
var topo50 = L.tileLayer('http://tiles-a.data-cdn.linz.govt.nz/services;key=6cd48aeb0e094593b002f67ef2d58ff7/tiles/v4/layer=2343/EPSG:3857/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 14,
    attribution: '<a href="http://www.linz.govt.nz" target="_blank"></a>'
});
var topo250 = L.tileLayer('http://tiles-a.data-cdn.linz.govt.nz/services;key=6cd48aeb0e094593b002f67ef2d58ff7/tiles/v4/layer=2324/EPSG:3857/{z}/{x}/{y}.png', {
    maxZoom: 14,
    minZoom: 9,
    attribution: '<a href="http://www.linz.govt.nz" target="_blank"></a>'
});
var aerialphoto = L.tileLayer('http://tiles-a.data-cdn.linz.govt.nz/services;key=6cd48aeb0e094593b002f67ef2d58ff7/tiles/v4/set=2/EPSG:3857/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 13,
    attribution: '<a href="http://www.linz.govt.nz" target="_blank"></a>'
});

/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00ffff",
  fillOpacity: 0.7,
  radius: 10,
};

/*var doctracks = L.tileLayer.wms("http://geoportal.doc.govt.nz/arcgis/services/GeoportalServices/DOC_Tracks/MapServer/WMSServer", {
  format: 'image/png',
  transparent: true,
  version: '1.3.0',
  layers: 0,
  maxZoom: 20,
  minZoom: 9
});*/

var mangamako = L.geoJson (null, {
style: function (feature) {
    if (feature.properties.id === 4381623) {
      return {
        color: "red",
        fillColor: "red",
        fill: true,
        fillOpacity: 0.1,
        opacity: 1,
        weight: 1,
        };
      }
    },
});

$.getJSON("data/mangamako.geojson", function (data) {
  mangamako.addData(data);
});

var pesticidebuffers = L.geoJson(null, {
  style: function (feature) {
    if (feature.properties.distance === 1000) {
      return {
        color: "#6B082B",
        fillColor: "#6B082B",
        fill: true,
        fillOpacity: 0.3,
        opacity: 0.5,
        weight: 1,
        dashArray: '3'
        };
      }
    if (feature.properties.distance === 2000) {
      return {
        color: "#AE0E46",
        fillColor: "#AE0E46",
        fill: true,
        fillOpacity: 0.5,
        opacity: 0.5,
        weight: 1,
        dashArray: '3'
        };
      }
    if (feature.properties.distance === 5000) {
      return {
        color: "#F11360",
        fillColor: "#F11360",
        fill: true,
        fillOpacity: 0.5,
        opacity: 0.5,
        weight: 1,
        dashArray: '3'
        };
      }
    },

onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-responsive table-striped table-bordered table-condensed'>" + 
                    "<thead><tr><th>Buffer distance(m)</th><th>Do not take or eat</th></tr></thead>" +
                    "<tr><td>" + feature.properties.distance + "</td><td>" + feature.properties.DNT + "</td><td>" +
                    "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html("Pesticide Buffer Area");
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }

    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#fff000",
          dashArray: '',
          opacity: 1
        });
        // layer.bindPopup(feature.properties.ptype, {'offset': new L.point(0, -20)})
        // .openPopup();
        layer.bringToFront();
        /*if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }*/
      },
      mouseout: function (e) {
        pesticidebuffers.resetStyle(e.target);
        /*layer.bindPopup(feature.properties.ptype, {'offset': new L.point(0, -20)})
        .closePopup(layer);*/
      }
    });
  }
});


  $.getJSON("data/pestbuff.geojson", function (data) {
  pesticidebuffers.addData(data);
});

var pesticideareas = L.geoJson(null, {
  style: function (feature) {
    if (feature.properties.Op_ID === 88) {
      return {
        color: "#9a9a00",
        fillColor: "yellow",
        fill: true,
        fillOpacity: 0.5,
        opacity: 0.7,
        weight: 2,
        dashArray: '4',
        };
      }
    if (feature.properties.Op_ID === 85) {
      return {
        color: "#9e1214",
        fillColor: "#e31a1c",
        fill: true,
        fillOpacity: 0.4,
        opacity: 0.7,
        weight: 2,
        dashArray: '4'
        };
      }
    },
    // TODO filter pesticide records to display only active operations
/*filter: function(feature, layer) {
  var unixtime = new Date();
  unixtime.setDate(unixtime.getDate() + 0);
  feature.properties.end_unixti >= unixtime;
   },*/

onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-responsive table-striped table-bordered table-condensed'>" + 
                    "<thead><tr><th>Pesticide</th><th>Bait</th><th>Method</th><th>Approx. Expiry Date</th></tr></thead>" +
                    "<tr><td>" + feature.properties.Pest1 + "</td><td>" + feature.properties.Bait1 + "</td><td>" + feature.properties.Meth1 + "</td><td>" + feature.properties.EndDate1 + "</td></tr>" +
                    "<tr><td>" + feature.properties.Pest2 + "</td><td>" + feature.properties.Bait2 + "</td><td>" + feature.properties.Meth2 + "</td><td>" + feature.properties.EndDate2 + "</td></tr>" +
                    "<tr><td>" + feature.properties.Pest3 + "</td><td>" + feature.properties.Bait3 + "</td><td>" + feature.properties.Meth3 + "</td><td>" + feature.properties.EndDate3 + "</td></tr>" +
                    /*"<tr><th>Pesticide</th><td>" + feature.properties.Pest1 + "</td></tr>" + 
                    "<tr><th>Pesticide</th><td>" + feature.properties.Pest2 +"</td></tr>" + 
                    "<tr><th>Pesticide</th><td>" + feature.properties.Pest3 +"</td></tr>" + */
                    "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Op_Cat + ' at ' + feature.properties.Op_Name + "<br>" + 'taking of animals is not recommended in pesticide areas');
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }

    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#fff000",
          dashArray: '',
          opacity: 1
        });
        // layer.bindPopup(feature.properties.ptype, {'offset': new L.point(0, -20)})
        // .openPopup();
        layer.bringToFront();
        /*if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }*/
      },
      mouseout: function (e) {
        pesticideareas.resetStyle(e.target);
        /*layer.bindPopup(feature.properties.ptype, {'offset': new L.point(0, -20)})
        .closePopup(layer);*/
      }
    });
  }
});

$.getJSON("data/pestsumm.geojson", function (data) {
  pesticideareas.addData(data);
});

var huntingareas = L.geoJson(null, {
  style: function (feature) {
    if (feature.properties.hid === 2) {
      return {
        color: "#000000",
        fillColor: "#667c26",
        fill: true,
        fillOpacity: 0.1,
        opacity: 0.5,
        weight: 2,
        };
      }
    if (feature.properties.hid === 1) {
      return {
        color: "#000000",
        fillColor: "#0e2d2e",
        fill: true,
        fillOpacity: 0.5,
        opacity: 0.5,
        weight: 2
        };
      }
    if (feature.properties.hid === 4) {
      return {
        color: "#000000",
        fillColor: "#82caff",
        fill: true,
        fillOpacity: 0.5,
        opacity: 0.5,
        weight: 2
        };
      }
    if (feature.properties.hid === 5) {
      return {
        color: "#000000",
        fillColor: "#0098cf",
        fill: true,
        fillOpacity: 0.5,
        opacity: 0.5,
        weight: 2
        };
      }
    if (feature.properties.hid === 3) {
      return {
        color: "#000000",
        fillColor: "#2554c7",
        fill: true,
        fillOpacity: 0.5,
        opacity: 0.5,
        weight: 2
        };
      }
    if (feature.properties.hid === 6) {
      return {
        color: "#000000",
        fillColor: "#2e0f0e",
        fill: true,
        fillOpacity: 0.5,
        opacity: 0.5,
        weight: 2
        };
      }
    },

onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Current hunting availability</th><td>" + feature.properties.block + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html("Status");
          // $("#feature-title").html(feature.properties.block);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 4,
          color: "#ffffff",
          opacity: 1
        });
        /*layer.bindPopup(feature.properties.block, {'offset': new L.point(0, -20)})
        .openPopup();*/
        layer.bringToBack();
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.webkit) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        huntingareas.resetStyle(e.target);
        /*layer.bindPopup(feature.properties.block, {'offset': new L.point(0, -20)})
        .closePopup(layer);*/
      }
    });
  }
});

$.getJSON("data/huntingarea.geojson", function (data) {
  huntingareas.addData(data);
});

/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});

/* Empty layer placeholder to add to layer control for listening when to add/remove maraes to markerClusters layer */
var maraeLayer = L.geoJson(null);
var maraes = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/marae.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html("Marae");
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/marae.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      maraeSearch.push({
        name: layer.feature.properties.NAME,
        source: "Maraes",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/maraes.geojson", function (data) {
  maraes.addData(data);
});

/* Empty layer placeholder to add to layer control for listening when to add/remove campsites to markerClusters layer */
var campsiteLayer = L.geoJson(null);
var campsites = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/camping.png",
        iconSize: [32, 37],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html("Campsite");
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/camping.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      campsiteSearch.push({
        name: layer.feature.properties.NAME,
        source: "Campsites",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/campsites.geojson", function (data) {
  campsites.addData(data);
});

/* Empty layer placeholder to add to layer control for listening when to add/remove carparks to markerClusters layer */
var carparkLayer = L.geoJson(null);
var carparks = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/carpark.png",
        iconSize: [32, 37],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html("Carpark");
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/carpark.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      carparkSearch.push({
        name: layer.feature.properties.NAME,
        source: "Carparks",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/carparks.geojson", function (data) {
  carparks.addData(data);
});

/* Empty layer placeholder to add to layer control for listening when to add/remove huts to markerClusters layer */
var hutLayer = L.geoJson(null);
var huts = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/hut.png",
        iconSize: [32, 37],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html("Hut");
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/hut.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      hutSearch.push({
        name: layer.feature.properties.NAME,
        source: "Huts",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/huts.geojson", function (data) {
  huts.addData(data);
});

map = L.map("map", {
  zoom: 9,
  center: [-38.4901, 176.9046],
  layers: [mapboxStreets, huntingareas, markerClusters, highlight],
  zoomControl: false,
  attributionControl: false,
  fullscreenControl: true,
  fullscreenControlOptions: {
    position: 'topleft'
  }
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
  if (e.layer === maraeLayer) {
    markerClusters.addLayer(maraes);
    syncSidebar();
  }
  if (e.layer === campsiteLayer) {
   markerClusters.addLayer(campsites);
   syncSidebar();
  }
  if (e.layer === carparkLayer) {
   markerClusters.addLayer(carparks);
   syncSidebar();
  }
  if (e.layer === hutLayer) {
   markerClusters.addLayer(huts);
   syncSidebar();
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === maraeLayer) {
    markerClusters.removeLayer(maraes);
    syncSidebar();
  }
  if (e.layer === campsiteLayer) {
    markerClusters.removeLayer(campsites);
    syncSidebar();
  }
  if (e.layer === carparkLayer) {
    markerClusters.removeLayer(carparks);
    syncSidebar();
  }
  if (e.layer === hutLayer) {
    markerClusters.removeLayer(huts);
    syncSidebar();
  }
});

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed for Te Uru Taumatua by <a href='http://www.maptec.org'>Maptec</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

var scaleControl = L.control.scale({
  metric: true,
}).addTo(map);

var locateControl = L.control.locate({
  position: "bottomright",
}).addTo(map);


/* GPS enabled geolocation control set to follow the user's location */
/*var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: false,
  markerStyle: {
    weight: 0.5,
    fillColor: "#0000FF",
    opacity: 0.8,
    fillOpacity: 0.7
  },
  circleStyle: {
    weight: 1,
    fillColor: "#00FFFF",
    clickable: false
  },
  // icon: "icon-direction",
  // icon: 'fa fa-location-arrow',
  metric: true,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);*/


/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}
var topographic = L.layerGroup([topo50, topo250]);
var imagery = L.layerGroup([mapboxSatellite, aerialphoto])
var baseLayers = {
  "Terrain": mapboxStreets,
  "NZ Topo maps": topographic,
  "Imagery": imagery,
};

var groupedOverlays = {
  "Points of Interest": {
    "<img src='assets/img/marae16.png' width='16' height='18'>&nbsp;Maraes": maraeLayer,
    "<img src='assets/img/camping16.png' width='16' height='18'>&nbsp;Campsites": campsiteLayer,
    "<img src='assets/img/carpark16.png' width='16' height='18'>&nbsp;Carparks": carparkLayer,
    "<img src='assets/img/hut16.png' width='16' height='18'>&nbsp;Huts": hutLayer
  },

  "Reference layers": {
    "Pesticides": pesticideareas,
    "Pesticide buffers": pesticidebuffers,
    "Hunting status": huntingareas,
    "Mangamako easement": mangamako,
    // "Hunting status<br><img src='assets/img/hunt.png' width='90' height='90'>&nbsp": huntingareas,
    // "Tracks": doctracks,
  }
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed,
}).addTo(map);


/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  /* Fit map to teureweras bounds */
  map.fitBounds(huntingareas.getBounds());
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});

  var huntingareasBH = new Bloodhound({
    name: "Huntingareas",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: huntingareaSearch,
    limit: 10
  });

  var maraesBH = new Bloodhound({
    name: "Maraes",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: maraeSearch,
    limit: 10
  });

  var campsitesBH = new Bloodhound({
    name: "Campsites",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: campsiteSearch,
    limit: 10
  });

  var carparksBH = new Bloodhound({
    name: "Carparks",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: carparkSearch,
    limit: 10
  });

  var hutsBH = new Bloodhound({
    name: "Huts",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: hutSearch,
    limit: 10
  });

  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=NZ&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  huntingareasBH.initialize();
  maraesBH.initialize();
  campsitesBH.initialize();
  carparksBH.initialize();
  hutsBH.initialize();
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "Huntingareas",
    displayKey: "name",
    source: huntingareasBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Huntingareas</h4>"
    }
  }, {
    name: "Maraes",
    displayKey: "name",
    source: maraesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/marae.png' width='24' height='28'>&nbsp;Maraes</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "Campsites",
    displayKey: "name",
    source: campsitesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/camping.png' width='32' height='37'>&nbsp;Campsites</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "Carparks",
    displayKey: "name",
    source: carparksBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/carpark.png' width='32' height='37'>&nbsp;Carparks</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "Huts",
    displayKey: "name",
    source: hutsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/hut.png' width='32' height='37'>&nbsp;Huts</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "Huntingareas") {
      map.fitBounds(datum.bounds);
    }
    if (datum.source === "Maraes") {
      if (!map.hasLayer(maraeLayer)) {
        map.addLayer(maraeLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Campsites") {
      if (!map.hasLayer(campsiteLayer)) {
        map.addLayer(campsiteLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Carparks") {
      if (!map.hasLayer(carparkLayer)) {
        map.addLayer(carparkLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Huts") {
      if (!map.hasLayer(hutLayer)) {
        map.addLayer(hutLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
