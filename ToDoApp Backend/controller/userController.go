package controller

import (
	"com/app/entity"
	"com/app/repository"
	"com/app/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func createUser(context *gin.Context) {

	var user *entity.User

	err := context.ShouldBindJSON(&user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message" : "invalid input"})
		return
	}

	err = repository.CreateUser(user)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message" : "try again later"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "created successful"})
}

func login(context *gin.Context) {

	var user *entity.User

	err := context.ShouldBindJSON(&user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message" : "invalid input"})
		return
	}

	if (!repository.Authenticate(user)) {
		context.JSON(http.StatusInternalServerError, gin.H{"message" : "invalid credentials"})
		return
	}

	token, err := utils.GenerateToken(user.Username, user.Id)

	context.JSON(http.StatusOK, gin.H{"message" : "login successful", "token" : token})
}