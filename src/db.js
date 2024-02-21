import mysql from "mysql2";

const mysqlConnection = mysql.createConnection({
  host: process.env.LOCAL_DB_HOST,
  user: process.env.LOCAL_DB_USER,
  password: process.env.LOCAL_DB__PASSWORD,
  database: process.env.LOCAL_DB_USING,
});

mysqlConnection.connect((err) => {
  if (err) return console.log(err);
  console.log("Connected to local DB");
});

export { mysqlConnection };
