import React from "react";


class SubmitButton extends React.Component {
  render() {
    return (
      <>
        <div className="submitButton"></div>
        <button 
        className= 'btn'
        disabled={this.props.disabled}
        onClick={ () => this.props.onClick()}
        >
          {this.props.text}
        </button>
      </>
    );
  }
}

export default SubmitButton
;
