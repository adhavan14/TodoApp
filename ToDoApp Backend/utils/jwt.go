package utils

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var secretKey *ecdsa.PrivateKey

func GenerateToken(username string, id int64) (string, error) {

	key, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)

	if err != nil {
		return "", err
	}
	
	secretKey = key

	token := jwt.NewWithClaims(jwt.SigningMethodES256, jwt.MapClaims{
		"username" : username,
		"id" : id,
		"exp" : time.Now().Add(time.Hour * 2).Unix(),
	})
	return token.SignedString(secretKey)
}


func VerifyToken(token string) (int64, error) {

	if secretKey == nil {
		return 0, errors.New("Key is not available")
	}

	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodECDSA)
		if !ok {
			return nil, errors.New("Invalid method")
		}

		return &secretKey.PublicKey, nil
	})

	if err != nil {
		return 0, errors.New("Could not parse token")
	}

	isValid := parsedToken.Valid

	if !isValid {
		return 0, errors.New("Invalid token")
	}

	claims, ok := parsedToken.Claims.(jwt.MapClaims)

	if !ok {
		return 0, errors.New("Invalid token")
	}

	userId := int64(claims["id"].(float64))
	return  userId, nil
}