package routes

import (
	"waizly/handlers"
	"waizly/pkg/middleware"
	"waizly/pkg/mysql"
	"waizly/repositories"

	"github.com/gorilla/mux"
)

func AuthRoutes(r *mux.Router) {
	userRepository := repositories.RepositoryAuth(mysql.DB)
	h := handlers.HandlerAuth(userRepository)

	r.HandleFunc("/register",h.Register).Methods("POST")
	r.HandleFunc("/login",h.Login).Methods("POST")
	r.HandleFunc("/check-auth",middleware.Auth(h.CheckAuth)).Methods("GET")

}