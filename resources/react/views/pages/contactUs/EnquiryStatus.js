import React, { useState, useEffect } from 'react';
import { MantineProvider, Container, Text, Stack, Button, Select, TextInput } from '@mantine/core';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CFormTextarea, CFormInput, CCard, CCardHeader, CCardBody } from '@coreui/react';
import { getAPICall, post, put } from '../../../util/api';
import { useLocation } from 'react-router-dom';
import '@coreui/coreui/dist/css/coreui.min.css';

function EnquiryStatus() {
  const [data, setData] = useState([]); // Store table data
  const [submitStatus, setSubmitStatus] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Control modal visibility
  const [enquiry, setEnquiry] = useState(''); // To hold current status
  const location = useLocation(); // Get location data from route
  const { id, type } = location.state || {}; // Destructure id and type from the state
  const [newEntry, setNewEntry] = useState({ 
    Enquiry_id: type === 0 ? `${id}` : `s-${id}`,
    remark: '' });


  // Function to fetch current status based on type
  const fetchStatus = async () => {
    try {
      const apiUrl = type === 0 ? `/api/enquiry/${id}` : `/api/scrapEnquiry/${id}`;
      const response = await getAPICall(apiUrl);
      if (response && response.Enquiry) {
        setEnquiry(response.Enquiry); // Assuming the API returns the status
        setNewStatus(response.Enquiry.status)
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to fetch current status');
      }
    } catch (error) {
      setErrorMessage('Error fetching current status');
    }
  };

  // Function to fetch table data
  const fetchData = async () => {
    try {
      const ids=type === 0 ?`${id}`:`s-${id}`; 
      //const apiUrl = type === 0 ?``:`/api/getStatusBy/${ids}`;
      const response = await getAPICall(`/api/getStatusBy/${ids}`);

      if (response && Array.isArray(response)) {
        setData(response);
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to fetch records');
      }
    } catch (error) {
      setErrorMessage('Error fetching data');
    }
  };

  // Fetch data and current status on component mount
  useEffect(() => {
    if (id && type !== undefined) {
      fetchStatus();
    }
    fetchData();
  }, [id, type]);

  const handleNewEntryChange = (field, value) => {
    setNewEntry(prevState => ({ ...prevState, [field]: value }));
  };

  const handleStatusChange = async () => {
   
    try {
      const api =type===0?"/api/multiEnquiryStausUpdate/":"/api/scrapStausUpdate/";
      await put(`${api}${id}`, { status: newStatus }); // API to update status
      setSubmitStatus('Status updated successfully');
      setCurrentStatus(newStatus); // Update the local state with new status
    } catch (error) {
      console.error('Error updating status:', error);
      setSubmitStatus('Failed to update status');
    }
  };

  const handleSubmit = async () => {
    try {
      if (newEntry.remark&& newEntry.Enquiry_id) {
        await post('/api/newRemark', newEntry); // API to create new contact
        setSubmitStatus('Submitted successfully');
        setNewEntry({ 
          Enquiry_id: `${id}` ,
          remark: '' }); // Reset new entry
        fetchData(); // Refetch updated data
        setModalVisible(false); // Close modal after submit
      } else {
        setSubmitStatus('Please fill out all required fields');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setSubmitStatus('Submission failed');
    }
  };

  const isFormValid = () => {
    return newEntry.remark;
  };

  // Define columns for MantineReactTable
  const columns = [
    { accessorKey: 'id', header: 'Id' },
    { accessorKey: 'remark', header: 'Remark', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
    { accessorKey: 'updated_by', header: 'Updated By ', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
    { accessorKey: 'created_at', header: 'Date', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
  ];

  const table = useMantineReactTable({
    columns,
    data,
    enableFullScreenToggle: false, // Disable full-screen mode
  });

  return (
    <>
     {type === 1 ? (
       <CCard className="mb-4">
  <CCardBody>
    <div>
      <div className="d-flex">
        <div className="col-sm-4 mx-2">
          <CFormInput type="text" aria-label="name" value={`${enquiry.first_name}`+" "+`${enquiry.last_name} `} label="Name" disabled readOnly />
        </div>
        <div className="col-sm-4 mx-2">&nbsp;
          <CFormInput type="text" aria-label="email" value={enquiry.email} label="Email Address" disabled readOnly />
        </div>
        <div className="col-sm-3 mx-2">
          <CFormInput type="text" aria-label="mobile" value={enquiry.mobile} label="Mobile Number" disabled readOnly />
        </div>
      </div>

      <div className="d-flex">
        <div className="col-sm-4 mx-2">
          <CFormInput type="text" aria-label="location" value={enquiry.location} label="Location" disabled readOnly />
        </div>
        <div className="col-sm-4 mx-2">
          <CFormInput type="text" aria-label="registration_number" value={enquiry.vehicle_registration_number} label="Registration Number" disabled readOnly />
        </div>
        <div className="col-sm-3 mx-2">
          <CFormInput type="text" aria-label="manufacturer" value={enquiry.vehicle_manufacturer} label="Manufacturer" disabled readOnly />
        </div>
      </div>

      <div className="d-flex">
        <div className="col-sm-4 mx-2">
          <CFormInput type="text" aria-label="date" value={enquiry.created_at}  label="Date" disabled readOnly />
        </div>
        <div className="col-sm-4 mx-2">
          <CFormInput type="text" aria-label="updated_by" value={enquiry.updated_by} label="Updated By" disabled readOnly />
        </div>
        <div className="col-sm-3 mx-2">
          <CFormInput type="text" aria-label="category" value={enquiry.vehicle_category} label="Vehicle Category" disabled readOnly />
        </div>
      </div>

      <div className="d-flex">
        <div className="col-sm-4 mx-2">
          <CFormTextarea label="Description" value={enquiry.vehicle_description} rows={1} placeholder="Vehicle Description" disabled readOnly />
        </div>
        <div className="col-sm-4 mx-2">
          <CFormTextarea label="Scrap Purpose" value={enquiry.scrap_purpose} rows={1} placeholder="Vehicle Description" disabled readOnly />
        </div>
  </div>
  <div className="d-flex">
   <div className="d-flex mx-3 mt-2">
    
    <div className="col-sm-8">
        <Select
        label="Current Status"
        value={newStatus} 

         onChange={(value) => setNewStatus(value)} 

         placeholder="Select a status"
         data={[
          { value: '0', label: 'Enquiry' },
          { value: '1', label: 'Pending' },
          { value: '2', label: 'Completed' },
          { value: '3', label: 'Not Interested' },
            ]}
          required
              />
          </div>
          </div>
          <div className="px-3 pt-4">
            <Button color="primary" onClick={() => handleStatusChange()}>
              Update
            </Button>
          </div>
        </div>
      
    </div>
  </CCardBody>
   </CCard>
) : (
  <CCard className="mb-4">
    <CCardBody>
      <div>
        <div className="d-flex">
          <div className="col-sm-4 mx-2">
            <CFormInput type="text" value={enquiry.name} aria-label="name" label="Name" disabled readOnly />
          </div>
          <div className="col-sm-4 mx-2">
            <CFormInput type="text" value={enquiry.contact_number} label="Mobile Number" aria-label="mobile" disabled readOnly />
          </div>
          <div className="col-sm-3 mx-2">
            <CFormInput type="text" value={enquiry.email} aria-label="email" label="Email Address" disabled readOnly />
          </div>
        </div>

        <div className="d-flex">
          <div className="col-sm-4 mx-2">
            <CFormTextarea label="Message" rows={1} value={enquiry.message} placeholder="Message" disabled readOnly />
          </div>
          <div className="col-sm-4 mx-2">
            <CFormInput
              type="text"
              value={
                enquiry.type === 0
                  ? "Contact Us"
                  : enquiry.type === 1
                  ? "Buy Enquiry"
                  : enquiry.type === 2
                  ? "Sell Enquiry"
                  : ""
              }
              aria-label="form_type"
              label="Form Type"
              disabled readOnly
            />
          </div>
          <div className="col-sm-3 mx-2">
            <CFormInput type="text" value={enquiry.created_at} aria-label="date" label="Date" disabled readOnly />
          </div>
        </div>

        <div className="d-flex mx-4 mt-2">
          <div className="col-sm-8">
          <Select
  label="Current Status"
  value={newStatus} 

  onChange={(value) => setNewStatus(value)} 

  placeholder="Select a status"
  data={[
    { value: '0', label: 'Enquiry' },
    { value: '1', label: 'Pending' },
    { value: '2', label: 'Completed' },
    { value: '3', label: 'Not Interested' },
  ]}
  required
/>

          </div>
          <div className="px-3 pt-4">
            <Button color="primary" onClick={() => handleStatusChange()}>
              Update
            </Button>
          </div>
        </div>
      </div>
    </CCardBody>
  </CCard>
)}

    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container>
      <Stack spacing="lg">
          <Text size="xl" weight={500}>Remark History</Text>
          {errorMessage && <Text color="red">{errorMessage}</Text>}
      <div className='d-flex'>
  <div className='col-sm-10'>
    <CFormTextarea
      // label="Add New Remark"
      rows={1} 
      value={newEntry.remark}
      onChange={(e) => handleNewEntryChange('remark', e.target.value)}
      placeholder="Enter New Remark"
      required
    />
  </div>
  <div className='mx-4 '>
    <Button color="primary" onClick={handleSubmit}>
      Add Remark
    </Button>
  </div>
</div>
        

          {/* MantineReactTable component */}
          <MantineReactTable table={table} />

          {/* Update Button (bottom-left of the table) */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
            <Button color="primary" onClick={() => setModalVisible(true)}>Update</Button>
          </div>

          {/* Modal for form input */}
          <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <CModalHeader>
              <CModalTitle>Update Enquiry</CModalTitle>
            </CModalHeader>
            <CModalBody>
              {/* Form inputs */}
              <TextInput
                label="remark"
                value={newEntry.remark}
                onChange={(e) => handleNewEntryChange('remark', e.target.value)}
                placeholder="Enter Remark"
                required
              />
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
              <CButton color="primary" onClick={handleSubmit} disabled={!isFormValid()}>Update Changes</CButton>
            </CModalFooter>
          </CModal>

          {submitStatus && <Text>{submitStatus}</Text>}
        </Stack>
      </Container>
    </MantineProvider>
    </>
  );
}

export default EnquiryStatus;
