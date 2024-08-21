package repository

import (
	"context"
	"feature-flag/internal/repository/db"
	"feature-flag/internal/repository/models"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Get(query models.QueryDto) ([]models.Flag, error) {
	filter := bson.M{}
	if query.Name != "" {
		filter["name"] = query.Name
	}
	if query.Type != "" {
		filter["type"] = query.Type
	}
	if query.Environment != "" {
		filter["environment"] = query.Environment
	}
	if query.Project != "" {
		filter["project"] = query.Project
	}
	if query.IsEnabled != nil {
		filter["isEnabled"] = *query.IsEnabled
	}
	opts := options.Find().SetSort(bson.D{{"timestamp", -1}})

	cursor, err := db.DB.Collection("flags").Find(context.Background(), filter, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var flags []models.Flag
	err = cursor.All(context.Background(), &flags)
	if err != nil {
		return nil, err
	}

	return flags, nil
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

func ToggleEnabled(id uuid.UUID, isEnabled bool) (models.Flag, error) {
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"isEnabled": isEnabled}}

	var flag models.Flag
	err := db.DB.Collection("flags").FindOneAndUpdate(context.Background(), filter, update, options.FindOneAndUpdate().SetReturnDocument(options.After)).Decode(&flag)
	if err != nil {
		return models.Flag{}, err
	}

	return flag, nil
}

func DeleteFlag(id uuid.UUID) error {
	filter := bson.M{"_id": id}
	_, err := db.DB.Collection("flags").DeleteOne(context.Background(), filter)
	if err != nil {
		return err
	}

	return nil
}
