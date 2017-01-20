$(document).ready(function() {
    
    //setup graph size
    var margin = {top: 30, bottom: 30, right: 50, left: 50};
    var width = 960 - margin.left - margin.right,
        height = 520 - margin.top - margin.bottom;
    
    //make sure to set the variable names EXACTLY for a and y
    var xVariable = '',
        yVariable = '';
    
    var xValue = function(d) {return d[xVariable]
        xScale = d3.scale.linear().range(0, width),
        xMap = function(d) {return 
    
    var yScale = d3.scale.linear().range(height, 0)
})