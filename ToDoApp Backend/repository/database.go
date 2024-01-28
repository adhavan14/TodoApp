package repository

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB
func InitDB() {
	db, err := sql.Open("sqlite3", "todo.db")

	if err != nil {
		panic("Can't able to create database")
	}
	DB = db

	createTables()
}

func createTables() {

	todoTable := `CREATE TABLE IF NOT EXISTS todo (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
		description TEXT NOT NULL,
		is_done BOOLEAN DEFAULT false,
		user_id INTEGER NOT NULL,
		FOREIGN KEY (user_id) REFERENCES users(id)
	)`

	_, err := DB.Exec(todoTable)
	if err != nil {
		panic(err)
	}

	userTable := `CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT NOT NULL,
		password TEXT NOT NULL
	)`
	
	_,err = DB.Exec(userTable)
	if err != nil {
		panic(err)
	}
}