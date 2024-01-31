package controller

import (
	"com/app/middleware"

	"github.com/gin-gonic/gin"
)


func GateWay(server *gin.Engine) {

	
	authenticated := server.Group("/")
	authenticated.Use(middleware.Authenticate)
	authenticated.POST("/todo/create", saveTodo)
	authenticated.DELETE("/todo/delete", deleteById)
	authenticated.PUT("/todo/update/:id", updateTodo)
	authenticated.GET("/todo/getAll", getAllTodos)
	
	server.POST("/user/create", createUser)
	server.POST("/user/login", login)
}