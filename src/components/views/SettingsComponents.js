import React from 'react';

class SettingsComponents extends React.Component {
  constructor(props) {
    super();

    this.props = props;

    this.state = {
      text: '',
    };
  }

  updateNewText(e) {
    console.log('updating text', e.target.value);
    this.setState({
      text: e.target.value,
    });
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
          <input id="text" type="text" onChange={e => this.updateNewText(e)} />
          <button onClick={() => this.props.onCreate(this.state.text)}>Save</button>
        </div>
      </div>
    );
  }
}
export default SettingsComponents;
