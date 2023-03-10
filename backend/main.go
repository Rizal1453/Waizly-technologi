package main

import (
	"fmt"
	"net/http"
	"waizly/database"
	"waizly/pkg/mysql"
	"waizly/routes"
	"github.com/gorilla/handlers"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

// On Terminal/Command Propt
func main() {
	errEnv := godotenv.Load()
	if errEnv != nil {
		panic("Failed to load env file")
	}
	
	mysql.DatabaseInit()
	database.RunMigration()
	r := mux.NewRouter()
	routes.RouteInit(r)
	routes.RouteInit(r.PathPrefix("/api/v1").Subrouter())
	var AllowedHeaders = handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	var AllowedMethods = handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "PATCH", "DELETE"})
	var AllowedOrigins = handlers.AllowedOrigins([]string{"*"})

	var port = "5000"

	fmt.Println("server running localhost:5000")
	// Embed the setup allowed in 2 parameter on this below code ...
	http.ListenAndServe("localhost:"+port, handlers.CORS(AllowedHeaders, AllowedMethods, AllowedOrigins)(r))
}