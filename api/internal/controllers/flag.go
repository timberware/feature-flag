package controllers

import (
	"feature-flag/internal/repository/models"
	"feature-flag/internal/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

func SetupRoutes() *gin.Engine {
	router := gin.Default()

	router.GET("/", getFlags)
	router.GET("/:id", getFlag)
	router.POST("/", saveFlag)
	router.PATCH("/:id", toggleEnabled)
	router.DELETE("/:id", deleteFlag)

	return router
}

func getFlags(c *gin.Context) {
	var query models.QueryDto
	err := c.ShouldBindQuery(&query)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bad request"})
		return
	}

	flags, err := service.Get(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, flags)
	return
}

func getFlag(c *gin.Context) {
	flag, err := service.GetById(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"flag": flag})
	return
}

func saveFlag(c *gin.Context) {
	var requestBody models.FlagRequest

	err := c.BindJSON(&requestBody)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bad request"})
		return
	}

	flag, err := service.Create(requestBody)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"flag": flag})
	return
}

func toggleEnabled(c *gin.Context) {
	id := c.Param("id")
	var requestBody models.FlagRequest

	err := c.BindJSON(&requestBody)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bad request"})
		return
	}

	flag, err := service.ToggleEnabled(id, requestBody.IsEnabled)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, flag)
}

func deleteFlag(c *gin.Context) {
	id := c.Param("id")

	err := service.DeleteFlag(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusNoContent)
}
