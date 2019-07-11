// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"strconv"

	strfmt "github.com/go-openapi/strfmt"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/swag"
	"github.com/go-openapi/validate"
)

// JobLogs the log structure
// swagger:model JobLogs
type JobLogs struct {

	// logs
	// Required: true
	Logs []*JobLog `json:"logs"`
}

// Validate validates this job logs
func (m *JobLogs) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateLogs(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *JobLogs) validateLogs(formats strfmt.Registry) error {

	if err := validate.Required("logs", "body", m.Logs); err != nil {
		return err
	}

	for i := 0; i < len(m.Logs); i++ {
		if swag.IsZero(m.Logs[i]) { // not required
			continue
		}

		if m.Logs[i] != nil {
			if err := m.Logs[i].Validate(formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("logs" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

// MarshalBinary interface implementation
func (m *JobLogs) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *JobLogs) UnmarshalBinary(b []byte) error {
	var res JobLogs
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
