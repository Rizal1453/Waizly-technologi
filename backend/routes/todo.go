package routes

import (
	"waizly/handlers"
	"waizly/pkg/middleware"
	"waizly/pkg/mysql"
	"waizly/repositories"

	"github.com/gorilla/mux"
)

func TodoRoute(r *mux.Router) {
	todoRepository := repositories.RepositoryTodo(mysql.DB)
	h := handlers.HandlerTodo(todoRepository)

	r.HandleFunc("/create/todo",middleware.Auth(h.Create)).Methods("POST")
	r.HandleFunc("/todo/{id}",h.GetById).Methods("GET")
	r.HandleFunc("/todos",h.GetAll).Methods("GET")
	r.HandleFunc("/update/todo/{id}",middleware.Auth(h.Update)).Methods("PUT")
	r.HandleFunc("/delete/todo/{id}",middleware.Auth(h.Delete)).Methods("DELETE")
}