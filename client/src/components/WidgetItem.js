import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getContentByIdQuery } from '../queries/queries';


class WidgetItem extends Component {
  displayItem(){
    var data = this.props.data;
    if(data.loading){
      return (<div> Loading item... </div>);
    }
    else {
      var item = data.contentById;
      return (
        <div className="widget-item">
          <img src = { item.thumbnail } alt="thumbnail" />
          <span className="title"> {item.title} </span>
          <span className="brand"> {item.brand} </span>
        </div>
      );
    }
  }

  render() {
    return(
      this.displayItem()
    )
  }
}

export default graphql(getContentByIdQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.id
      }
    }
  }
})(WidgetItem);
