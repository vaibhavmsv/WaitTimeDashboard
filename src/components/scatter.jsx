import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import React, { Component } from "react";
import CanvasJSReact from "../../src/assets/canvasjs.react";
import jdata from "./line.json";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints = [];
var f = [];
class ScatterChart extends Component {
  constructor(props) {
    super(props);
    this.obj = this.props.obj;
  }
  render() {
    //console.log(this.obj);
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
      backgroundColor: "#a9dacb",

      responsive: true,
      width: 700,
      height: 400,
      theme: "light2",
      animationEnabled: true,
      zoomEnabled: true,
      title: {
        text: "Hourly trend"
      },
      axisX: {
        valueFormatString: "hh:mm TT"
      },
      axisY: {
        gridThickness: 0,
        title: "Waiting time",
        includeZero: false
      },
      data: [
        {
          type: "scatter",
          markerColor: "maroon",
          markerSize: 10,
          xValueFormatString: "DD MMM YYYY hh:mm TT",

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
        y: jdata[i].y
      });
    }

    chart.render();
  }
}
/*fetch('https://canvasjs.com/data/gallery/react/nifty-stock-price.json')
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			for (var i = 0; i < data.length; i++) {
				dataPoints.push({
					x: new Date(data[i].x),
					y: data[i].y
				});
			}
			chart.render();
		});*/

export default ScatterChart;
