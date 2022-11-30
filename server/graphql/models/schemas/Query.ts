export const QueryType: string = `
    type Query {
        getAllData(uri: String): Data,
        getUserProjects(userId: Int): GetUserProjectRes,
        testResolver: testType
    }
    
    type testType {
        test: String
    }`;
