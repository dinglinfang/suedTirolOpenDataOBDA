function Matrix(options) {

    //https://bl.ocks.org/arpitnarechania/caeba2e6579900ea12cb2a4eb157ce74

    var container = options.container,
        legendContainer = options.legendContainer,
        linkedContainer = options.linkedContainer;
    d3.select(container).selectAll('*').remove();
    d3.select(legendContainer).selectAll('*').remove();
    d3.select(linkedContainer).selectAll('*').remove();

    var margin = {top: 10, right: 10, bottom: 50, left: 60},
        width = $(container).width() - margin.left - margin.right,
        height = $(container).height() - margin.top - margin.bottom,
        matrixData = options.matrixData,
        labelsData = options.labels,
        startColor = options.start_color,
        endColor = options.end_color;

    if (!matrixData) {
        throw new Error('Please pass data');
    }

    if (!Array.isArray(matrixData) || !matrixData.length || !Array.isArray(matrixData[0])) {
        throw new Error('It should be a 2-D array');
    }

    var maxValue = d3.max(matrixData, function (layer) {
        return d3.max(layer, function (d) {
            return d;
        });
    });
    var minValue = d3.min(matrixData, function (layer) {
        return d3.min(layer, function (d) {
            return d;
        });
    });

    let matrixData1 = [];
    for(let row = 0; row < matrixData.length; row++){
        let rowArray = [];
        for(let col = 0; col < matrixData[row].length; col++){
            rowArray.push({
                coefValue: parseFloat(matrixData[row][col]),
                row: row,
                col: col
            });
        }
        matrixData1.push(rowArray);
    }

    var numrows = matrixData.length;
    var numcols = matrixData[0].length;

    var svg = d3.select(container).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var background = svg.append("rect")
        .style("stroke", "black")
        .style("stroke-width", "2px")
        .attr("width", width)
        .attr("height", height);

    var x = d3.scaleBand()
        .domain(d3.range(numcols))
        .rangeRound([0, width]);

    var y = d3.scaleBand()
        .domain(d3.range(numrows))
        .rangeRound([0, height]);

    /*var colorMap = d3.scaleLinear()
        .domain([minValue, maxValue])
        .range([startColor, endColor]);*/
    var colorMap = d3.scaleLinear()
        .domain([-1, 0, 1])
        .range(['blue', 'white', 'red']);

    var row = svg.selectAll(".row")
        .data(matrixData1)
        .enter().append("g")
        .attr("class", "row")
        .attr("transform", function (d, i) {
            return "translate(0," + y(i) + ")";
        });

    var cell = row.selectAll(".cell")
        .data(function (d, i) {
            return d;
        })
        .enter().append("g")
        .attr("class", "cell")
        .attr("transform", function (d, i) {
            return "translate(" + x(i) + ", 0)";
        });

    cell.append('rect')
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("stroke-width", 0)
        .style("fill", function(d){
            return colorMap(d.coefValue);
        });

    cell.append("text")
        .attr("dy", ".32em")
        .attr("x", x.bandwidth() / 2)
        .attr("y", y.bandwidth() / 2)
        .attr("text-anchor", "middle")
        .style("fill", function (d, i) {
            return d.coefValue >= maxValue / 2 ? 'white' : 'black';
        })
        .text(function (d, i) {
            return d.coefValue;
        });


    var labels = svg.append('g')
        .attr('class', "labels");

    var columnLabels = labels.selectAll(".column-label")
        .data(labelsData)
        .enter().append("g")
        .attr("class", "column-label")
        .attr("transform", function (d, i) {
            return "translate(" + x(i) + "," + height + ")";
        });

    columnLabels.append("line")
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .attr("x1", x.bandwidth() / 2)
        .attr("x2", x.bandwidth() / 2)
        .attr("y1", 0)
        .attr("y2", 5);

    columnLabels.append("text")
        .attr("x", 50)
        .attr("y", y.bandwidth() / 2)
        .attr("dy", ".2em")
        .attr("text-anchor", "middle")
        //.attr("transform", "rotate(-60)")
        .text(function (d, i) {
            return d;
        });

    var rowLabels = labels.selectAll(".row-label")
        .data(labelsData)
        .enter().append("g")
        .attr("class", "row-label")
        .attr("transform", function (d, i) {
            return "translate(" + 0 + "," + y(i) + ")";
        });

    rowLabels.append("line")
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .attr("x1", 0)
        .attr("x2", -5)
        .attr("y1", y.bandwidth() / 2)
        .attr("y2", y.bandwidth() / 2);

    rowLabels.append("text")
        .attr("x", -8)
        .attr("y", y.bandwidth() / 2)
        .attr("dy", ".32em")
        .attr("text-anchor", "end")
        .text(function (d, i) {
            return d;
        });

    //add legend
    drawLegend(legendContainer);

    //interaction
    svg.selectAll(".cell").on('mouseover', function (d) {
        d3.select(this).select("rect").style("stroke-width", 2)
            .style('stroke', 'black');
    }).on('mouseout', function (d) {
        d3.select(this).select("rect")
            .style('stroke', 'none');
    }).on('click', function (d, i) {
        d3.select(linkedContainer).selectAll('*').remove();

        let data = options.data,
            v1 = labelsData[d.row],
            v2 = labelsData[d.col],
            v1_unit = options.units[d.row],
            v2_unit = options.units[d.col];
        draw2VariateCoefPlot(linkedContainer, data, v1, v2, v1_unit, v2_unit);
    });

}

