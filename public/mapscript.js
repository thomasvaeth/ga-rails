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
data = gon.mapData;

var WIDTH = 900, HEIGHT = 560;

var COLOR_COUNTS = 9;

var SCALE = 1;


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


var MAP_CATEGORY = "state";
var MAP_VALUE = "count";
var MAP_UBERFARE = "uberfare";
var MAP_LYFTFARE = "lyftfare";
var MAP_MILESTOTAL = "milestotal";

var width = WIDTH,
    height = HEIGHT;

var valueById = d3.map();
var uberFareById = d3.map();
var lyftFareById = d3.map();
var milesTotalById = d3.map();
var countById = d3.map();

var colors = [];

for (var i = 0; i < COLOR_COUNTS; i++) {
  var r = Interpolate(204, 76, COLOR_COUNTS, i);
  var g = Interpolate(204, 76, COLOR_COUNTS, i);
  var b = Interpolate(204, 76, COLOR_COUNTS, i);
  colors.push(new Color(r, g, b));
}

var quantize = d3.scale.quantize()
    .domain([0, 1.0])
    .range(d3.range(COLOR_COUNTS).map(function(i) { return i }));

var path = d3.geo.path();

var svg = d3.select("#canvas-svg").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("position", 'relative')
    .style("top", '50px')
    .style("z-index", "0");


var renderMap = function(filter){

d3.tsv("https://s3-us-west-2.amazonaws.com/vida-public/geo/us-state-names.tsv", function(error, names) {

name_id_map = {};
id_name_map = {};


for (var i = 0; i < names.length; i++) {
  name_id_map[names[i].name] = names[i].id;
  id_name_map[names[i].id] = names[i].name;

}

data.forEach(function(d) {
  var id = name_id_map[d[MAP_CATEGORY]];
  uberFareById.set(id, +d[MAP_UBERFARE]);
  lyftFareById.set(id, +d[MAP_LYFTFARE]);
  milesTotalById.set(id, +d[MAP_MILESTOTAL]);
  countById.set(id, +d[MAP_VALUE]);
});

quantize.domain([d3.min(data, function(d){ return +d[MAP_VALUE] }),
  d3.max(data, function(d){ return +d[MAP_VALUE] })]);


function makeMap(us,choice) {

  switch(choice){
    case 'byCount' : filter = countById;
      break;
    case 'byDistance' : filter = milesTotalById;
      break;
    case 'byUber' : filter = uberFareById;
      break;
    case 'byLyft' : filter = lyftFareById;
      break;
    default : filter = countById;
  }

  svg.append("g")
      .attr("class", "categories-choropleth")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("transform", "scale(" + SCALE + ")")
      .style("fill", function(d) {
        if (filter.get(d.id)) {
          var i = quantize(filter.get(d.id));
          var color = colors[i].getColors();
          return "rgb(" + color.r + "," + color.g +
              "," + color.b + ")";
        } else if(filter.get(d.id) == 0){
          return "rgb(" + 210 + "," + 210 +
              "," + 210 + ")";
        }
      })
      .attr("d", path)
      .on("mouseover", function(d) {
          var html = "";

          html += "<div class=\"tooltip_kv\">";
          html += "<span class=\"tooltip_key\">";
          html += id_name_map[d.id];
          html += "<br></span>";
          html += "<span class=\"tooltip_value\">";
          html += "Total Searches: " + (countById.get(d.id) ? countById.get(d.id) + "<br>" : "0 <br>" );
          html += (milesTotalById.get(d.id) ? "Average Distance: " + (milesTotalById.get(d.id) / countById.get(d.id)).toFixed(2) + " mi<br>" : "");
          html += (uberFareById.get(d.id) ? "Average Uber Fare: $" + (uberFareById.get(d.id) / countById.get(d.id)).toFixed(2) + "<br>" : "");
          html += (lyftFareById.get(d.id) ? "Average Lyft Fare: $" + (lyftFareById.get(d.id) / countById.get(d.id)).toFixed(2) + "<br>" : "");
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
              .style("top", (d3.event.layerY + 1600) + "px")
              .style("left", (d3.event.layerX + 15) + "px")
              .style("z-index", "1");
          } else {
            var tooltip_width = $("#tooltip-container").width();
            d3.select("#tooltip-container")
              .style("top", (d3.event.layerY + 1600) + "px")
              .style("left", (d3.event.layerX - tooltip_width + 120) + "px")
              .style("z-index", "1")
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
  makeMap(us, filter);
});
});
};