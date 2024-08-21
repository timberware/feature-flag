package models

type QueryDto struct {
	Name        string `form:"name"`
	Type        string `form:"type"`
	Environment string `form:"environment"`
	Project     string `form:"project"`
	IsEnabled   *bool  `form:"isEnabled"`
}
