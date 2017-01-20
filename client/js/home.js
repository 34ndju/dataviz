$(document).ready(function() {

    //setup graph size
    var margin = {top: 30, bottom: 30, right: 50, left: 50};
    var width = 960 - margin.left - margin.right,
        height = 520 - margin.top - margin.bottom;
    
    //make sure to set the variable names EXACTLY for x and y
    var xVariable = 'x',
        yVariable = 'y';
    
    //setup x axis
    var xValue = function(d) {return d[xVariable]},
        xScale = d3.scaleLinear().range([0, width]),
        xMap = function(d) {return xScale(xValue(d))},
        xAxis = d3.axisBottom(xScale);
    
    //setup y axis
    var yValue = function(d) {return d[yVariable]},
        yScale = d3.scaleLinear().range([height, 0]),
        yMap = function(d) {return yScale(yValue(d))},
        yAxis = d3.axisLeft(yScale);
        
    //adding canvas to body
    var svg = d3.select('body').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        
    //deal with the data; array of JSON objects
    d3.json('/sampleJSONData', function(err, data) {
        
        //adjust the axes
        xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
        yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);

        //x axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text(xVariable);
            
        // y-axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(yVariable);
            
        // draw dots
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", xMap)
            .attr("cy", yMap)
            .style("fill", "red") 
    })
})