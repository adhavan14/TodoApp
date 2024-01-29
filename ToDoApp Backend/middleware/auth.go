package middleware

import (
	"com/app/utils"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func Authenticate(context *gin.Context) {
	token := strings.Split(context.Request.Header.Get("Authorization"), " ")[1]

	if token == "" {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message":"Invalid credentials"})
		return
	}
	
	userId, err := utils.VerifyToken(token)

	if err != nil {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message":"Invalid credentials"})
		return
	}

	context.Set("userId", userId)
	context.Next()
}