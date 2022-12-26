package repositories

import (
	"waizly/models"

	"gorm.io/gorm"
)

type TodoRepository interface {
	Create(todo models.Todo) (models.Todo, error)
	GetAll() ([]models.Todo, error)
	GetByID(ID int) (models.Todo, error)
	Update(todo models.Todo) (models.Todo, error)
	Delete(todo models.Todo) (models.Todo, error)
}

func RepositoryTodo(db *gorm.DB) *repository {
	return &repository{db}
}
func (r *repository) Create(todo models.Todo) (models.Todo, error) {
	err := r.db.Create(&todo).Error

	return todo, err
}
func (r *repository) GetAll() ([]models.Todo, error) {
	var todos []models.Todo
	err := r.db.Find(&todos).Error

	return todos, err
}
func (r *repository) GetByID(ID int) (models.Todo, error) {
	var todo models.Todo
	err := r.db.First(&todo, ID).Error

	return todo, err
}
func (r *repository) Update(todo models.Todo) (models.Todo, error) {
	err := r.db.Save(&todo).Error

	return todo, err
}
func (r *repository) Delete(todo models.Todo) (models.Todo, error) {
	err := r.db.Delete(&todo).Error

	return todo, err
}