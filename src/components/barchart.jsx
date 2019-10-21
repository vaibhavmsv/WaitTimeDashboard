import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import React, { Component } from "react";
import CanvasJSReact from "../../src/assets/canvasjs.react";
import jdata from "./bar.json";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var f = [];
var dataPoints = [];

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.obj = this.props.obj;
  }
  render() {
    var y = JSON.parse(this.obj);
    var x = y["selectvenue"];
    var i,
      k = 0;
    for (i = 0; i < x.length; i++) {
      if (x[i].value === true) {
        f[k] = x[i].label;
        console.log(f[k]);
      }
    }
    const options = {
      backgroundColor: "#F5DEB3",
      width: 700,
      height: 400,
      title: {
        text: " Average hourly trend"
      },
      axisX: {
        minimum: jdata[0].x - 3600000,
        maximum: jdata[jdata.length - 1].x + 36000,

        valueFormatString: "hh:mm TT"
      },
      axisY: {
        gridThickness: 0,
        includeZero: true,
        title: "Average wait time",
        suffix: " mins"
      },
      data: [
        {
          type: "column",
          color: "#068686",
          indexLabel: "",
          xValueFormatString: "DD MMM YYYY hh:mm TT",
          toolTipContent: "Number of patients: {count}",
          dataPoints: dataPoints
        }
      ]
    };
    return (
      <div id="charts">
        <CanvasJSChart options={options} onRef={ref => (this.chart = ref)} />
      </div>
    );
  }
  componentDidMount() {
    var chart = this.chart;
    for (var i = 0; i < jdata.length - 1; i++) {
      dataPoints.push({
        x: new Date(jdata[i].x),
        y: jdata[i].y,
        count: jdata[i].count
      });
    }
    chart.render();
  }

  /*fetch('localhost:8080/nifty-stock-price.json')
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			for (var i = 0; i < data.length; i++) {
				dataPoints.push({
					x: new Date(data[i].x),
          y: data[i].y
          count: jdata[i].count
				});
			}
			chart.render();
		});*/
}

export default BarChart;
