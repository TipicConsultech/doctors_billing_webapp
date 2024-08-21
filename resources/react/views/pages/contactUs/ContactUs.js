import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CButton,
  CFormSelect,
  CAlert
} from '@coreui/react';
import { post } from '../../../util/api';

function VehicleForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    location: '',
    vehicle_category: 'fourWheeler',
    vehicle_registration_number: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
  
    try {
      const response = await post('/api/contactUs', formData);
  
      if (response.ok) {
        // Assuming response.json() contains the success message
        const responseData = await response.json();
        setSuccessMessage(responseData.message || 'Form submitted successfully!');
        
        // Reset the form after successful submission
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          mobile: '',
          location: '',
          vehicle_category: 'fourWheeler',
          vehicle_registration_number: ''
        });
      } else {
        // Handle non-200 responses here
        const errorData = await response.json();
        setErrorMessage(`Submission failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Error submitting form. Please try again.');
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-3">
          <CCardHeader>
            <strong>Vehicle Registration Form</strong>
          </CCardHeader>
          <CCardBody>
            {successMessage && <CAlert color="success">{successMessage}</CAlert>}
            {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}
            <CForm onSubmit={handleSubmit}>
             
              <CRow>
              <div className="mb-3 col-sm-6">
                <CFormLabel htmlFor="first_name">First Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 col-sm-6">
                <CFormLabel htmlFor="last_name">Last Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              </CRow>
              
              <CRow>
               <div className="mb-3 col-sm-6">
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 col-sm-6">
                <CFormLabel htmlFor="mobile">Mobile Number</CFormLabel>
                <CFormInput
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              </CRow>

            <CRow>    
            <div className="mb-3 col-sm-6">
                <CFormLabel htmlFor="location">Location</CFormLabel>
                <CFormInput
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

             <div className="mb-3 col-sm-6">
                <CFormLabel htmlFor="vehicle_category">Vehicle Category</CFormLabel>
                <CFormSelect
                  id="vehicle_category"
                  name="vehicle_category"
                  value={formData.vehicle_category}
                  onChange={handleChange}
                  required
                >
                  <option value="fourWheeler">Four Wheeler</option>
                  <option value="heavyGoodsVehicle">Heavy Goods Vehicle</option>
                  <option value="other">Other</option>
                </CFormSelect>
              </div>
              </CRow>

              <div className="mb-3  col-sm-6">
                <CFormLabel htmlFor="vehicle_registration_number">Vehicle Registration Number</CFormLabel>
                <CFormInput
                  type="text"
                  id="vehicle_registration_number"
                  name="vehicle_registration_number"
                  value={formData.vehicle_registration_number}
                  onChange={handleChange}
                  required
                />
              </div>

              <CButton type="submit" color="primary">Submit</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default VehicleForm;
