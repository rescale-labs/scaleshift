// Code generated by go-swagger; DO NOT EDIT.

package image

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	errors "github.com/go-openapi/errors"
	middleware "github.com/go-openapi/runtime/middleware"
	strfmt "github.com/go-openapi/strfmt"
	swag "github.com/go-openapi/swag"
	validate "github.com/go-openapi/validate"
)

// PostNewImageHandlerFunc turns a function with the right signature into a post new image handler
type PostNewImageHandlerFunc func(PostNewImageParams) middleware.Responder

// Handle executing the request and returning a response
func (fn PostNewImageHandlerFunc) Handle(params PostNewImageParams) middleware.Responder {
	return fn(params)
}

// PostNewImageHandler interface for that can handle valid post new image params
type PostNewImageHandler interface {
	Handle(PostNewImageParams) middleware.Responder
}

// NewPostNewImage creates a new http.Handler for the post new image operation
func NewPostNewImage(ctx *middleware.Context, handler PostNewImageHandler) *PostNewImage {
	return &PostNewImage{Context: ctx, Handler: handler}
}

/*PostNewImage swagger:route POST /images image postNewImage

pull a specified image from Docker registry


*/
type PostNewImage struct {
	Context *middleware.Context
	Handler PostNewImageHandler
}

func (o *PostNewImage) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		r = rCtx
	}
	var Params = NewPostNewImageParams()

	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request

	o.Context.Respond(rw, r, route.Produces, route, res)

}

// PostNewImageBody ImageName
// swagger:model PostNewImageBody
type PostNewImageBody struct {

	// Docker image name
	// Required: true
	Image *string `json:"image"`
}

// Validate validates this post new image body
func (o *PostNewImageBody) Validate(formats strfmt.Registry) error {
	var res []error

	if err := o.validateImage(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (o *PostNewImageBody) validateImage(formats strfmt.Registry) error {

	if err := validate.Required("body"+"."+"image", "body", o.Image); err != nil {
		return err
	}

	return nil
}

// MarshalBinary interface implementation
func (o *PostNewImageBody) MarshalBinary() ([]byte, error) {
	if o == nil {
		return nil, nil
	}
	return swag.WriteJSON(o)
}

// UnmarshalBinary interface implementation
func (o *PostNewImageBody) UnmarshalBinary(b []byte) error {
	var res PostNewImageBody
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*o = res
	return nil
}
