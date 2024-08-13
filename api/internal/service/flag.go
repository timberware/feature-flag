package service

import (
	"feature-flag/internal/repository"
	"feature-flag/internal/repository/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

var validate *validator.Validate

func init() {
	validate = validator.New()
}

func Get(c *gin.Context) {

}

func GetById(c *gin.Context) (models.Flag, error) {
	idStr := c.Param("id")

	id, err := uuid.Parse(idStr)
	if err != nil {
		return models.Flag{}, fmt.Errorf("invalid UUID: %w", err)
	}

	flag, err := repository.GetById(id)
	if err != nil {
		return models.Flag{}, fmt.Errorf("db error: %w", err)
	}

	if (flag == models.Flag{}) {
		return models.Flag{}, fmt.Errorf("flag not found: %w", err)
	}

	return flag, nil
}

func Create(req models.FlagRequest) (models.Flag, error) {
	err := validate.Struct(req)
	if err != nil {
		return models.Flag{}, err
	}

	flag := models.Flag{
		ID:          uuid.New(),
		Name:        req.Name,
		Type:        req.Type,
		Value:       req.Value,
		Environment: req.Environment,
		Project:     req.Project,
		IsEnabled:   req.IsEnabled,
	}

	_, err = repository.Create(flag)
	if err != nil {
		return models.Flag{}, err
	}

	return flag, nil
}

func ToggleEnabled(c *gin.Context) {

}

func DeleteFlag(c *gin.Context) {

}
