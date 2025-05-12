// put your GraphQL requests here (in one file or different ones)
import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      id
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;

export const GET_COUNTRY_BY_CODE = gql`
  query GetCountryByCode($code: String!) {
    country(code: $code) {
      id
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;

export const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      id
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;