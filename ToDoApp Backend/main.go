package main

import (
	"com/app/controller"
	"com/app/middleware"
	"com/app/repository"

	"github.com/gin-gonic/gin"
)


func init() {
	repository.InitDB()
}

func main() {
	server := gin.Default()
	server.Use(middleware.SetCors)
	controller.GateWay(server)
	server.Run(":8080")
}