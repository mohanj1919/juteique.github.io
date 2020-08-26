import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import { Component } from "react";
import { NumericInput } from "./components";

class EstimatePrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cost: 0,
      price: 0,
      making_charge: 15,
      margin_percent: 30,
      materials: {
        jute_one_mtr_length_in_inches: "39",
        jute_one_mtr_width_in_inches: "49",
        jute_one_mtr_price: "100",
        gazet_one_mtr_price: "100",
        lining_one_mtr_length_in_inches: "39",
        lining_one_mtr_width_in_inches: "49",
        lining_one_mtr_price: "30",
        handle_one_mtr_price: "10",
        zip_one_mtr_price: "5",
        one_zip_runner_price: "1.5"
      },
      bag_parameters: {
        bag_piece_length_in_inches: null,
        bag_piece_width_in_inches: null,
        number_of_bag_pieces: null,
        lining_length_in_inches: null,
        lining_width_in_inches: null,
        number_of_lining_pieces: null,
        gazet_lentgh_in_inches: null,
        gazet_width_in_inches: null,
        zip_patti_length_in_inches: null,
        zip_patti_width_in_inches: null,
        zip_runners_quantity: null,
        zip_in_inches: null,
        handle_length_in_inches: null
      },
      disable_bag_parameters: true
    };
    this.get_price_per_one_jute_piece = this.get_price_per_one_jute_piece.bind(
      this
    );
    this.handle_materials_parameter_change = this.handle_materials_parameter_change.bind(
      this
    );
    this.handle_bag_parameter_change = this.handle_bag_parameter_change.bind(
      this
    );
    this.get_price_per_one_jute_piece = this.get_price_per_one_jute_piece.bind(
      this
    );
  }

  handle_materials_parameter_change(event) {
    event.preventDefault();
    const element = event.target;
    const newState = { ...this.state };
    newState.materials[element.name] = element.value;
    this.setState(newState);
  }

  handle_bag_parameter_change(event) {
    event.preventDefault();
    const element = event.target;
    const newState = { ...this.state };
    newState.bag_parameters[element.name] = element.value;
    this.setState(newState);
  }

  get_price_per_one_piece(
    length,
    width,
    material_length,
    material_width,
    material_one_mtr_price
  ) {
    const total_no_of_inches_in_one_mtr = material_length * material_width,
      no_of_pieces_per_one_mtr =
        total_no_of_inches_in_one_mtr / (length * width),
      one_piece_price = material_one_mtr_price / no_of_pieces_per_one_mtr;
    return one_piece_price;
  }

  get_price_per_one_jute_piece(event) {
    event.preventDefault();
    const {
      bag_piece_length_in_inches,
      bag_piece_width_in_inches,
      number_of_bag_pieces,
      gazet_lentgh_in_inches,
      gazet_width_in_inches,
      lining_length_in_inches,
      lining_width_in_inches,
      handle_length_in_inches,
      number_of_lining_pieces,
      zip_runners_quantity,
      zip_patti_length_in_inches,
      zip_patti_width_in_inches,
      zip_in_inches
    } = this.state.bag_parameters;
    const {
      jute_one_mtr_length_in_inches,
      jute_one_mtr_width_in_inches,
      jute_one_mtr_price,
      gazet_one_mtr_price,
      lining_one_mtr_length_in_inches,
      lining_one_mtr_width_in_inches,
      lining_one_mtr_price,
      zip_one_mtr_price,
      one_zip_runner_price,
      handle_one_mtr_price
    } = this.state.materials;
    const jute_one_piece_price = this.get_price_per_one_piece(
      bag_piece_length_in_inches,
      bag_piece_width_in_inches,
      jute_one_mtr_length_in_inches,
      jute_one_mtr_width_in_inches,
      jute_one_mtr_price
    ),
      gazet_price = this.get_price_per_one_piece(
        gazet_lentgh_in_inches,
        gazet_width_in_inches,
        jute_one_mtr_length_in_inches,
        jute_one_mtr_width_in_inches,
        gazet_one_mtr_price
      ),
      lining_one_piece_price = this.get_price_per_one_piece(
        lining_length_in_inches,
        lining_width_in_inches,
        lining_one_mtr_length_in_inches,
        lining_one_mtr_width_in_inches,
        lining_one_mtr_price
      ),
      zip_patti_price = this.get_price_per_one_piece(
        zip_patti_length_in_inches,
        zip_patti_width_in_inches,
        jute_one_mtr_length_in_inches,
        jute_one_mtr_width_in_inches,
        gazet_one_mtr_price
      );
    const jute_price =
      number_of_bag_pieces * jute_one_piece_price +
      gazet_price +
      zip_patti_price,
      inches_per_meter = 39.37,
      price =
        jute_price +
        lining_one_piece_price * number_of_lining_pieces +
        one_zip_runner_price * zip_runners_quantity +
        ((zip_in_inches * zip_one_mtr_price) / inches_per_meter) + 
        ((handle_length_in_inches * handle_one_mtr_price) / inches_per_meter);
    let cost = price + this.state.making_charge,
      final_price = cost + cost * 0.01 * this.state.margin_percent;
    this.setState({
      cost: parseFloat(cost.toFixed(2)),
      price: parseFloat(final_price.toFixed(2))
    });
  }

  render() {
    let material_parameters_control = [],
      bag_parameters_controls = [];
    Object.entries(this.state.materials).forEach(([key, value]) => {
      material_parameters_control.push(
        <NumericInput
          label={key.split("_").join(" ")}
          id={key}
          key={key}
          name={key}
          value={value}
          handleChange={this.handle_materials_parameter_change}
        />
      );
    });
    Object.entries(this.state.bag_parameters).forEach(([key, value]) => {
      bag_parameters_controls.push(
        <NumericInput
          label={key.split("_").join(" ")}
          id={key}
          key={key}
          name={key}
          value={value}
          disabled={this.state.disable_bag_parameters}
          handleChange={this.handle_bag_parameter_change}
        />
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-5">
            <div> <h5> Cost of Materials </h5> </div>
            {material_parameters_control}
            <div className="form-group">
              <button
                className="form-control col-sm-6 col-lg-3 btn btn-primary"
                onClick={(event) => {
                  event.preventDefault();
                  window.scroll(0, 0);
                  this.setState({
                    disable_bag_parameters: false
                  });
                }}
              >
                Continue
              </button>
            </div>
          </div>
          <div className="col-1 vl"></div>
          <div className="col-5">
          <div> <h5> Bag parameters </h5> </div>
            <div className="form">
              {bag_parameters_controls}
              <NumericInput
                label="making charge"
                id="making_charge"
                key="making_charge"
                name="making_charge"
                value={this.state.making_charge}
                handleChange={(event) => {
                  event.preventDefault();
                  this.setState({
                    making_charge: event.target.value
                  });
                }}
              />
              <NumericInput
                label="margin"
                id="margin_percent"
                key="margin_percent"
                name="margin_percent"
                value={this.state.margin_percent}
                handleChange={(event) => {
                  event.preventDefault();
                  this.setState({
                    margin_percent: event.target.value
                  });
                }}
              />
              <div className="form-group">
                <button
                  className="form-control col-sm-6 col-lg-3 btn btn-primary"
                  onClick={this.get_price_per_one_jute_piece}
                  disabled={this.state.disable_bag_parameters}
                >
                  Get price
                </button>
              </div>
            </div>
            {this.state.price ? (
              <div>
                <div className="row">
                  <p className="col-8"> cost </p>
                  <p className="font-red"> {this.state.cost} &#8377; </p>
                </div>
                <div className="row">
                  <p className="col-8"> price </p>
                  <p className="font-red"> {this.state.price} &#8377; </p>
                </div>
              </div>
            ) : (
                ""
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default function App() {
  return (
    <div className="container">
      <br />
      <EstimatePrice />
    </div>
  );
}
