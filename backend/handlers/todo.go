package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	dto "waizly/dto/result"
	tododto "waizly/dto/todo"
	"waizly/models"
	"waizly/repositories"

	"github.com/gorilla/mux"
)

type handlerTodo struct {
	TodoRepository repositories.TodoRepository
}
func HandlerTodo(TodoRepository repositories.TodoRepository) *handlerTodo{
	return &handlerTodo{TodoRepository}
}
func (h *handlerTodo)Create(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type","application/json")

	request := new(tododto.TodoRequest)
	if err := json.NewDecoder(r.Body).Decode(&request)
	err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code : http.StatusBadRequest,Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	todo := models.Todo{
		Title: request.Title,
		Description: request.Description,
		Status: "false",
	}
	data,err := h.TodoRepository.Create(todo)
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
func (h *handlerTodo)GetAll(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type","application/json")
	data,err := h.TodoRepository.GetAll()
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
func (h *handlerTodo)GetById(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type","aplication/json")
	id,_ := strconv.Atoi(mux.Vars(r)["id"])

	todo,err := h.TodoRepository.GetByID(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult {Code : http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code : http.StatusOK,Data: todo}
	json.NewEncoder(w).Encode(response)
}
func (h *handlerTodo)Update(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type","application/json")

	request := new(tododto.TodoRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	todo,err := h.TodoRepository.GetByID(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	if request.Title != "" {
		todo.Title = request.Title
	}
	if request.Description != "" {
		todo.Description = request.Description
	}
	if request.Status != "" {
		todo.Status = request.Status
	}
	data,err := h.TodoRepository.Update(todo)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)

}
func(h *handlerTodo)Delete(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type","application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	todo,err := h.TodoRepository.GetByID(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	data,err := h.TodoRepository.Delete(todo)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)

}