import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {  getCountriesQuery, getBrandsQuery } from '../queries/queries';
import ContentList from './ContentList';

class FilterBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      country: "",
      brand: ""
    }
  }

  displayCountries(){
      var data = this.props.getCountriesQuery;
      if(data.loading){
        return (<option disabled> Loading ... </option>);
      }
      else {
        return data.countries.map(country => {
          return(
            <option key={country} value={country}> {country} </option>
          );
        })
      }
    }

  displayBrands(){
      var data = this.props.getBrandsQuery;
      if(data.loading){
        return (<option disabled> Loading ... </option>);
      }
      else {
        return data.brands.map(brand => {
          return(
            <option key={brand} value={brand}> {brand} </option>
          );
        })
      }
    }

  submitForm(e){
    e.preventDefault();
    this.setState({country:"", brand:""});
    this.refs.countryInput.value="";
    this.refs.brandInput.value="";
  }

  render() {
    return (
      <div>
        <form id="filter-bar" onSubmit={ this.submitForm.bind(this) }>
          <div className="field">
            <label>Country:</label>
            <select ref="countryInput" onChange={(e) => this.setState({ country: e.target.value })}>
              <option></option>
              { this.displayCountries() }
            </select>
          </div>

          <div className="field">
            <label>Brand:</label>
            <select ref="brandInput" onChange={(e) => this.setState({ brand: e.target.value })}>
              <option>{this.state.brand}</option>
              { this.displayBrands() }
            </select>
          </div>
          <button >Clear</button>
        </form>
        <div id="insturctuin">Select 6 items to display on Widget </div>
        <ContentList country={this.state.country} brand={this.state.brand} />
      </div>
    );
  }
}

export default compose(
  graphql(getBrandsQuery, { name: "getBrandsQuery" }),
  graphql(getCountriesQuery, { name: "getCountriesQuery" })
)(FilterBar);
