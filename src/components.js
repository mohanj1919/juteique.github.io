import React from "react";

export function NumericInput(props) {
  return (
    <div className="form-group row">
      <label className="col-lg-6 col-sm-8" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className={"form-control col-lg-3 col-sm-4 " + props.classes}
        id={props.id}
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        defaultValue={props.value}
        onChange={props.handleChange}
        name={props.name}
        disabled={props.disabled}
      />
    </div>
  );
}
