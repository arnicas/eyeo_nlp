/*
* Define line graph
*/

function myline() {
  // Default settings
  var $el = d3.select("body");
  var width = 960;
  var height = 500;
  var color = "steelblue";
  var interpolation = "basis";
  var margin = {top: 10, right: 30, bottom: 30, left: 30};
  var data = [];
  var svg, y, xAxis, yAxis, line;
  var x = d3.scale.linear().range([0, width]);
  var xArg = "x";
  var yArg = "y";
  var dotRadius = 3;
  var tooltips = true;  // should pass in an object

  var object = {};

  // Method for render/refresh graph
  object.render = function(){
    if(!svg){ // Render first time
      y = d3.scale.linear()
      .range([height, 0]);

      xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .outerTickSize(0)
      .innerTickSize(0);

      yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .outerTickSize(0)
        .innerTickSize(0);

      line = d3.svg.line()
        .x(function(d) { return x(d[xArg]); })
        .y(function(d) { return y(d[yArg]); })
        .interpolate(interpolation);

      svg = $el.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      x.domain(d3.extent(data, function(d) { return d[xArg]; }));

      var yExt = d3.extent(data, function(d) { return d[yArg]; });
      var maxY = (Math.abs(yExt[1]) > Math.abs(yExt[0])) ? Math.abs(yExt[1]) : Math.abs(yExt[0]);
      y.domain([-maxY, maxY]);

      makeGradient(svg, [-maxY, maxY]);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

      svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("stroke", "url(#gradient)")
        .attr("d", line);

      svg.append("line")
        .attr("class", "zeroline")
        .attr("x1", x(0))
        .attr("x2", x(d3.max(data, function(d) {return d[xArg];})))
        .attr("y1", y(0))
        .attr("y2", y(0));

      svg.selectAll("circle.point")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "point")
        .attr("r", dotRadius)
        .attr("cx", function (d) { return x(d[xArg]);})
        .attr("cy", function (d) { return y(d[yArg]);})
        .on("mouseover", function (d) {
          if (tooltips) {
            return showTooltip(d);
          }
        })
        .on("mouseout", function(d) {
          if (tooltips) {
            return hideTooltip(d);
          }
        })
        .on("mousemove", function(d){
          return moveTooltip(d);
        });


    } else { //Refresh
      object.data(data);

      x.domain(d3.extent(data, function(d) { return d[xArg]; }));
      var yExt = d3.extent(data, function(d) { return d[yArg]; });
      var maxY = (Math.abs(yExt[1]) > Math.abs(yExt[0])) ? Math.abs(yExt[1]) : Math.abs(yExt[0]);
      y.domain([-maxY, maxY]);

      svg.select("g.y")
        .transition()
        .duration(1000)
        .call(yAxis);

      svg.select("g.x")
        .transition()
        .duration(1000)
        .call(xAxis);

      svg.selectAll("path.line")
       .datum(data)
        .transition()
        .duration(1000)
       .attr("d", line);

      svg.selectAll("circle.point")
      .data(data)
      .transition()
      .duration(1000)
      .attr("cx", function (d) { return x(d[xArg]);})
      .attr("cy", function (d) { return y(d[yArg]);});

    }
    return object;
  };

  // Getter and setter methods
  object.data = function(value){
    if (!arguments.length) return data;
    data = value;
    return object;
  };

  object.$el = function(value){
    if (!arguments.length) return $el;
    $el = value;
    return object;
  };

  object.width = function(value){
    if (!arguments.length) return width;
    width = value;
    return object;
  };

  object.height = function(value){
    if (!arguments.length) return height;
    height = value;
    return object;
  };

  object.interpolation = function(value){
      if (!arguments.length) return interpolation;
      interpolation = value;
      return object;
    };

  object.color = function(value){
    if (!arguments.length) return color;
    color = value;
    return object;
  };

  object.xArg = function(value){
    if (!arguments.length) return xArg;
    xArg = value;
    return object;
  };

  object.yArg = function(value){
    if (!arguments.length) return yArg;
    yArg = value;
    return object;
  };

  object.tooltips = function(value){
    // boolean
    if (!arguments.length) return tooltips;
    tooltips = value;
    return object;
  };

  object.x = function(value){
    if (!arguments.length) return x;
    x = value;
    return object;
  };


  function makeGradient(selection, extentY) {

    var minY = extentY[0],
        maxY = extentY[1];

    var gradient = selection
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("y1", y(minY))
        .attr("y2", y(maxY))
        .attr("x1", "0")
        .attr("x2", "0")
        .attr("id", "gradient")
        .attr("gradientUnits", "userSpaceOnUse");

    gradient
        .append("stop")
        .attr("offset", .5)
        .attr("stop-color", "darkred");

    gradient
      .append("stop")
        .attr("offset", 0)
        .attr("stop-color", "darkred");

    gradient
        .append("stop")
        .attr("offset", .5)
        .attr("stop-color", "steelblue");

    gradient
      .append("stop")
        .attr("offset", 1)
        .attr("stop-color", "steelblue");

  }

  return object;
};


/* Example
var line4 = line()
              .$el(d3.select("#line-4"))
              .height(100) // Set height
              .color("gray") // Set color
              .data(getData()) // Set data
              .xArg("index")
              .yArg("value")
              .render();

*/

