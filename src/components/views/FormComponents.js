import React from 'react';

export const InputBox = props => (
  <div className="input-box-group">
    <label className="input-box-label" htmlFor={props.name}>{props.title}</label>
    <input
      className="input-box"
      id={props.name}
      type={props.inputType}
      value={props.content}
      onChange={e => props.onUpdate(e.target.value)}
      onBlur={e => props.onUpdate(e.target.value)}
      placeholder={props.placeholder}
    />
  </div>
);

export const SelectBox = props => (
  <div className="select-box-group">
    <label className="select-box-label" htmlFor={props.name}>{props.title}</label>
    <select
      className="select-box"
      id={props.name}
      value={props.selectedOption}
      onChange={e => props.onUpdate(e.target.value)}
    >
      <option value="">{props.placeholder}</option>
      {props.options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);
