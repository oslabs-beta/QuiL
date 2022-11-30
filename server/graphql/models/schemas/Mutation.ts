export const MutationType: string = `
type Mutation {
    signin(username: String, password: String): JWTResponse,
    postOAuth(code: String, oauthType: String): JWTResponse,
    newUser(username: String, password: String): JWTResponse,
    saveData(projectName: String, projectData: String, userId: Int): SaveData,
    deleteProject(projectId: Int): DeleteResponse
}


type DeleteResponse {
    deleted: Boolean
}`;
