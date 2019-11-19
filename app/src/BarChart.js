/**
 * Created by ayub on 11/10/19.
 */
import React from "react";
import * as d3 from "d3";

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const format = d3.format(",");

class BarChart extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            sort: true,
            species: [...this.props.data.species].sort((a, b) => b.value - a.value),
            xScale : d3
                .scaleBand()
                .range([0, this.props.width - this.props.left - this.props.right])
                .domain([...this.props.data.species].sort((a, b) => b.value - a.value).map(d => d.name))
                .padding(0.1),

            yScale : d3
                .scaleLinear()
                .range([this.props.height - this.props.top - this.props.bottom, 0])
                .domain([0, d3.max(this.props.data.species, d => d.value)])
        }
    }

    setLocalState(){
        this.setState({
            species: [...this.props.data.species].sort((a, b) => b.value - a.value),
            xScale : d3
                .scaleBand()
                .range([0, this.props.width - this.props.left - this.props.right])
                .domain([...this.props.data.species].sort((a, b) => b.value - a.value).map(d => d.name))
                .padding(0.1),

            yScale : d3
                .scaleLinear()
                .range([this.props.height - this.props.top - this.props.bottom, 0])
                .domain([0, d3.max(this.props.data.species, d => d.value)])
        })
    }

    componentDidUpdate(prevProps) {
        if(this.props.data.state !== prevProps.data.state || this.props.data.unit !== prevProps.data.unit
            || this.props.data.year !== prevProps.data.year||this.props.data.species !== prevProps.data.species){
            this.setLocalState();
        }
        this.drawChart();
    }


    plot(chart, width, height) {

        // Define the div for the tooltip
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        var state = this.props.data.state;
        var year = this.props.data.year;
        var unit = this.props.data.unit;


        chart.selectAll('.bar')
            .data(this.state.species)
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('x', d => this.state.xScale(d.name))
            .attr('y', d => this.state.yScale(d.value))
            .attr('height', d => (height - this.state.yScale(d.value)))
            .attr('width', d => this.state.xScale.bandwidth())
            .style('fill', (d, i) => colorScale(i))
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Spec: "+d.name + "<br/> Value: "+ d.value +"</br> State: " + state+"<br/>Year: "  +year)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
       chart.selectAll('.bar-label')
            .data(this.state.species)
            .enter()
            .append('text')
            .classed('bar-label', true)
            .attr('x', d => this.state.xScale(d.name) + this.state.xScale.bandwidth()/2)
            .attr('dx', 0)
            .attr('y', d => this.state.yScale(d.value))
            .attr('dy', -6)
               .style("font-size", "8px")
               .style("font-weight", "600")
               .attr("dx", "-.8em")
               .attr("dy", "-.55em")
               .text(d => format(d.value));

        const xAxis = d3.axisBottom()
            .scale(this.state.xScale);

        chart.append('g')
            .classed('x axis', true)
            .attr('transform', `translate(0,${height})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .style("font-size", "8px")
            .style("font-weight", "600")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)");

        const yAxis = d3.axisLeft()
            .ticks(5)
            .scale(this.state.yScale);

        chart.append('g')
            .classed('y axis', true)
            .attr('transform', 'translate(0,0)')
            .call(yAxis);

        chart.select('.y.axis')
            .append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('transform', `translate(-50, ${height/2}) rotate(-90)`)
            .attr('fill', '#000')
            .style('font-size', '20px')
            .style('text-anchor', 'middle')
            .text('Production in '+unit +", "+ year);

        const yGridlines = d3.axisLeft()
            .scale(this.state.yScale)
            .ticks(5)
            .tickSize(-width,0,0)
            .tickFormat('')

        chart.append('g')
            .call(yGridlines)
            .classed('gridline', true);
    }

    drawChart() {
        d3.select("#"+this.props.id).select("svg").remove();
        const svg = d3.select("#"+this.props.id)
           .append('svg')
            .attr('id', 'chart')
            .attr('width', this.props.width)
            .attr('height', this.props.height);

        const chart = svg.append('g')
            .classed('display', true)
            .attr('transform', `translate(${this.props.left},${this.props.top})`);

        const chartWidth = this.props.width - this.props.left - this.props.right;
        const chartHeight = this.props.height - this.props.top - this.props.bottom;
        this.plot(chart, chartWidth, chartHeight);

    }
    componentDidMount(){
       this.drawChart()
    }

    render() {
         return <div id={this.props.id}></div>;
    }
};

export default BarChart;