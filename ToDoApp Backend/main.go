package main

import (
	"com/app/controller"
	"com/app/repository"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)


func init() {
	repository.InitDB()
}

func main() {
	server := gin.Default()
	server.Use(cors.Default())
	controller.GateWay(server)
	server.Run(":8080")
}