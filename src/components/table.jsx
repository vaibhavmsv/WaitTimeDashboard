import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import jsonData from "./table2.json";

class DisplayTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.setState({ posts: jsonData });
  }

  render() {
    var arr = [];

    Object.keys(jsonData).forEach(function(key) {
      arr.push(jsonData[key]);
    });

    const columns = [
      {
        Header: "Venue",
        accessor: "Registration"
      },
      {
        Header: "Waiting",
        accessor: "waiting"
      },
      {
        Header: "Served",
        accessor: "served"
      }
    ];

    return (
      <ReactTable
        columns={columns}
        data={this.state.posts}
        defaultPageSize={5}
      />
    );
  }
}

export default DisplayTable;
