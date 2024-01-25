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

	createTable()
}

func createTable() {

	todoTable := `CREATE TABLE IF NOT EXISTS todo (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
		description TEXT NOT NULL,
		is_done BOOLEAN DEFAULT false
	)`

	_, err := DB.Exec(todoTable)
	if err != nil {
		panic(err)
	}
}