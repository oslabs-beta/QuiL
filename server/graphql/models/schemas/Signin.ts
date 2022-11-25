export const SiginType: string = `
type SigninResponse {
    token: String,
    error: String
}

type CreatedUserResponse {
    success: Boolean,
    userId: Int,
    token: String
  }
type GetUserProjectRes {
    db: [ProjectData],
    success: Boolean
}


 type SaveData {
    projectName: String,
    success: Boolean,
    projectId: Int   
 }
 
 type GetUser {
    username: String,
    password: String,
    success: Boolean
 }`;
