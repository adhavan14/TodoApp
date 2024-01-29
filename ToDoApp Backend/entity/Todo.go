package entity

import "errors"

type Todo struct {
	Id int64
	Title string
	Description string
	IsDone bool
	UserId int64
}

func createTodo(title string, description string) (*Todo, error) {

	if title == "" || description == "" {
		return nil, errors.New("input should not be empty")
	}
	return &Todo{
		Title: title,
		Description: description,
		IsDone: false,
	}, nil
}