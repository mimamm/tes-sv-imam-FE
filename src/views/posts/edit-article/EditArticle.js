import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {
    CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CInvalidFeedback
} from '@coreui/react'

const EditArticle = () => {
    const { data } = useLocation();
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [content, setContent] = useState('')
    const [status, setStatus] = useState('')
    const [id, setId] = useState(0)

    const [successAlert, setSuccessAlert] = useState(false)

    const [titleValid, setTitleValid] = useState(true)
    const [contentValid, setContentValid] = useState(true)
    const [categoryValid, setCategoryValid] = useState(true)
    const [buttonValid, setButtonValid] = useState(false)

    useEffect(() => {
            setId(localStorage.getItem('id'))
            setTitle(localStorage.getItem('title'))
            setCategory(localStorage.getItem('category'))
            setContent(localStorage.getItem('content'))
            setStatus(localStorage.getItem('status'))
    },[])

    useEffect(() => {
        if (title.length < 20 && title.length !== 0) setTitleValid(false)
        else setTitleValid(true)
        if (content.length < 200 && content.length !== 0) setContentValid(false)
        else setContentValid(true)
        if (category.length < 3 && category.length !== 0) setCategoryValid(false)
        else setCategoryValid(true)

        if (title.length >= 20 && content.length >= 200 && category.length >= 3) setButtonValid(true)
        else setButtonValid(false)
    })

    function updateArticle(title, category, content, status, id) {
        axios.patch(`http://localhost:1323/article/${id}`, {
            title: title,
            category: category,
            content: content,
            status: status
        }).then((response) => {
            console.log(response)
        })
    }

    function handlePublish() {
        updateArticle(title, category, content, "Publish", id)
        setSuccessAlert(true)
    }
    
    function handleDraft() {
        updateArticle(title, category, content, "Draft", id)
        setSuccessAlert(true)
    }

    return (
        <>
            <CCard>
            {successAlert? <CAlert color="success">Update Article Success!</CAlert> : ''}
                <CCardHeader>
                Edit Article
                </CCardHeader>
                <CCardBody>
                <CForm method="post" encType="multipart/form-data" className="form-horizontal">
                    <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="text-input">Title</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                        <CInput
                            id="text-input"
                            name="text-input"
                            defaultValue={title}
                            onInput={(e) => setTitle(e.target.value)}
                            invalid={!titleValid}
                        />
                        {!titleValid && <CInvalidFeedback>Minimum of 20 Characters</CInvalidFeedback>}
                    </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="text-input">Category</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                        <CInput
                            id="text-input"
                            name="text-input"
                            defaultValue={category}
                            onInput={(e) => setCategory(e.target.value)}
                            invalid={!categoryValid}
                        />
                        {!categoryValid && <CInvalidFeedback>Minimum of 3 Characters</CInvalidFeedback>}
                    </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="textarea-input">Content</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                        <CTextarea 
                        name="textarea-input" 
                        id="textarea-input" 
                        rows="9"
                        defaultValue={content}
                        onInput={(e) => setContent(e.target.value)}
                        invalid={!contentValid}
                        />
                        {!contentValid && <CInvalidFeedback>Minimum of 200 Characters</CInvalidFeedback>}
                    </CCol>
                    </CFormGroup>
                </CForm>
                </CCardBody>
                <CCardFooter>
                <CButton onClick={() => handlePublish()} disabled={!buttonValid} type="submit" size="md" color="success">Publish</CButton>
                <CButton onClick={() => handleDraft()} disabled={!buttonValid} type="submit" size="md" color="warning" style={{marginLeft:'20px'}}>Draft</CButton>
                </CCardFooter>
            </CCard>
        </>
    )
}

export default EditArticle
