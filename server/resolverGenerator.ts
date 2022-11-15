const pluralize = require('pluralize')
import { node } from "../app/(root)/fronendTypes";
import { dbInstance } from "./db/dbConnection";
import { ArgType, nodeShape } from "./types";
export const DataType: string =`
  
type Planet {
    _id: ID!
    name: String
    rotation_period: Int
    orbital_period: Int
    diameter: Int
    climate: String
    gravity: String
    terrain: String
    surface_water: String
    population: Int
    species: [Species]
    films: [Film]
    people: [Person]
  }
`


const node: node = {
    "name": "species",
    "primaryKey": "_id",
    "columns": [
        {
            "columnName": "_id",
            "dataType": "integer"
        },
        {
            "columnName": "homeworld_id",
            "dataType": "bigint"
        },
        {
            "columnName": "classification",
            "dataType": "character varying"
        },
        {
            "columnName": "average_height",
            "dataType": "character varying"
        },
        {
            "columnName": "average_lifespan",
            "dataType": "character varying"
        },
        {
            "columnName": "hair_colors",
            "dataType": "character varying"
        },
        {
            "columnName": "skin_colors",
            "dataType": "character varying"
        },
        {
            "columnName": "eye_colors",
            "dataType": "character varying"
        },
        {
            "columnName": "language",
            "dataType": "character varying"
        },
        {
            "columnName": "name",
            "dataType": "character varying"
        }
    ],
    "edges": [
        {
            "fKey": "homeworld_id",
            "refTable": "planets"
        }
    ]
}


console.log(pluralize.singular('planet'));

const db = new (dbInstance as any)('postgres://lkdxllvk:GTIkPygxpPOx0ZVNJ3luQHEfApEIJekP@heffalump.db.elephantsql.com/lkdxllvk')

const makeResolver = (node: node ) => {

    const functionDef = {
        def: async (_: any, args: ArgType  ) => {
            const query = `SELECT * FROM ${node.name} WHERE ${node.primaryKey}`
            const values = [node.name]
            const {rows} = await db.query(query, values)
            return rows
            
        }
    }

    return {
        resolverName:  pluralize.singular(node.name),
        functionDef,
        functionString: JSON.stringify(functionDef, (key, val) => {
            if (typeof val === 'function') return val + ''
            return val
        })
    }
}

console.log(makeResolver(node));

