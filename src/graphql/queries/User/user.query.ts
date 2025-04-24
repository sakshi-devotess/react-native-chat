import { gql } from '@apollo/client';
import { USER_FIELDS_WITH_VALID_EMAILS } from './user.fragment';
// import GraphQlService from '../../graphql';

export const GET_CURRENT_USER = gql`
  ${USER_FIELDS_WITH_VALID_EMAILS}
  query getCurrentUser {
    getCurrentUser {
      ...UserFieldsWithValidEmails
    }
  }
`;

// class UserGraphql extends GraphQlService {
//   async getCurrentUser() {
//     // const result = await this.client.query({
//     //   query: GET_CURRENT_USER,
//     //   fetchPolicy: 'network-only',
//     // });
//     // return result?.data?.getCurrentUser;
//   }
// }

// const userGraphqlInstance = new UserGraphql();
// export default userGraphqlInstance;
