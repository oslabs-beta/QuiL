// starwars dummy data

const res =  {"data": {
  "getAllData": {
      "nodes": [
          {
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
          },
          {
              "name": "people",
              "primaryKey": "_id",
              "columns": [
                  {
                      "columnName": "_id",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "species_id",
                      "dataType": "bigint"
                  },
                  {
                      "columnName": "homeworld_id",
                      "dataType": "bigint"
                  },
                  {
                      "columnName": "height",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "skin_color",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "eye_color",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "birth_year",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "gender",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "name",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "mass",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "hair_color",
                      "dataType": "character varying"
                  }
              ],
              "edges": [
                  {
                      "fKey": "species_id",
                      "refTable": "species"
                  },
                  {
                      "fKey": "homeworld_id",
                      "refTable": "planets"
                  }
              ]
          },
          {
              "name": "planets",
              "primaryKey": "_id",
              "columns": [
                  {
                      "columnName": "_id",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "rotation_period",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "orbital_period",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "diameter",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "population",
                      "dataType": "bigint"
                  },
                  {
                      "columnName": "climate",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "name",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "gravity",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "terrain",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "surface_water",
                      "dataType": "character varying"
                  }
              ],
              "edges": []
          },
          {
              "name": "people_in_films",
              "primaryKey": "_id",
              "columns": [
                  {
                      "columnName": "_id",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "person_id",
                      "dataType": "bigint"
                  },
                  {
                      "columnName": "film_id",
                      "dataType": "bigint"
                  }
              ],
              "edges": [
                  {
                      "fKey": "person_id",
                      "refTable": "people"
                  },
                  {
                      "fKey": "film_id",
                      "refTable": "films"
                  }
              ]
          },
          {
              "name": "films",
              "primaryKey": "_id",
              "columns": [
                  {
                      "columnName": "episode_id",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "_id",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "release_date",
                      "dataType": "date"
                  },
                  {
                      "columnName": "producer",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "opening_crawl",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "title",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "director",
                      "dataType": "character varying"
                  }
              ],
              "edges": []
          },
          {
              "name": "species_in_films",
              "primaryKey": "_id",
              "columns": [
                  {
                      "columnName": "_id",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "film_id",
                      "dataType": "bigint"
                  },
                  {
                      "columnName": "species_id",
                      "dataType": "bigint"
                  }
              ],
              "edges": [
                  {
                      "fKey": "film_id",
                      "refTable": "films"
                  },
                  {
                      "fKey": "species_id",
                      "refTable": "species"
                  }
              ]
          },
          {
              "name": "planets_in_films",
              "primaryKey": "_id",
              "columns": [
                  {
                      "columnName": "_id",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "film_id",
                      "dataType": "bigint"
                  },
                  {
                      "columnName": "planet_id",
                      "dataType": "bigint"
                  }
              ],
              "edges": [
                  {
                      "fKey": "film_id",
                      "refTable": "films"
                  },
                  {
                      "fKey": "planet_id",
                      "refTable": "planets"
                  }
              ]
          },
          {
              "name": "pilots",
              "primaryKey": "_id",
              "columns": [
                  {
                      "columnName": "_id",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "person_id",
                      "dataType": "bigint"
                  },
                  {
                      "columnName": "vessel_id",
                      "dataType": "bigint"
                  }
              ],
              "edges": [
                  {
                      "fKey": "vessel_id",
                      "refTable": "vessels"
                  },
                  {
                      "fKey": "person_id",
                      "refTable": "people"
                  }
              ]
          },
          {
              "name": "vessels",
              "primaryKey": "_id",
              "columns": [
                  {
                      "columnName": "_id",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "cost_in_credits",
                      "dataType": "bigint"
                  },
                  {
                      "columnName": "crew",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "passengers",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "vessel_type",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "vessel_class",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "consumables",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "length",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "max_atmosphering_speed",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "cargo_capacity",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "name",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "manufacturer",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "model",
                      "dataType": "character varying"
                  }
              ],
              "edges": []
          },
          {
              "name": "vessels_in_films",
              "primaryKey": "_id",
              "columns": [
                  {
                      "columnName": "_id",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "vessel_id",
                      "dataType": "bigint"
                  },
                  {
                      "columnName": "film_id",
                      "dataType": "bigint"
                  }
              ],
              "edges": [
                  {
                      "fKey": "vessel_id",
                      "refTable": "vessels"
                  },
                  {
                      "fKey": "film_id",
                      "refTable": "films"
                  }
              ]
          },
          {
              "name": "starship_specs",
              "primaryKey": "_id",
              "columns": [
                  {
                      "columnName": "_id",
                      "dataType": "integer"
                  },
                  {
                      "columnName": "vessel_id",
                      "dataType": "bigint"
                  },
                  {
                      "columnName": "hyperdrive_rating",
                      "dataType": "character varying"
                  },
                  {
                      "columnName": "MGLT",
                      "dataType": "character varying"
                  }
              ],
              "edges": [
                  {
                      "fKey": "vessel_id",
                      "refTable": "vessels"
                  }
              ]
          }
      ],
      "resolvers": [
        {
          "tableName": "species",
          "getOneString": "\n Query: {\n    speciesById: async (_, args) => {\n        const query = `SELECT * FROM species WHERE _id = $1`;\n        const values = [args._id];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }",
          "getAllString": "\n Query: {\n    species: async () => {\n        const query = `SELECT * FROM species`;\n        const values = [node.name];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }"
        },
        {
          "tableName": "people",
          "getOneString": "\n Query: {\n    person: async (_, args) => {\n        const query = `SELECT * FROM people WHERE _id = $1`;\n        const values = [args._id];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }",
          "getAllString": "\n Query: {\n    people: async () => {\n        const query = `SELECT * FROM people`;\n        const values = [node.name];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }"
        },
        {
          "tableName": "planets",
          "getOneString": "\n Query: {\n    planet: async (_, args) => {\n        const query = `SELECT * FROM planets WHERE _id = $1`;\n        const values = [args._id];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }",
          "getAllString": "\n Query: {\n    planets: async () => {\n        const query = `SELECT * FROM planets`;\n        const values = [node.name];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }"
        },
        {
          "tableName": "people_in_films",
          "getOneString": "\n Query: {\n    people_in_film: async (_, args) => {\n        const query = `SELECT * FROM people_in_films WHERE _id = $1`;\n        const values = [args._id];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }",
          "getAllString": "\n Query: {\n    people_in_films: async () => {\n        const query = `SELECT * FROM people_in_films`;\n        const values = [node.name];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }"
        },
        {
          "tableName": "films",
          "getOneString": "\n Query: {\n    film: async (_, args) => {\n        const query = `SELECT * FROM films WHERE _id = $1`;\n        const values = [args._id];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }",
          "getAllString": "\n Query: {\n    films: async () => {\n        const query = `SELECT * FROM films`;\n        const values = [node.name];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }"
        },
        {
          "tableName": "species_in_films",
          "getOneString": "\n Query: {\n    species_in_film: async (_, args) => {\n        const query = `SELECT * FROM species_in_films WHERE _id = $1`;\n        const values = [args._id];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }",
          "getAllString": "\n Query: {\n    species_in_films: async () => {\n        const query = `SELECT * FROM species_in_films`;\n        const values = [node.name];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }"
        },
        {
          "tableName": "planets_in_films",
          "getOneString": "\n Query: {\n    planets_in_film: async (_, args) => {\n        const query = `SELECT * FROM planets_in_films WHERE _id = $1`;\n        const values = [args._id];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }",
          "getAllString": "\n Query: {\n    planets_in_films: async () => {\n        const query = `SELECT * FROM planets_in_films`;\n        const values = [node.name];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }"
        },
        {
          "tableName": "pilots",
          "getOneString": "\n Query: {\n    pilot: async (_, args) => {\n        const query = `SELECT * FROM pilots WHERE _id = $1`;\n        const values = [args._id];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }",
          "getAllString": "\n Query: {\n    pilots: async () => {\n        const query = `SELECT * FROM pilots`;\n        const values = [node.name];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }"
        },
        {
          "tableName": "vessels",
          "getOneString": "\n Query: {\n    vessel: async (_, args) => {\n        const query = `SELECT * FROM vessels WHERE _id = $1`;\n        const values = [args._id];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }",
          "getAllString": "\n Query: {\n    vessels: async () => {\n        const query = `SELECT * FROM vessels`;\n        const values = [node.name];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }"
        },
        {
          "tableName": "vessels_in_films",
          "getOneString": "\n Query: {\n    vessels_in_film: async (_, args) => {\n        const query = `SELECT * FROM vessels_in_films WHERE _id = $1`;\n        const values = [args._id];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }",
          "getAllString": "\n Query: {\n    vessels_in_films: async () => {\n        const query = `SELECT * FROM vessels_in_films`;\n        const values = [node.name];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }"
        },
        {
          "tableName": "starship_specs",
          "getOneString": "\n Query: {\n    starship_spec: async (_, args) => {\n        const query = `SELECT * FROM starship_specs WHERE _id = $1`;\n        const values = [args._id];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }",
          "getAllString": "\n Query: {\n    starship_specs: async () => {\n        const query = `SELECT * FROM starship_specs`;\n        const values = [node.name];\n        const { rows } = await db.query(query, values);\n        return rows;\n    }\n }"
        }
      ],
      "schemas": "type Species {\n _id: ID!\n name: String!\n classification: String\n average_height: String\n average_lifespan: String\n hair_colors: String\n skin_colors: String\n eye_colors: String\n language: String\n people: [Person]\n films: [Film]\n planets: [Planet]\n}\n \ntype Person {\n _id: ID!\n name: String!\n mass: String\n hair_color: String\n skin_color: String\n eye_color: String\n birth_year: String\n gender: String\n height: Int\n films: [Film]\n vessels: [Vessel]\n species: [Species]\n planets: [Planet]\n}\n \ntype Planet {\n _id: ID!\n name: String\n rotation_period: Int\n orbital_period: Int\n diameter: Int\n climate: String\n gravity: String\n terrain: String\n surface_water: String\n population: Int\n species: [Species]\n people: [Person]\n films: [Film]\n}\n \ntype Film {\n _id: ID!\n title: String!\n episode_id: Int!\n opening_crawl: String!\n director: String!\n producer: String!\n release_date: String!\n people: [Person]\n species: [Species]\n planets: [Planet]\n vessels: [Vessel]\n}\n \ntype Vessel {\n _id: ID!\n name: String!\n manufacturer: String\n model: String\n vessel_type: String!\n vessel_class: String!\n cost_in_credits: Int\n length: String\n max_atmosphering_speed: String\n crew: Int\n passengers: Int\n cargo_capacity: String\n consumables: String\n people: [Person]\n films: [Film]\n starship_specs: [Starship_spec]\n}\n \ntype Starship_spec {\n _id: ID!\n hyperdrive_rating: String\n MGLT: String\n vessels: [Vessel]\n}\n \n"
  }
}
}

  export default res;