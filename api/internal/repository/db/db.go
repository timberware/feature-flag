package db

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func Connect() {
	dbName := os.Getenv("MONGO_DATABASE")

	credential := options.Credential{
		AuthMechanism: "SCRAM-SHA-256",
		AuthSource:    os.Getenv("MONGO_AUTH_SOURCE"),
		Username:      os.Getenv("MONGO_USER"),
		Password:      os.Getenv("MONGO_PASS"),
	}

	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017").SetAuth(credential)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatalf("failed to connect to db: %v", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatalf("failed to ping db: %v", err)
	}

	DB = client.Database(dbName)

	return
}
