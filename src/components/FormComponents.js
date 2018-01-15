import React from 'react';

export const InputBox = props => (
  <div className="input-box-group">
    <label className="input-box-label" htmlFor={props.name}>{props.title}</label>
    <input
      className="input-box"
      id={props.name}
      type={props.inputType}
      value={props.value}
      onChange={e => props.onUpdate(e.target.value)}
      onBlur={e => props.onUpdate(e.target.value)}
      placeholder={props.placeholder}
      style={props.errMsg ? { border: '2px solid red' } : {}}
      disabled={props.disabled || false}
    />
    <span>{props.errMsg}</span>
  </div>
);

export const SelectBox = props => (
  <div className="select-box-group">
    <label className="select-box-label" htmlFor={props.name}>{props.title}</label>
    <select
      className="select-box"
      id={props.name}
      value={props.value}
      onChange={e => props.onUpdate(e.target.value)}
      style={props.errMsg ? { border: '2px solid red' } : {}}
      disabled={props.disabled || false}
    >
      <option value="">{props.placeholder}</option>
      {props.options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    <span>{props.errMsg}</span>
  </div>
);

export const Checkbox = props => (
  <div className="checkbox-group">
    <input
      className="check-box"
      name={props.name}
      onChange={() => props.onUpdate()}
      checked={props.value}
      type="checkbox"
    />{props.title}
  </div>
);
