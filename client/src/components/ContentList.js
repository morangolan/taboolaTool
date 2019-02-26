import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getContentQuery } from '../queries/queries';
import WidgetDisplay from './WidgetDisplay';
import EditItem from './EditItem';

class ContentList extends Component {
  constructor(props){
    super(props);
      this.state = {
        selected: [],
        counter: 6,
        switchWidget: 1,
        edit: {}
      }
  }

  fetchData(){
    if(!this.props.country || !this.props.brand){
      return(<div> Loading content... </div>);
    }
  }

  clickItem(e, content){
    const selectedItems = this.state.selected;
    var counter = this.state.counter;
    if (selectedItems.includes(content.id)){
      var index = selectedItems.indexOf(content.id);
      selectedItems.splice(index, 1);
      counter++;
    }
    else{
      if (this.state.counter>0){
        selectedItems.push(content.id);
        counter--;
      }
    }
    this.setState({selected: selectedItems, counter: counter});
  }

  displayContent(){
    var data = this.props.data;
    if(data.loading){
      return (<div> Loading content... </div>);
    }
    if(data.length === 0){
      return (<div> No content found! </div>);
    }
    else {
      return data.content.map(content => {
        return(
            <li key={ content.id } >
              <span className="item-content"> { content.country } </span>
              <span className="item-content"> { content.brand } </span>
              <span className="item-content"> { content.title } </span>
              <img src = { content.thumbnail } alt="thumbnail" />
              <button
                onClick={(e) => this.clickItem(e, content)}
                className="select-item"
                id={this.state.selected.includes(content.id) ? "active" : ""}
              >{this.state.selected.includes(content.id) ? "v" : ""}
              </button>
              <span id="edit" onClick={(e)=> {this.setState({ edit: content})}}>edit</span>
            </li>
        );
      })
    }
  }

  generateWidget = () => {
    this.setState({switchWidget: 0})
  };

  render() {
    this.fetchData();
    return (
      this.state.switchWidget ?
        <div>
          <button
            onClick= {this.generateWidget.bind(this)}
            className="display-widget"
            id={this.state.counter===0 ? "active" : ""}
            disabled={this.state.counter!==0} >
            Display Widget
          </button>
          <ul className="content-list">
            <li id="items-title">
              <span className="item-content"> Country </span>
              <span className="item-content"> Brand </span>
              <span className="item-content"> Title </span>
              <span className="item-content"> Image </span>
              <span className="item-content"> Select </span>
            </li>
            { this.displayContent() }
          </ul>
          <EditItem item={ this.state.edit } />
        </div>
      :
      <WidgetDisplay content={this.state.selected}/>
    )
  }
}

export default graphql(getContentQuery, {
  options: (props) => {
    return {
      variables: {
        country: props.country,
        brand: props.brand
      }
    }
  }
})(ContentList);
