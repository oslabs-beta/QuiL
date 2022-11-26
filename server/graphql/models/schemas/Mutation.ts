export const MutationType: string = `
type Mutation {
    signin(email: String, password: String): SigninResponse,
    newUser(username: String, password: String): CreatedUserResponse,
    saveData(projectName: String, projectData: String, userId: Int): SaveData,
    valUser(username: String, password: String): GetUser
}`;
