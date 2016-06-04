
// Remember to include the tooltip.css file (customize as you like)

// must add a tooltip to the page - not to the svg itself or any included div:
var tooltip = d3.select("body")
    .append("div")
    .attr("class", "d3tooltip");


var getTooltipHtml = function(d) {
  return "<p>fill in getTooltipHtml(d) function</p>";
};

function showTooltip(d) {
  tooltip
      .style("display", null) // this removes the display none setting from it
      .html(getTooltipHtml(d));
}

function hideTooltip() {
    tooltip.style("display", "none");  // this sets it to invisible!
}

function moveTooltip(d) {
    tooltip
        .style("top", (d3.event.pageY - 10) + "px" )
        .style("left", (d3.event.pageX + 10) + "px");
}
