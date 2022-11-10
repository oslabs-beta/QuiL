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
          "users: () => db.get(\"users\")",
          "user: (_, args) => db.get({user: args.id})"
      ],
      "schemas": [
          "type User { name: String, age: Int }",
          "type Users { users: [User] }",
          "type Query { users: Users, user(id: Int): User }"
      ]
  }
}
}

  export default res;