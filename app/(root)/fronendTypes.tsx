import { type } from "os";
import  {Node, Edge, NodeChange, EdgeChange} from "reactflow";

export type DisplayContainerProps = {
    displayMode: string;
    userInputURI: (e: string) => void;
    uriLaunch: () => Promise<void>;
    resQL: resQL;
    schemaGen: () => void;
    resolverGen: () => void;
    edges: Edge[];
    nodes: Node[];
    handleSetEdges: (cb: (eds: Edge[]) => Edge[]) => void;
    handleSetNodes: (cb: (nds: Node[]) => Node[]) => void;
  }

export type NavigationBarProps = {
    isLogged: boolean;
}

export type VisualizeSchemaResolverProps = {
displayMode: string;
resQL: resQL;
schemaGen: () => void;
resolverGen: () => void;
}

export type SchemaProps = {
resQL: resQL;
}

export type ResolverProps = {
resQL: resQL
}

export type VisualizeDBProps = {
    userInputURI: (e: string) => void;
    nodes: Node[];
    edges: Edge[];
    handleSetEdges: (cb: (eds: Edge[]) => Edge[]) => void; 
    handleSetNodes: (cb: (nds: Node[]) => Node[]) => void;
    uriLaunch: () => Promise<void>;
}

export type ChartProps = {
    nodes: Node[];
    edges: Edge[];
    handleSetEdges: (cb: (eds: Edge[]) => Edge[]) => void; 
    handleSetNodes: (cb: (nds: Node[]) => Node[]) => void; 
}

// handleSetNodes/handleSetEdges may need to change
export type FlowProps = {
    nodes: Node[];
    edges: Edge[];
    handleSetEdges: (cb: (eds: Edge[]) => Edge[]) => void;
    handleSetNodes: (cb: (nds: Node[]) => Node[]) => void;
}

  export type resQL = {
    data: { getAllData };
  }

  export type getAllData = {
    nodes: nodes;
    resolvers: string[];
    schemas: string[];
}


export type nodes = node[];

export type node = {
    name: string;
    primaryKey: string;
    columns: columns;
    edges: edge[]
}

export type columns = column[];

export type column = {
    columnName: string;
    dataType: string;
}

export type edge = {
    fKey: string;
    refTable: string;
}

export interface data {
        name: string;
        key: number;
        columns: columns;
        edges: edge[];
        refTables: string[];
        arrFKeys: string[];
    }


export type position = {
    x: number;
    y: number;
}
