export const QueryType: string = `
    type Query {
        getAllData(uri: String): Data,
        getUserProjects(arg: Int): GetUserProjectRes
    }`;
