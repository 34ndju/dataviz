$(document).ready(function() {
    
    /*
    https://developer.nytimes.com/
    API Key f48e8031e0eb4215826d116e3523fab8
    */

    //setup graph size
    var margin = {top: 30, bottom: 300, right: 50, left: 50};
    var width = 1080 - margin.left - margin.right,
        height = 780 - margin.top - margin.bottom;
    
    //make sure to set the variable names EXACTLY for x and y
    var xVariable = 'x',
        yVariable = 'y';
    
    //setup x axis
    var xValue = function(d) {return d[xVariable]},
        xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1)

        //xMap = function(d) {return xScale(xValue(d))},
        //xAxis = d3.axisBottom(xScale);
    
    //setup y axis
    var yValue = function(d) {return d[yVariable]},
        yScale = d3.scaleLinear().rangeRound([height, 0])
       
        //yMap = function(d) {return yScale(yValue(d))},
        //yAxis = d3.axisLeft(yScale);
        
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
    
    //we're going to exclude these keywords because they are unimportant
    var kwExceptions = ['Politics and Government', 'DEATHS', 'CORRECTION STORIES', 'NEW YORK GIANTS', 'BALTIMORE RAVENS','BIOGRAPHICAL INFORMATION', 'REVIEWS AND NOTES', 'N Y S', 'NEW YORK STATE', 'N Y C', 'U S', 'NEW YORK CITY', 'UNITED STATES', 'United States', 'Art', 'Basketball', 'Football', 'Editorials', 'Fashion and Apparel', 'New York State', 'New York City', 'New Jersey', 'Books and Literature', 'BOOKS AND LITERATURE', 'FOOTBALL', 'MUSIC', 'ART', 'MURDERS AND ATTEMPTED MURDERS', 'BASKETBALL', 'DEATHS (OBITUARIES)', 'Deaths (Obituaries)', 'POLITICS AND GOVERNMENT', 'UNITED STATES POLITICS AND GOVERNMENT', 'Theater', 'EDITORIAL', 'MISCELLANEOUS', 'MISCELLANEOUS SECTION', 'GENERAL', 'BOOK REVIEWS', 'NEW YORK CITY AND METROPOLITAN AREA', 'NEW JERSEY', 'News', 'REVIEWS'] 
    
    //var year = '2002' //year to explore.
    
    $('#enter').click(function() {
    
    var year = /*'1970'*/  $('#year').val()
    
    //deal with the data; array of JSON objects
    d3.json('https://api.nytimes.com/svc/archive/v1/' + year + '/1.json?api-key=f48e8031e0eb4215826d116e3523fab8', function(err, data) {

        data = data.response.docs;
        
        console.log(data)

        //let's get the article keywords, links, multimedia, and headline into the keywords JSON object
        data.forEach(function(d) {
            d.keywords.forEach(function(kw) {
                if(keywords[kw.value]) {
                    //try to see if there is a link, image, and headline to article. also see if there is a preexisting image. if not, only increment value

                    if(!d.headline.dontRepeat) {
                        //we have not used this article yet as a link
                        
                        if(!keywords[kw.value].link && d.web_url && !keywords[kw.value].headline && d.headline.main) {
                            keywords[kw.value].value++;
                            keywords[kw.value].image= d.multimedia[0];
                            keywords[kw.value].link = d.web_url;
                            keywords[kw.value].headline = d.headline.main;
                            
                            d.headline.dontRepeat = true;
                        }
                        else {
                            if(!keywords[kw.value].image && d.multimedia[0]) {
                                keywords[kw.value].value++;
                                keywords[kw.value].image= d.multimedia[0];
                                keywords[kw.value].link = d.web_url;
                                keywords[kw.value].headline = d.headline.main;
                                
                                d.headline.dontRepeat = true;
                            }
                            else {
                                keywords[kw.value].value++;
                            }
                        }
                    }
                    else {
                        keywords[kw.value].value++;
                    }
                }
                else {
                    //try to see if there is a link to article. if not, only set value to 1

                    if(d.web_url && !d.headline.dontRepeat) {
                        //some info may be null. that's ok
                        keywords[kw.value] = {
                            value: 1,
                            image: d.multimedia[0],
                            link: d.web_url,
                            headline: '' + d.headline.main
                        }

                        d.headline.dontRepeat = true; //so we don't repeat add articles
                    }
                    else {
                        keywords[kw.value] = {
                            value: 1,
                            image: null,
                            link: null,
                            headline: null
                        }
                    }
                }
            })
        })
        
        //insert top 15 keywords, links, images, and headlines into topKeyWords
        for(var key in keywords) {
            if(topKeyWords.length == 15) {
                //for syntax deconfusion, this runs when topKeyWords is full at 15
                
                if(keywords[key].value > topKeyWords[14].value && kwExceptions.indexOf(key) == -1) {
                    insertSpot = 0;
                    for(var i = 0; i < topKeyWords.length; i++) {
                        if(keywords[key].value > topKeyWords[i].value) {
                            insertSpot = i;
                            break;
                        }
                    }
                    topKeyWords.splice(insertSpot, 0, {kw: key, value: keywords[key].value, link: keywords[key].link, image: keywords[key].image, headline: keywords[key].headline})
                    topKeyWords.pop()
                }
                
            }
            else {
                //happens if length is less than 15
                
                //if value is <= 1, we will not insert ever
                insertSpot = keywords[key].value > 1 && kwExceptions.indexOf(key) == -1 ? 0 : -1;
                
                if(insertSpot == 0) {
                    for(var i = 0; i < topKeyWords.length; i++) {
                        if(keywords[key].value > topKeyWords[i].value) {
                            insertSpot = i;
                            topKeyWords.splice(insertSpot, 0, {kw: key, value: keywords[key].value, link: keywords[key].link, image: keywords[key].image, headline: keywords[key].headline});
                            insertSpot = -1; //so we don't get a repeat insert
                            break;
                        }
                        
                        if(i == topKeyWords.length - 1) {
                            //reached the end, so just push()
                            
                            insertSpot = 15;
                            topKeyWords.push({kw: key, value: keywords[key].value, link: keywords[key].link, image: keywords[key].image, headline: keywords[key].headline})
                            break;
                        }
                    }
   
                    if(insertSpot == 0) {
                        topKeyWords.push({kw: key, value: keywords[key].value, link: keywords[key].link, image: keywords[key].image, headline: keywords[key].headline})
                    }
                }
            }
        }
        
        topKeyWords.forEach(function(k) {
          console.log(k)  
        })

        
        //adjust the axes
        xScale.domain(topKeyWords.map(function(d) {return d.kw;}));
        yScale.domain([0, d3.max(topKeyWords, function(d) {return d.value; })]);
       
       //add x axis
        svg.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(xScale));
            
        
        svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(yScale).ticks(10))
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Articles")

       
        //prepare bars for transitions
        svg.selectAll(".bar")
            .data(topKeyWords)
            .enter()
        .append('a')
            .attr('href', function(d) {return d.link})
            .append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return xScale(d.kw); })
                .attr("y", function(d) { return height })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {return 0})
         
        //wrap text so no overlap   
        svg.selectAll(".axis--x .tick text")
            .call(wrap, xScale.bandwidth())
            
            
        //transition in the bars
        svg.selectAll('.bar')
            .data(topKeyWords)
            .transition()
            .attr("y", function(d) { return yScale(d.value); })
            .attr("height", function(d) {return height - yScale(d.value);})
            .duration(500)
       
    })
    
    })
})


function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}