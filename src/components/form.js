import React from "react";
import "./form.css";
import * as Datetime from "react-datetime";
import Select from "react-select";
import { Navbar, Nav } from "react-bootstrap";

import BarChart from "./barchart";
import ScatterChart from "./scatter";
const venues = [
  { value: "registration", label: "Registration" },
  { value: "nursing", label: "Nursing" },
  { value: "physician", label: "Physician" },
  { value: "lab", label: "Lab" },
  { value: "pharmacy", label: "Pharmacy" }
];
var fields = null;
export default class Form extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectvenue: "",
      date1: new Date(),
      date2: new Date(),
      tograph: false,
      toscatter: false
    };
  }

  handlevenue = selectvenue => {
    this.setState({ selectvenue });
  };
  selectedBadgeClicked(optionsList) {
    this.setState({ selectvenue: optionsList });
  }

  onChangedate1 = date1 => this.setState({ date1 });
  onChangedate2 = date2 => {
    this.setState({ date2 });
  };
  optionClicked(optionsList) {
    this.setState({ selectvenue: optionsList });
  }

  onSubmit = e => {
    this.setState({
      tograph: true,
      toscatter: false
    });
    fields = JSON.stringify(this.state);
    console.log(fields);
    if (this.state.date1 >= this.state.date2) {
      alert("Select valid date and time range");
      this.setState({ tograph: false, toscatter: false });
    } else {
      e.preventDefault();
      this.setState({
        selectvenue: [],
        selectgraph: null,
        date1: new Date(),
        date2: new Date(),
        tograph: true,
        toscatter: false
      });
    }
  };

  onback = e => {
    this.setState({
      tograph: false,
      toscatter: false
    });
  };
  onscatter = e => {
    this.setState({
      toscatter: !this.state.toscatter
    });
  };

  render() {
    if (this.state.tograph === true && this.state.toscatter === false) {
      return (
        <div align="center">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/"> &emsp; &emsp; &emsp;Home</Navbar.Brand>
            <Nav className="mr-auto">
              &emsp; &emsp;
              <Nav.Link onClick={e => this.onscatter(e)}>Hourly trend</Nav.Link>
              &emsp; &emsp;
              <Navbar.Text>Average Hourly trend</Navbar.Text>
            </Nav>
          </Navbar>
          <BarChart obj={fields} />
          <br />
          <br />
        </div>
      );
    } else if (this.state.tograph === true && this.state.toscatter === true) {
      return (
        <div align="center">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/"> &emsp; &emsp; &emsp; Home</Navbar.Brand>
            <Nav className="mr-auto">
              &emsp;&emsp;
              <Navbar.Text>Hourly trend</Navbar.Text>
              &emsp; &emsp;
              <Nav.Link onClick={e => this.onscatter(e)}>
                Average hourly trend
              </Nav.Link>
            </Nav>
          </Navbar>
          <ScatterChart obj={fields} />
          <br />
          <br />
        </div>
      );
    } else {
      return (
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="mr-auto" />
          </Navbar>
          <br />
          <h1 align="center">
            <b>Wait Time Dashboard</b>
          </h1>
          <br />
          <form
            action={this.props.action}
            method="GET"
            onSubmit={e => this.onSubmit(e)}
          >
            <p className="title">SELECT VENUE</p>

            <Select
              options={venues}
              optionClicked={this.optionClicked.bind(this)}
              selectedBadgeClicked={this.selectedBadgeClicked.bind(this)}
              isTextWrap={false}
            />
            <br />
            <br />
            <p>FROM</p>
            <Datetime onChange={e => this.onChangedate1(e)} timeFormat={false} />

            <br />
            <p>TO</p>
            <Datetime onChange={e => this.onChangedate2(e)} timeFormat={false} />
            <br />
            <button>Submit</button>
          </form>
        </div>
      );
    }
  }
}
