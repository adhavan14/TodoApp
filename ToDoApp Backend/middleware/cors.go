package middleware

import "github.com/gin-gonic/gin"

func SetCors(context *gin.Context) {
	context.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	context.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	context.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	if context.Request.Method == "OPTIONS" {
		context.AbortWithStatus(200)
		return
	}
	context.Next()
}