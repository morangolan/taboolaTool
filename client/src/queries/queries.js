import { gql } from 'apollo-boost';

const getContentsQuery = gql`
  {
    contents {
      country,
      brand,
      title,
      thumbnail,
      id
    }
  }
`

const addContentMutation = gql`
  mutation($country: String!, $brand: String!, $title: String!, $thumbnail: String!){
    addContent(country: $country, brand: $brand, title: $title, thumbnail: $thumbnail){
      country
      brand
      title
      thumbnail
      id
    }
  }
`

const editContentMutation = gql`
  mutation($country: String!, $brand: String!, $title: String!, $thumbnail: String!, $id: ID!){
    editContent(country: $country, brand: $brand, title: $title, thumbnail: $thumbnail, id: $id){
      country
      brand
      title
      thumbnail
      id
    }
  }
`


const getContentQuery = gql`
  query($country: String, $brand: String){
    content(country: $country, brand: $brand){
      country,
      brand,
      title,
      thumbnail,
      id
    }
  }
`
const getContentByIdQuery = gql`
  query($id: ID){
    contentById(id: $id){
      country,
      brand,
      title,
      thumbnail,
      id
    }
  }
`
const getCountriesQuery = gql`
{
  countries
}
`

const getBrandsQuery = gql`
{
  brands
}
`

export {getContentsQuery, addContentMutation, getContentQuery, getCountriesQuery, getBrandsQuery, getContentByIdQuery, editContentMutation };
