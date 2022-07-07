import React from "react";

class okla extends React.Component {
  state = {
    value: this.props.value
  }
  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value
      })
    }
  }

  render() {
    console.log(this.props.value)
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default okla;