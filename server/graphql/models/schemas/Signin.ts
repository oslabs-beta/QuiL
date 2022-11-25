export const SiginType: string = `
type SigninResponse {
    token: String,
    error: String
}

<<<<<<< HEAD
type OAuthResponse {
    token: String
}`;
=======
type CreatedUserResponse {
    success: Boolean,
    userId: Int,
    token: String
  }
type GetUserProjectRes {
    name: [String],
    owner_id: Int,
    saved_db: [String],
    success: Boolean
}

 type SaveData {
    projectName: String,
    success: Boolean,
    projectId: Int   
 }`;
>>>>>>> dev
