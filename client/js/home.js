$(document).ready(function() {
    
    /*
    DO SOMETHING WITH THIS
    https://developer.nytimes.com/
    API Key f48e8031e0eb4215826d116e3523fab8
    
    Word frequency for most popular articles?
    Try ML?
    */

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
        
        
    var keywords = {}
    
    //deal with the data; array of JSON objects
    d3.json('https://api.nytimes.com/svc/archive/v1/2016/1.json?api-key=f48e8031e0eb4215826d116e3523fab8', function(err, data) {
        console.log(data)
        
        data = data.response.docs;
        console.log(data)
        
        data.forEach(function(d) {
            d.keywords.forEach(function(kw) {
                if(keywords[kw.value]) {
                    keywords[kw.value]++; 
                }
                else {
                    keywords[kw.value] = 1;
                }
            })
        })
        
        console.log(keywords)
        
        /*//adjust the axes
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
            .text(yVariable)
            
        //draw dots
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", xMap)
            .attr("cy", yMap)
            .style("fill", "red") */
            
    })
})