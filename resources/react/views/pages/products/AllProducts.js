import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { deleteAPICall, getAPICall, post } from '../../../util/api'
import ConfirmationModal from '../../common/ConfirmationModal'
import { useNavigate } from 'react-router-dom'

const AllProducts = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [deleteProduct, setDeleteProduct] = useState()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const fetchProducts = async () => {
    const response = await getAPICall('/api/product')
    setProducts(response)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = (p) => {
    setDeleteProduct(p)
    setDeleteModalVisible(true)
  }

  const onDelete = async () => {
    await deleteAPICall('/api/product/' + deleteProduct.id)
    setDeleteModalVisible(false)
    fetchProducts()
  }

  const handleEdit = (p) => {
    navigate('/products/edit/' + p.id)
  }

  return (
    <CRow>
      <ConfirmationModal
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onYes={onDelete}
        resource={'Delete product - ' + deleteProduct?.name}
      />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>All Products</strong>
          </CCardHeader>
          <CCardBody>
          <div className='table-responsive'>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Local Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Base Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Selling Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {products.map((p, index) => {
                  return (
                    <CTableRow key={p.slug + p.id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{p.name}</CTableDataCell>
                      <CTableDataCell>{p.localName}</CTableDataCell>
                      <CTableDataCell>{p.sizes?.[0]?.bPrice || ''}</CTableDataCell>
                      <CTableDataCell>{p.sizes?.[0]?.oPrice || ''}</CTableDataCell>
                      <CTableDataCell>{p.sizes?.[0]?.qty || ''}</CTableDataCell>
                      <CTableDataCell>
                        {p.show == 1 ? (
                          <CBadge color="success">Visible</CBadge>
                        ) : (
                          <CBadge color="danger">Hidden</CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge role="button"
                          color="info"
                          onClick={() => {
                            handleEdit(p)
                          }}
                        >
                          Edit
                        </CBadge>{' '}
                        &nbsp;
                        <CBadge role="button"
                          color="danger"
                          onClick={() => {
                            handleDelete(p)
                          }}
                        >
                          Delete
                        </CBadge>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllProducts
