export const LOGIN_MUTATION = `
mutation Login($input: LoginInputDto!) {
  login(input: $input) {
    accessToken
  }
}
`;

