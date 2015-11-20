/*
  US Map Choropleth with Bar
  Copyright: VIDA LAB INC.
  License: BSD
*/

/*--- IMPORTANT GUIDELINES ---
1. Use div #canvas-svg for svg rendering
    var svg = d3.select("#canvas-svg");
2. 'data' variable contains JSON data from Data tab
    Do NOT overwrite this variable 
3. To define customizable properties, use capitalized variable names,
    and define them in Properties tab ---*/
    var data = {};

// $.getJSON("data_user.json", function(json){
//     data = json;
// var data = require("testdata.json");
// console.log(data)
data = gon.mapData;

console.log(gon.mapData);


var WIDTH = 800, HEIGHT = 400;

var COLOR_COUNTS = 9;

var SCALE = 0.7;


function Interpolate(start, end, steps, count) {
    var s = start,
        e = end,
        final = s + (((e - s) / steps) * count);
    return Math.floor(final);
}

function Color(_r, _g, _b) {
    var r, g, b;
    var setColors = function(_r, _g, _b) {
        r = _r;
        g = _g;
        b = _b;
    };

    setColors(_r, _g, _b);
    this.getColors = function() {
        var colors = {
            r: r,
            g: g,
            b: b
        };
        return colors;
    };
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// var COLOR_FIRST = config.color1, COLOR_LAST = config.color2;

// var rgb = hexToRgb(COLOR_FIRST);
// 
// var COLOR_START = new Color(rgb.r, rgb.g, rgb.b);

// rgb = hexToRgb(COLOR_LAST);
// var COLOR_END = new Color(rgb.r, rgb.g, rgb.b);

var MAP_CATEGORY = "state";
var MAP_VALUE = "usernumber";
var MAP_UBERFARE = "uberfare";
var MAP_LYFTFARE = "lyftfare";
var MAP_COUNT = "count"
var MAP_MILESTOTAL = "milestotal";

var width = WIDTH,
    height = HEIGHT;

var valueById = d3.map();

// var startColors = COLOR_START.getColors(),
//     endColors = COLOR_END.getColors();

var colors = [];

for (var i = 0; i < COLOR_COUNTS; i++) {
  var r = Interpolate(0, 15, COLOR_COUNTS, i);
  var g = Interpolate(0, 100, COLOR_COUNTS, i);
  var b = Interpolate(0, 80, COLOR_COUNTS, i);
  colors.push(new Color(r, g, b));
}

var quantize = d3.scale.quantize()
    .domain([0, 1.0])
    .range(d3.range(COLOR_COUNTS).map(function(i) { return i }));

var path = d3.geo.path();

var svg = d3.select("#canvas-svg").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.tsv("https://s3-us-west-2.amazonaws.com/vida-public/geo/us-state-names.tsv", function(error, names) {

name_id_map = {};
id_name_map = {};

for (var i = 0; i < names.length; i++) {
  name_id_map[names[i].name] = names[i].id;
  id_name_map[names[i].id] = names[i].name;
}

data.forEach(function(d) {
  var id = name_id_map[d[MAP_CATEGORY]];
  valueById.set(id, +d[MAP_VALUE]); 
});

quantize.domain([d3.min(data, function(d){ return +d[MAP_VALUE] }),
  d3.max(data, function(d){ return +d[MAP_VALUE] })]);


function makeMap(us) {
  svg.append("g")
      .attr("class", "categories-choropleth")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("transform", "scale(" + SCALE + ")")
      .style("fill", function(d) {
        if (valueById.get(d.id)) {
          var i = quantize(valueById.get(d.id));
          var color = colors[i].getColors();
          return "rgb(" + color.r + "," + color.g +
              "," + color.b + ")";
        } else {
          return "";
        }
      })
      .attr("d", path)
      .on("mousemove", function(d) {
          var html = "";

          html += "<div class=\"tooltip_kv\">";
          html += "<span class=\"tooltip_key\">";
          html += id_name_map[d.id];
          html += "</span>";
          html += "<span class=\"tooltip_value\">";
          html += "Total Searches: " + (valueById.get(d.usernumber) ? valueById.get(d.id) : "") + "<br>" 
          html += "Average Distance: <br>";
          html += "Average Fare: " + (valueById.get(d.id) ? valueById.get(d.id) : "");
          html += "";
          html += "</span>";
          html += "</div>";
          
          $("#tooltip-container").html(html);
          $(this).attr("fill-opacity", "0.8");
          $("#tooltip-container").show();
          
          var coordinates = d3.mouse(this);
          
          var map_width = $('.categories-choropleth')[0].getBoundingClientRect().width;
          
          if (d3.event.layerX < map_width / 2) {
            d3.select("#tooltip-container")
              .style("top", (d3.event.layerY + 15) + "px")
              .style("left", (d3.event.layerX + 15) + "px");
          } else {
            var tooltip_width = $("#tooltip-container").width();
            d3.select("#tooltip-container")
              .style("top", (d3.event.layerY + 15) + "px")
              .style("left", (d3.event.layerX - tooltip_width - 30) + "px");
          }
      })
      .on("mouseout", function() {
              $(this).attr("fill-opacity", "1.0");
              $("#tooltip-container").hide();
          });

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "categories")
      .attr("transform", "scale(" + SCALE + ")")
      .attr("d", path);
}

d3.json("https://s3-us-west-2.amazonaws.com/vida-public/geo/us.json", function(error, us) {
  makeMap(us);
});

});
});