import React, { Component } from "react";
import CanvasJSReact from "../../src/assets/canvasjs.react";
import jdata from "./line.json";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints1 = [];

class LineChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      zoomEnabled: true,
      theme: "light2",

      title: {
        text: "Average graph"
      },
      axisY: {
        title: "Average wait time( in min)",
        includeZero: false,
        stripLines: [
          {
            showOnTop: true,
            value: jdata[jdata.length - 1].y,
            label: "Average",
            labelFormatter: function(e) {
              return "Average:" + e.stripLine.value;
            },
            color: "#d8d8d8"
          }
        ]
      },

      width: 500,
      height: 500,

      data: [
        {
          type: "line",
          xValueFormatString: "DD MMM YYYY HH:mm",
          dataPoints: dataPoints1
        }
      ]
    };
    return (
      <div>
        <CanvasJSChart options={options} onRef={ref => (this.chart = ref)} />
      </div>
    );
  }

  componentDidMount() {
    var chart = this.chart;
    for (var i = 0; i < jdata.length - 1; i++) {
      dataPoints1.push({
        x: new Date(jdata[i].x),
        y: jdata[i].y
      });
    }

    chart.render();
  }
}

export default LineChart;
