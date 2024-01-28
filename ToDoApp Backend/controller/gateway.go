package controller

import "github.com/gin-gonic/gin"


func GateWay(server *gin.Engine) {
	server.POST("/todo/create", saveTodo)
	server.GET("/todo/getAll", getAllTodos)
	server.DELETE("/todo/delete", deleteById)
	server.PUT("/todo/update/:id", updateTodo)
	server.POST("/user/create", createUser)
	server.POST("/user/login", login)
}