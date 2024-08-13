package repository

import (
	"context"
	"feature-flag/internal/repository/db"
	"feature-flag/internal/repository/models"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func Get() {

}

func GetById(id uuid.UUID) (models.Flag, error) {
	var flag models.Flag
	filter := bson.M{"_id": id}
	err := db.DB.Collection("flags").FindOne(context.Background(), filter).Decode(&flag)
	if err != nil {
		return models.Flag{}, err
	}

	return flag, nil
}

func Create(flag models.Flag) (mongo.InsertOneResult, error) {
	coll := db.DB.Collection("flags")
	result, err := coll.InsertOne(context.Background(), flag)
	if err != nil {
		return mongo.InsertOneResult{}, err
	}

	return *result, nil
}

func ToggleEnabled() {

}

func DeleteFlag() {

}
