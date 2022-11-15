import { type } from "os";

export type GlobalServerError = {
    log: string,
    status: number,
    message: {err: string}
};

export type dbConstructor = {
    new (s: string): object
    dbType: string,
    query: Function
    pool: {query: Function}
    queryTables: Function
    queryColumns: Function
    queryPKey: Function
    queryFKeys: Function
    queryTableLayout: Function
}

export type unparsedColumnShape = {
    column_name: string,
    data_type: string
}

export type parsedColumnShape = {
    columnName: string,
    dataType: string
}

export type unparsedKeys = {
    table_name: string,
    pg_get_constraintdef: string
}

export type parsedFKeys = {
    fKey: string,
    refTable: string
}

export type nodeShape = {
    name: string,
    primaryKey: string,
    columns: parsedColumnShape[],
    edges: parsedFKeys[]
}

export type objectOfArrOfNodes = {
    nodes: nodeShape[]
}

// TODO: change schema types
export type schema = {
    [key: string]: any,
}

export type pSQLToGQL = {
    [key: string]: string,
}

// Server Types
export type QuiLData = {
    nodes: nodeShape[], 
    resolvers: string[]
    schemas: string[],
}
