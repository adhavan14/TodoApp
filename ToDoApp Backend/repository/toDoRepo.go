package repository

import "com/app/entity"

func SaveTodo(todo *entity.Todo) error {

	query := `INSERT INTO todo(title, description, user_id) values (?,?,?)`

	statement, err := DB.Prepare(query)

	if err != nil {
		return err
	}

	result, err := statement.Exec(todo.Title, todo.Description, todo.UserId)

	if err != nil {
		return err
	}

	id, err := result.LastInsertId()

	if err != nil {
		return nil
	}

	todo.Id = id
	return nil
}

func GetAllTodos(userId int64) ([]entity.Todo, error) {

	var todos []entity.Todo
	query := `SELECT * FROM todo where user_id = ? ORDER BY id DESC`
	rows, err := DB.Query(query, userId)

	if err != nil {
		return todos, err
	}

	for rows.Next() {

		var todo entity.Todo
		err := rows.Scan(&todo.Id, &todo.Title, &todo.Description, &todo.IsDone, &todo.UserId)

		if err != nil {
			return todos, err
		}

		todos = append(todos, todo)
	}

	return todos, nil
}

func DeleteById(id int64) error {

	query := `DELETE FROM todo WHERE id = ?`

	_, err := DB.Exec(query, id)

	if err != nil {
		return err
	}
	return nil
}

func UpdateTodo(id int64, todo *entity.Todo) error {

	query := "UPDATE todo SET title = ?, description = ?, is_done = ? WHERE id = ?"

	_, err := DB.Exec(query, todo.Title, todo.Description, todo.IsDone, id)

	if err != nil {
		return err
	}
	return nil
}