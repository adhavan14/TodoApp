package repository

import (
	"com/app/entity"
	"com/app/utils"
)

func CreateUser(user *entity.User) error {

	query := `insert into users (username, password) values (?,?)`

	statement, err := DB.Prepare(query)

	if err != nil {
		return err
	}

	encrytedPassword, err := utils.EncryptPassword(user.Password)

	if err != nil {
		return err
	}
	
	result, err := statement.Exec(user.Username, encrytedPassword)

	if err != nil {
		return err
	}

	id , err := result.LastInsertId()

	if err != nil {
		return err
	}

	user.Id = id
	return nil
}


func Login(user *entity.User) bool {

	query := `select id, password from users where username = ?`

	row := DB.QueryRow(query, user.Username)

	var password string

	err := row.Scan(&user.Id, &password)

	if err != nil {
		return false
	}
	return utils.CheckPassword(user.Password, password)
}