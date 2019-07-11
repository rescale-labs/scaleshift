// Code generated by go-swagger; DO NOT EDIT.

package job

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	middleware "github.com/go-openapi/runtime/middleware"
	"github.com/rescale-labs/scaleshift/api/src/auth"
)

// GetJobDetailHandlerFunc turns a function with the right signature into a get job detail handler
type GetJobDetailHandlerFunc func(GetJobDetailParams, *auth.Principal) middleware.Responder

// Handle executing the request and returning a response
func (fn GetJobDetailHandlerFunc) Handle(params GetJobDetailParams, principal *auth.Principal) middleware.Responder {
	return fn(params, principal)
}

// GetJobDetailHandler interface for that can handle valid get job detail params
type GetJobDetailHandler interface {
	Handle(GetJobDetailParams, *auth.Principal) middleware.Responder
}

// NewGetJobDetail creates a new http.Handler for the get job detail operation
func NewGetJobDetail(ctx *middleware.Context, handler GetJobDetailHandler) *GetJobDetail {
	return &GetJobDetail{Context: ctx, Handler: handler}
}

/*GetJobDetail swagger:route GET /jobs/{id} job getJobDetail

returns the details of a job


*/
type GetJobDetail struct {
	Context *middleware.Context
	Handler GetJobDetailHandler
}

func (o *GetJobDetail) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		r = rCtx
	}
	var Params = NewGetJobDetailParams()

	uprinc, aCtx, err := o.Context.Authorize(r, route)
	if err != nil {
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}
	if aCtx != nil {
		r = aCtx
	}
	var principal *auth.Principal
	if uprinc != nil {
		principal = uprinc.(*auth.Principal) // this is really a auth.Principal, I promise
	}

	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params, principal) // actually handle the request

	o.Context.Respond(rw, r, route.Produces, route, res)

}
