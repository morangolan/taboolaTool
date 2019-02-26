import React, { Component } from 'react';
import WidgetItem from './WidgetItem';

class WidgetDisplay extends Component {
  displaySelectedContent(){
    var data = this.props.content;
    if(!data){
      return (<div> Loading content... </div>);
    }
    else {
      return data.map(item =>
        <WidgetItem id={item} />
      );
    }
  }

  render() {
    return(
      <div className = "widget-container">
        <div className= "widget-title">
          <span id="like"> You May Like </span>
          <span id="sponsored"> Sponsored Link by Taboola </span>
        </div>
        <div className="selected-content">
          { this.displaySelectedContent() }
        </div>
        <button onClick={() => window.location.reload()}>Back to editor</button>
      </div>
    )
  }
}

export default WidgetDisplay;
