// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	strfmt "github.com/go-openapi/strfmt"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/swag"
	"github.com/go-openapi/validate"
)

// RescaleCoreTypeResources CPU/GPU cores
// swagger:model RescaleCoreTypeResources
type RescaleCoreTypeResources struct {

	// the number of CPU cores
	// Required: true
	Cores *int64 `json:"cores"`

	// the number of GPUs
	// Required: true
	Gpus *int64 `json:"gpus"`
}

// Validate validates this rescale core type resources
func (m *RescaleCoreTypeResources) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateCores(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateGpus(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *RescaleCoreTypeResources) validateCores(formats strfmt.Registry) error {

	if err := validate.Required("cores", "body", m.Cores); err != nil {
		return err
	}

	return nil
}

func (m *RescaleCoreTypeResources) validateGpus(formats strfmt.Registry) error {

	if err := validate.Required("gpus", "body", m.Gpus); err != nil {
		return err
	}

	return nil
}

// MarshalBinary interface implementation
func (m *RescaleCoreTypeResources) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *RescaleCoreTypeResources) UnmarshalBinary(b []byte) error {
	var res RescaleCoreTypeResources
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}