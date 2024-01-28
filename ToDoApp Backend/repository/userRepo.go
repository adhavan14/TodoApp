package repository

import "com/app/entity"

func CreateUser(user *entity.User) error {

	query := `insert into users (username, password) values (?,?)`

	statement, err := DB.Prepare(query)

	if err != nil {
		return err
	}

	result, err := statement.Exec(user.Username, user.Password)

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

func validCredentials(user *entity.User, password string) bool {
	return user.Password == password
}

func Authenticate(user *entity.User) bool {

	query := `select id, password from users where username = ?`

	row := DB.QueryRow(query, user.Username)

	var password string

	err := row.Scan(&user.Id, &password)

	if err != nil {
		return false
	}
	return validCredentials(user, password)
}