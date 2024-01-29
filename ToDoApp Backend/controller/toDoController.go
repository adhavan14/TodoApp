package controller

import (
	"com/app/entity"
	"com/app/repository"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
)

func saveTodo(context *gin.Context) {

	var todo *entity.Todo

	err := context.ShouldBindJSON(&todo)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message":"Invalid input"})
		return
	}

	todo.UserId = context.GetInt64("userId")
	
	err = repository.SaveTodo(todo)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message":"Try again later"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message":"created successful"})
}

func getAllTodos(context *gin.Context) {

	todos, err := repository.GetAllTodos()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message":"Try again later"})
		return
	}

	context.JSON(http.StatusOK, todos)
}

func deleteById(context *gin.Context) {
	id, err := strconv.ParseInt(context.Query("id"), 10, 64)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message":"Invalid id"})
		return
	}

	err = repository.DeleteById(id)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message":"Try again later"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message":"deleted successful"})
}

func updateTodo(context *gin.Context) {

	var todo *entity.Todo
	id, err := strconv.ParseInt(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message":"Invalid id"})
		return
	}

	err = context.ShouldBindJSON(&todo)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message":"Invalid input"})
		return
	}

	err = repository.UpdateTodo(id, todo)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message":"Try again later"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message":" updated successful"})
}