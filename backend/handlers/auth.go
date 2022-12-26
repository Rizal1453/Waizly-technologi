package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
	authdto "waizly/dto/auth"
	dto "waizly/dto/result"
	"waizly/models"
	"waizly/pkg/bcrypt"
	jwtnih "waizly/pkg/jwt"
	"waizly/repositories"

	"github.com/golang-jwt/jwt/v4"
)

type handlerAuth struct {
	AuthRepository repositories.AuthRepository
}
func HandlerAuth(AuthRepository repositories.AuthRepository) *handlerAuth {
	return &handlerAuth{AuthRepository}
}
func (h *handlerAuth)Register(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")

	request := new(authdto.RegisterRequest)
	if err := json.NewDecoder(r.Body).Decode(&request)
	err != nil {w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code : http.StatusBadRequest,Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	password,err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code : http.StatusInternalServerError,Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}
	user := models.User{
		Email: request.Email,
		Name: request.Name,
		Password: password,
	}
	data,err := h.AuthRepository.Register(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code : http.StatusInternalServerError,Message: "internal server error"}
		json.NewEncoder(w).Encode(response)
		return
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code : http.StatusOK,Data: data }
	json.NewEncoder(w).Encode(response)

}

func (h *handlerAuth)Login(w http.ResponseWriter,r * http.Request){
	w.Header().Set("Content-type","application/json")
	request := new(authdto.LoginRequest)
	if err := json.NewDecoder(r.Body).Decode(request)
	err!= nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest,Message: "Bad Request"}
		json.NewEncoder(w).Encode(response)
		return
	}
	user := models.User{
	Email: request.Email,
	Password: request.Password,
	}
	User,err := h.AuthRepository.Login(user.Email)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "email error"}
		json.NewEncoder(w).Encode(response)
		return
	}
	isValid := bcrypt.CheckPasswordHash(request.Password, User.Password)
	if !isValid  {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "password salah"}
		json.NewEncoder(w).Encode(response)
		return
	}
	claims:= jwt.MapClaims{}
	claims["id"] = User.ID
	claims["exp"]= time.Now().Add(time.Hour * 2).Unix()

	token , errGenerateToken:= jwtnih.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		fmt.Println("Unauthorize")
		return
	}
	loginResponse := authdto.LoginResponse{
		ID: User.ID,
		Name: User.Name,
		Email: User.Email,
		Password: User.Password,
		Token: token,
	}
	w.Header().Set("Content-Type", "application/json")
	response := dto.SuccessResult{Code: http.StatusOK, Data: loginResponse}
	json.NewEncoder(w).Encode(response)
}
func (h *handlerAuth)CheckAuth(w http.ResponseWriter,r * http.Request){
	w.Header().Set("Content-type","application/json")
	UserInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	UserId :=int(UserInfo["id"].(float64))
	User,err := h.AuthRepository.CheckAuth(UserId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest,Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	CheckAuthResponse := authdto.CheckAuthResponse{
		ID: User.ID,
		Name: User.Name,
		Email: User.Email,
		Password: User.Password,
		
	}
	w.Header().Set("Content-Type", "application/json")
	response := dto.SuccessResult{Code: http.StatusOK, Data: CheckAuthResponse}
	json.NewEncoder(w).Encode(response)
}