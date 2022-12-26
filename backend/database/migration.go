package database

import (
	"fmt"
	"waizly/models"
	"waizly/pkg/mysql"
	
)

func RunMigration() {
 err := mysql.DB.AutoMigrate(&models.User{},&models.Todo{})
 if err!= nil{
		fmt.Println(err)
		panic("failed to migrate")
	}
fmt.Println("Migration success")
}