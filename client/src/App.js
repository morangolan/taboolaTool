import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import FilterBar from './components/FilterBar';
import AddContent from './components/AddContent';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1> Content Bank Editor </h1>
          <FilterBar />
          <AddContent />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
