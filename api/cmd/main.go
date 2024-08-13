package main

import (
	"feature-flag/internal/controllers"
	"feature-flag/internal/repository/db"
	"github.com/joho/godotenv"
	"log"
)

func main() {
	err := godotenv.Load("env.dev")
	if err != nil {
		log.Fatalf("error loading env.dev file")
	}

	db.Connect()
	router := controllers.SetupRoutes()
	router.Run("localhost:8080")
}
