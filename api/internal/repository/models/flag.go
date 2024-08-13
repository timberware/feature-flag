package models

import (
	"github.com/google/uuid"
)

type FlagRequest struct {
	Name        string      `json:"name" validate:"required"`
	Type        string      `json:"type" validate:"required,oneof=boolean string number"`
	Value       interface{} `json:"value" validate:"required"`
	Environment string      `json:"environment" validate:"required,oneof=staging production"`
	Project     string      `json:"project" validate:"required"`
	IsEnabled   bool        `json:"isEnabled"`
}

type Flag struct {
	ID          uuid.UUID   `json:"id" bson:"_id,omitempty"`
	Name        string      `json:"name" bson:"name"`
	Type        string      `json:"type" bson:"type"`
	Value       interface{} `json:"value" bson:"value"`
	Environment string      `json:"environment" bson:"environment"`
	Project     string      `json:"project" bson:"project"`
	IsEnabled   bool        `json:"isEnabled" bson:"isEnabled"`
}