function drawLegend(container) {
    //http://bl.ocks.org/syntagmatic/e8ccca52559796be775553b467593a9f

    var margin = {top: 10, right: 40, bottom: 60, left: 0},
        legendheight = $(container).height() - margin.bottom,
        legendwidth = $(container).width()-15;

    var canvas = d3.select(container)
        .style("height", legendheight + "px")
        .style("width", legendwidth + "px")
        .style("position", "relative")
        .append("canvas")
        .attr("height", legendheight)
        .attr("width", 1)
        .style("height", (legendheight) + "px")
        .style("width", (legendwidth - margin.left - margin.right) + "px")
        .style("border", "1px solid #000")
        .style("position", "absolute")
        .style("top", (margin.top) + "px")
        .style("left", (margin.left) + "px")
        .node();

    var ctx = canvas.getContext("2d");

    var colorscale = d3.scaleLinear()
        .domain([-1, 0, 1])
        .range(['red', 'white', 'blue']);

    var legendscale = d3.scaleLinear()
        .range([0, legendheight/2, legendheight])
        .domain(colorscale.domain());

    // image data hackery based on http://bl.ocks.org/mbostock/048d21cf747371b11884f75ad896e5a5
    var image = ctx.createImageData(1, legendheight);
    d3.range(legendheight).forEach(function(i) {
        var c = d3.rgb(colorscale(legendscale.invert(i)));

        image.data[4*i] = c.r;
        image.data[4*i + 1] = c.g;
        image.data[4*i + 2] = c.b;
        image.data[4*i + 3] = 255;
    });
    ctx.putImageData(image, 0, 0);

    var legendscale1 = d3.scaleLinear()
        .domain([-1,1])
        .range([legendheight-1, 0]);

    var legendaxis = d3.axisRight()
        .scale(legendscale1)
        .ticks(7)
        .tickSize(6);

    var svg = d3.select(container)
        .append("svg")
        .attr("height", (legendheight + 20) + "px")
        .attr("width", (legendwidth) + "px")
        .style("position", "absolute")
        .style("left", "0px")
        .style("top", "0px");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (legendwidth - margin.left - margin.right + 3) + "," + (margin.top)
            + ")")
        .call(legendaxis);
}


function draw2VariateCoefPlot(container, data, v1, v2, v1_unit, v2_unit) {
    const margin = {top: 10, right: 10, bottom: 50, left: 50};
    const width = $(container).width() - margin.left - margin.right;
    const height = $(container).height() - margin.top - margin.bottom;

    // Parse the date / time
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    const svg = d3.select(container)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    const color = "#3366cc";

    const g = svg.append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data
    x.domain([d3.min(data, function (d) {
        return d[v1];
    }), d3.max(data, function (d) {
        return d[v1];
    })]);
    y.domain([d3.min(data, function (d) {
        return d[v2];
    }), d3.max(data, function (d) {
        return d[v2];
    })]);

    // Define the line
    /*var valueline = d3.line()
        .x(function(d) { return x(d[v1]); })
        .y(function(d) { return y(d[v2]); });

    g.append("path")
        .attr("class", "line")
        .attr("d", valueline(data))
        .style("stoke", function (d) {
            return color
        });*/

    // plot the data
    g.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx", function (d) {
            return x(d[v1]);
        })
        .attr("cy", function (d) {
            return y(d[v2]);
        })
        .style("fill", function (d) {
            return color
        });

    // Add the X Axis
    let xAxis = d3.axisBottom(x).ticks(7);
    if(v1 === 'volume'){
        xAxis.tickFormat(d3.formatPrefix(".1", 1e3));
    }
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    g.append("text")
        .attr("transform",
            "translate(" + (width/2) + " ," +
            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text(v1 + v1_unit);

    // Add the Y Axis

    let yAxis = d3.axisLeft(y).ticks(7);
    if(v2 === 'volume'){
        yAxis.tickFormat(d3.formatPrefix(".1", 1e3));
    }
    g.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text(v2 + v2_unit);



}