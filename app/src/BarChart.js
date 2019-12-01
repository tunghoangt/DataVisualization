/**
 * Created by ayub on 11/10/19.
 */
import React from "react";
import * as d3 from "d3";
import mapStateToProps from './redux/helpers';
import store from './redux/store';
import { connect } from 'react-redux';

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const format = d3.format(",");

// TODO: clean up visualization
/**
  * A bar chart which subscribes to changes in the redux store but doesn't dispatch actions.
  */
class BarChart extends React.Component {

    constructor(props) {
        super(props);
        // TODO: remove this dummy data when successfully getting default dataset
        this.data = {
          usState: 'New York',
          unit: 'Pounds',
          year: '2015',
          species: [
            {name: 'AMBERJACK, GREATER', value: 2000},
            {name: 'AMBERJACK, LESSER', value: 2100},
            {name: 'ATLANTIC BUMPER', value: 2300},
            {name: 'BARRACUDAS', value: 1500},
            {name: 'BARRELFISH', value: 1745},
            {name: 'BIGEYE', value: 2347},
          ]
        };

        // TODO: how do we provide the default dataset from the store?
        this.state = {
            whichData: props.dataset,
            stateData: null,
            speciesData: null,
            usState: "all",
            unit: "Pounds",
            year: "all",
            displayData: this.data.species,
            xScale : d3
                .scaleBand()
                .range([0, this.props.width - this.props.left - this.props.right])
                .domain([...this.data.species].sort((a, b) => b.value - a.value).map(d => d.name))
                .padding(0.1),

            yScale : d3
                .scaleLinear()
                .range([this.props.height - this.props.top - this.props.bottom, 0])
                .domain([0, d3.max(this.data.species, d => d.value)])
        };

        store.subscribe(() => {
          store.getState().then(
            dataObj => {
              // TODO: you're not actually using the full datasets here, so can drop
              Object.keys(dataObj).map( key =>
                this.setState({[key]: dataObj[key]})
              )
              let dataset = props.dataset === "species" ? dataObj.speciesData : dataObj.stateData
              this.setState({displayData: this.getTopN(dataset, 6)})
            },
            error => console.log('Something went wrong.')
          )
        });

        this.drawChart = this.drawChart.bind(this);
        this.plot = this.plot.bind(this);
    };

    getTopN(data, n) {
      let sortedKeys = Object.keys(data).sort((a, b) => data[b] - data[a])
      let topKeys = sortedKeys.slice(0,n)
      let topN = topKeys.reduce((l, key) => {
        let newObj = {name: key, value: data[key]}
        l.push(newObj)
        return l
      }, [])
      return topN
    }

    setLocalState() {
        this.setState({
            xScale : d3
                .scaleBand()
                .range([0, this.props.width - this.props.left - this.props.right])
                .domain([...this.state.displayData].sort((a, b) => b.value - a.value).map(d => d.name))
                .padding(0.1),

            yScale : d3
                .scaleLinear()
                .range([this.props.height - this.props.top - this.props.bottom, 0])
                .domain([0, d3.max(this.state.displayData, d => d.value)])
        })
    };

    // TODO: should check prevProps
    componentDidUpdate(prevProps, prevState) {
      if (prevState.displayData !== this.state.displayData) {
        this.setLocalState()
      }
      this.drawChart();
    };

    plot(chart, width, height) {

        // Define the div for the tooltip
        var div = d3.select("body")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

        chart.selectAll('.bar')
             .data(this.state.displayData)
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
                div.html("Spec: "+ d.name + "<br/> Value: "+ d.value + "</br> State: " + this.state.usState +"<br/>Year: "  + this.state.year)
                   .style("left", (d3.event.pageX) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");
             })
             .on("mouseout", function(d) {
                div.transition()
                   .duration(500)
                   .style("opacity", 0);
             });

       chart.selectAll('.bar-label')
            .data(this.state.displayData)
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
             .text('Production in '+ this.state.unit + ", " + this.state.year);

        const yGridlines = d3.axisLeft()
                             .scale(this.state.yScale)
                             .ticks(5)
                             .tickSize(-width, 0, 0)
                             .tickFormat('')

        chart.append('g')
             .call(yGridlines)
             .classed('gridline', true);
    }

    drawChart() {
        d3.select("#" + this.props.id)
          .select("svg")
          .remove();

        const svg = d3.select("#" + this.props.id)
                      .append('svg')
                      .attr('id', 'chart')
                      .attr('width', this.props.width)
                      .attr('height', this.props.height);

        const chart = svg.append('g')
                         .classed('display', true)
                         .attr('transform', `translate(${this.props.left},${this.props.top})`);

        const chartWidth = this.props.width - this.props.left - this.props.right;
        const chartHeight = this.props.height - this.props.top - this.props.bottom;
        return this.plot(chart, chartWidth, chartHeight);
    }

    componentDidMount(){
        return this.drawChart()
    }

    render() {
        return (
          <div id={this.props.id}>
          </div>
        )
    };
};

export default connect(mapStateToProps)(BarChart);
