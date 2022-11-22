export const MutationType: string = `
type Mutation {
    signin(email: String, password: String): SigninResponse,
    handleOAuth(code: String): OAuthResponse
}`;
