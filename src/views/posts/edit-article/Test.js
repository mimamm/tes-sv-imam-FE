import React, { Component } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CFormText,
    CTextarea,
    CInput,
    CLabel,
  } from '@coreui/react'

export default class Test extends Component {
    render() {
        return (
            <>
            <CCard>
                    <CCardHeader>
                    Edit Article
                    </CCardHeader>
                    <CCardBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="text-input">Title</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CInput id="text-input" name="text-input" defaultValue="Text" />
                            <CFormText>This is a help text</CFormText>
                        </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="text-input">Category</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CInput id="text-input" name="text-input" defaultValue="Text" />
                            <CFormText>This is a help text</CFormText>
                        </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="textarea-input">Textarea</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CTextarea 
                            name="textarea-input" 
                            id="textarea-input" 
                            rows="9"
                            defaultValue="Content..." 
                            />
                        </CCol>
                        </CFormGroup>
                    </CForm>
                    </CCardBody>
                    <CCardFooter>
                    <CButton type="submit" size="md" color="success">Publish</CButton>
                    <CButton type="warning" size="md" color="warning" style={{marginLeft:'20px'}}>Draft</CButton>
                    </CCardFooter>
                </CCard>
            </>
        )
    }
}
