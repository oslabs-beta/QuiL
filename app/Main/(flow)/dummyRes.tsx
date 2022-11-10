const res = {
    data: {
      getGraph: {
        nodes: [
          {
            name: "users",
            primaryKey: "_id",
            columns: [
              {
                columnName: "_id",
                dataType: "integer",
              },
              {
                columnName: "username",
                dataType: "character varying",
              },
              {
                columnName: "password",
                dataType: "character varying",
              },
              {
                columnName: "first_name",
                dataType: "character varying",
              },
              {
                columnName: "last_name",
                dataType: "character varying",
              },
            ],
            edges: [],
          },
          {
            name: "metrics",
            primaryKey: "_id",
            columns: [
              {
                columnName: "_id",
                dataType: "integer",
              },
              {
                columnName: "name",
                dataType: "character varying",
              },
              {
                columnName: "units",
                dataType: "character varying",
              },
            ],
            edges: [],
          },
          {
            name: "habits",
            primaryKey: "_id",
            columns: [
              {
                columnName: "_id",
                dataType: "integer",
              },
              {
                columnName: "name",
                dataType: "character varying",
              },
              {
                columnName: "description",
                dataType: "character varying",
              },
            ],
            edges: [],
          },
          {
            name: "user_habits",
            primaryKey: "_id",
            columns: [
              {
                columnName: "_id",
                dataType: "integer",
              },
              {
                columnName: "user_id",
                dataType: "integer",
              },
              {
                columnName: "habit_id",
                dataType: "integer",
              },
              {
                columnName: "points",
                dataType: "integer",
              },
              {
                columnName: "streak",
                dataType: "integer",
              },
              {
                columnName: "date_started",
                dataType: "character varying",
              },
            ],
            edges: [
              {
                FKey: "user_id",
                refTable: "users",
              },
              {
                FKey: "habit_id",
                refTable: "habits",
              },
            ],
          },
          {
            name: "user_metrics",
            primaryKey: "_id",
            columns: [
              {
                columnName: "_id",
                dataType: "integer",
              },
              {
                columnName: "user_id",
                dataType: "integer",
              },
              {
                columnName: "metric_id",
                dataType: "integer",
              },
              {
                columnName: "value",
                dataType: "integer",
              },
              {
                columnName: "float_value",
                dataType: "numeric",
              },
            ],
            edges: [
              {
                FKey: "user_id",
                refTable: "users",
              },
              {
                FKey: "metric_id",
                refTable: "metrics",
              },
            ],
          },
          {
            name: "challenges",
            primaryKey: "_id",
            columns: [
              {
                columnName: "_id",
                dataType: "integer",
              },
              {
                columnName: "points",
                dataType: "integer",
              },
              {
                columnName: "name",
                dataType: "character varying",
              },
              {
                columnName: "description",
                dataType: "character varying",
              },
            ],
            edges: [],
          },
          {
            name: "user_challenges",
            primaryKey: "_id",
            columns: [
              {
                columnName: "_id",
                dataType: "integer",
              },
              {
                columnName: "user_id",
                dataType: "integer",
              },
              {
                columnName: "challenge_id",
                dataType: "integer",
              },
              {
                columnName: "frequency",
                dataType: "integer",
              },
              {
                columnName: "completed_on_last_date",
                dataType: "boolean",
              },
              {
                columnName: "last_date_assigned",
                dataType: "character varying",
              },
            ],
            edges: [
              {
                FKey: "challenge_id",
                refTable: "challenges",
              },
              {
                FKey: "user_id",
                refTable: "users",
              },
            ],
          },
        ],
      },
    },
  };

  export default res;