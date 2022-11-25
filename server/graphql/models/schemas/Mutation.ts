export const MutationType: string = `
type Mutation {
    signin(email: String, password: String): SigninResponse,
<<<<<<< HEAD
    handleOAuth(code: String): OAuthResponse
=======
    newUser(email: String, username: String, password: String): CreatedUserResponse,
    saveData(projectName: String, projectData: String, userId: Int): SaveData
>>>>>>> dev
}`;

