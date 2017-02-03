$(document).ready(function() {
    
    /*
    https://developer.nytimes.com/
    API Key f48e8031e0eb4215826d116e3523fab8
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


    //begin interacting with NYT API
    var keywords = {}
    var insertSpot;
    var topKeyWords = [] //{kw: ___ , value: ____} of length 20 charting the top 20 most common keywords
    var kwExceptions = ['N Y S', 'NEW YORK STATE', 'N Y C', 'U S', 'NEW YORK CITY', 'UNITED STATES'] //we're going to exclude these keywords because they are unimportant
    
    //deal with the data; array of JSON objects
    d3.json('https://api.nytimes.com/svc/archive/v1/1951/1.json?api-key=f48e8031e0eb4215826d116e3523fab8', function(err, data) {
        console.log(data)
        
        data = data.response.docs;
        
        //let's get the article keywords into the keywords JSON object
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
        
        for(var key in keywords) {
            
            if(topKeyWords.length == 15) {
                //for syntax deconfusion, this runs when topKeyWords is full at 15

                if(keywords[key] > topKeyWords[14].value && kwExceptions.indexOf(key) == -1) {
                    insertSpot = 0;
                    for(var i = 0; i < topKeyWords.length; i++) {
                        if(keywords[key] > topKeyWords[i].value) {
                            insertSpot = i;
                            break;
                        }
                    }
                    topKeyWords.splice(insertSpot, 0, {kw: key, value: keywords[key]})
                    topKeyWords.pop()
                }
                
            }
            else {
                //happens if length is less than 15
                
                //if value is <= 1, we will not insert ever
                insertSpot = keywords[key] > 1 && kwExceptions.indexOf(key) == -1 ? 0 : -1;
                
                if(insertSpot == 0) {
                    
                    for(var i = 0; i < topKeyWords.length; i++) {

                        if(keywords[key] > topKeyWords[i].value) {
                            insertSpot = i;
                            topKeyWords.splice(insertSpot, 0, {kw: key, value: keywords[key]});
                            break;
                        }
                        
                        if(i == topKeyWords.length - 1) {
                            //reached the end, so just push()
                            insertSpot = 15;
                            topKeyWords.push({kw: key, value: keywords[key]})
                            break;
                        }
                    }
                    
                    if(insertSpot == 0) {
                        topKeyWords.push({kw: key, value: keywords[key]})
                    }
                }
                
            }
            
        }
        
        
        
        console.log(topKeyWords)
        
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