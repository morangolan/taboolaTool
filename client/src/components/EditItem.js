import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { editContentMutation, getContentQuery } from '../queries/queries';
import _ from 'lodash';

class EditItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      country: this.props.item.country,
      brand: "",
      title: "",
      thumbnail: "",
      id: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ country: nextProps.item.country });
    this.setState({ brand: nextProps.item.brand });
    this.setState({ title: nextProps.item.title });
    this.setState({ thumbnail: nextProps.item.thumbnail });
    this.setState({ id: nextProps.item.id });
  }

  submitForm(e){
    e.preventDefault();
    this.props.editContentMutation({
      variables: {
        country: this.state.country,
        brand: this.state.brand,
        title: this.state.title,
        thumbnail: this.state.thumbnail,
        id: this.state.id
      },
      refetchQueries: [{ query: getContentQuery }]
    });
    window.location.reload();
  }

  render() {
    if (_.isEmpty(this.props.item)){
      return <div></div>
    }

    return(
      <form className="edit-form" id="edit-content" onSubmit={ this.submitForm.bind(this) }>
        <div className="form-title">
          Edit Content item
        </div>
        <div className="field">
          <label>Country:</label>
          <input value={this.state.country} type="text" onChange={(e) => this.setState({ country: e.target.value })}/>
        </div>

        <div className="field">
          <label>Brand:</label>
          <input type="text" value={this.state.brand} onChange={(e) => this.setState({ brand: e.target.value })}/>
        </div>

        <div className="field">
          <label>Title:</label>
          <input value={this.state.title} type="text" onChange={(e) => this.setState({ title: e.target.value })}/>
        </div>

        <div className="field">
          <label>Image Url:</label>
          <input value={this.state.thumbnail} type="text" onChange={(e) => this.setState({ thumbnail: e.target.value })}/>
        </div>

        <button>Save</button>

      </form>
    )
  }
}

export default compose(
  graphql(editContentMutation, { name: "editContentMutation" })
)(EditItem);
