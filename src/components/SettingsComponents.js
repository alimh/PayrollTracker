import React from 'react';
import { InputBox } from './FormComponents';

class SettingsComponents extends React.Component {
  constructor(props) {
    super();

    this.props = props;

    this.state = {
      text: '',
    };
  }

  updateNewText(t) {
    this.setState({
      text: t,
    });
  }

  handleAdd() {
    this.props.onCreate(this.state.text);
    this.setState({ text: '' });
  }

  handleDisable(e, key) {
    e.preventDefault();
    this.props.onDisable(key);
  }

  render() {
    return (
      <div className="SettingsComponent">
        <div className="SettingsComponent-header">{this.props.header}</div>
        <div className="SettingsCompoenent-body">
          <ul>
            {
              this.props.content.map((content, i) =>
                <li key={this.props.header.concat('-').concat(i)}>{content} <a href="" onClick={e => this.handleDisable(e, content)}>x</a></li>,
                )
            }
          </ul>
          <InputBox
            name="text"
            type="text"
            value={this.state.text}
            onUpdate={text => this.updateNewText(text)}
          />
          <button onClick={() => this.handleAdd()}>Add</button>
        </div>
      </div>
    );
  }
}
export default SettingsComponents;
