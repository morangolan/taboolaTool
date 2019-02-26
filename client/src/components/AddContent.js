import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {  addContentMutation, getContentQuery, getCountriesQuery, getBrandsQuery } from '../queries/queries';

class AddContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      country: "",
      brand: "",
      title: "",
      thumbnail: ""
    }
  }

  submitForm(e){
    e.preventDefault();
    if (this.state.country==="" || this.state.brand==="" || this.state.title==="" || this.state.thumbnail===""){
      document.getElementById("error").innerHTML = "Must complete all fields!";
    }
    else{
      this.props.addContentMutation({
        variables: {
          country: this.state.country,
          brand: this.state.brand,
          title: this.state.title,
          thumbnail: this.state.thumbnail
        },
        refetchQueries: [{ query: getContentQuery, getCountriesQuery, getBrandsQuery }]
      });
      window.location.reload();
    }
  }

  render() {
    return (
      <form className="edit-form" id="add-content" onSubmit={ this.submitForm.bind(this) }>
        <div className="form-title">
          Add New Content item
        </div>
        <div className="field">
          <label>Country:</label>
          <input type="text" onChange={(e) => this.setState({ country: e.target.value })}/>
        </div>

        <div className="field">
          <label>Brand:</label>
          <input type="text" onChange={(e) => this.setState({ brand: e.target.value })}/>
        </div>

        <div className="field">
          <label>Title:</label>
          <input type="text" onChange={(e) => this.setState({ title: e.target.value })}/>
        </div>

        <div className="field">
          <label>Image Url:</label>
          <input type="text" onChange={(e) => this.setState({ thumbnail: e.target.value })}/>
        </div>

        <div id="error"></div>

        <button>+</button>

      </form>
    );
  }
}

export default compose(
  graphql(getContentQuery, { name: "getContentQuery" }),
  graphql(addContentMutation, { name: "addContentMutation" })
)(AddContent);
