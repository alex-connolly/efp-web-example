package main

import (
	"encoding/json"
	"ender/efp/efp"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// Request ...
type Request struct {
	Proto    string `json:"prototype"`
	Validate string `json:"validate"`
}

// Response ...
type Response struct {
	PErrs []string `json:"p_errs"`
	VErrs []string `json:"v_errs"`
}

func decodeRequest(r *http.Request) Request {
	var req Request
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Println("Could not read all:", err.Error())
	}
	log.Println(body)
	if err = json.Unmarshal(body, &req); err != nil {
		log.Println("Could not decode body:", err.Error())
	}
	defer r.Body.Close()
	return req
}

func main() {
	fmt.Println("Launched server!")
	r := mux.NewRouter()

	http.Handle("/", r)

	r.Handle("/api/validate", handler(validate)).Methods("PUT")

	//log.Fatal(http.ListenAndServe(":8080", r))
}

// attach the standard ServeHTTP method to our handler so the http library can call it
func (fn handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// here we could do some prep work before calling the handler if we wanted to
	w.Header().Set("Access-Control-Allow-Origin", "*")
	// call the actual handler

	response, err := fn(w, r)

	// check for errors
	if err != nil {
		log.Printf("ERROR: %v\n", err.Error)
		http.Error(w, fmt.Sprintf(`{"error":"%s"}`, err.Message), err.Code)
		return
	}
	if response == nil {
		log.Println("ERROR: response from method is nil")
		http.Error(w, "Internal server error. Check the logs.", http.StatusInternalServerError)
		return
	}

	// turn the response into JSON
	bytes, e := json.Marshal(response)
	if e != nil {
		http.Error(w, "Error marshalling JSON", http.StatusInternalServerError)
		return
	}

	// send the response and log
	w.Header().Set("Content-Type", "application/json")

	w.Write(bytes)
	log.Printf("%s %s %s %d", r.RemoteAddr, r.Method, r.URL, 200)
}

type handlerError struct {
	Error   error
	Message string
	Code    int
}

type handler func(w http.ResponseWriter, r *http.Request) (interface{}, *handlerError)

func validate(w http.ResponseWriter, r *http.Request) (interface{}, *handlerError) {
	fmt.Println("Validating...")
	request := decodeRequest(r)
	fmt.Printf("prototype: %s\n", request.Proto)
	p, errs := efp.PrototypeString(request.Proto)
	if errs != nil {
		return Response{errs, nil}, nil
	}
	_, errs = p.ValidateString(request.Validate)
	return Response{nil, errs}, nil
}
