

function drawScatterPlot(data, container, param, param_unit) {


    d3.select(container).selectAll('*').remove();


    const margin = {top: 10, right: 10, bottom: 50, left: 50};
    const width = $(container).width() - margin.left - margin.right;
    const height = $(container).height() - margin.top - margin.bottom;

    // Parse the date / time
    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);

    const svg = d3.select(container)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    const color = "#3366cc";

    const g = svg.append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data
    x.domain(d3.extent(data, function (d) {
        return d.date;
    }));
    y.domain([d3.min(data, function (d) {
        return d[param];
    }), d3.max(data, function (d) {
        return d[param];
    })]);

    // Define the line
    let valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d[param]); });

    g.append("path")
        .attr("class", "line")
        .attr("d", valueline(data))
        .style("stoke", function (d) {
            return color
        });

    // plot the data
    g.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx", function (d) {
            return x(d.date);
        })
        .attr("cy", function (d) {
            return y(d[param]);
        })
        .style("fill", function (d) {
            return color
        });

    // Add the X Axis
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")).ticks(5))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-30)");

    // Add the Y Axis
    let yAxis = d3.axisLeft(y).ticks(7);
    if(param === 'volume'){
        yAxis.tickFormat(d3.formatPrefix(".1", 1e3));
    }

    g.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    /*g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text(param + param_unit);*/

    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text(param + param_unit);
}

