import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import Nav from '../../../reusable/Nav'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CDataTable,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody
} from '@coreui/react'
const fields = ['title','category', 'action']

const AllPosts = () => {
    const [currentTab, setCurrentTab] = useState(0)
    const [firstLoad, setFirstLoad] = useState(true)
    const [data, setData] = useState([])
    const [articlePublish, setArticlePublish] = useState([])
    const [articleDraft, setArticleDraft] = useState([])
    const [articleThrash, setArticleThrash] = useState([])
    const [currentData, setCurrentData] = useState([])
    const [visible, setVisible] = useState(false)
    const [id, setId] = useState(0)

    function handleCallback(params) {
        setCurrentTab(params)
    }

    useEffect(() => {
        if (firstLoad) {
            getArticles()
            mapData()
        }
        mapCurrentData()
    })

    function getArticles() {
        axios.get(`http://localhost:1323/article/all/`).then((response) => {
            console.log(response)

            setData(response.data)
            setFirstLoad(false)
        })
    }

    function handleDelete(id) {
        axios.delete(`http://localhost:1323/article/${id}`)
  
        setFirstLoad(true)
        setVisible(!visible)
        window.location.reload()
    }

    function mapData() {
        data.map((data) => {
            if (data.status === 'Publish') articlePublish.push(data)
            else if (data.status === 'Draft') articleDraft.push(data)
            else if (data.status === 'Thrash') articleThrash.push(data)
        })
    }

    function mapCurrentData() {
        if (currentTab === 1) setCurrentData(articlePublish)
        else if (currentTab === 2) setCurrentData(articleDraft)
        else if (currentTab === 3) setCurrentData(articleThrash)
    }

    function DeleteArticle(id) {
        setVisible(true)
        setId(id)
    }

    function handleEdit(data) {
        localStorage.setItem('id', data.id)
        localStorage.setItem('title', data.title)
        localStorage.setItem('category', data.category)
        localStorage.setItem('content', data.content)
        localStorage.setItem('status', data.status)
    }

    return (
        <>
        <CCard>
            <Nav
                parentCallback = {handleCallback}
                publishedAmount = {articlePublish.length}
                draftsAmount = {articleDraft.length}
                thrashAmount = {articleThrash.length}
            />
            <CCardBody>
                <CDataTable
                    items={currentData}
                    fields={fields}
                    itemsPerPageSelect
                    itemsPerPage={5}
                    tableFilter
                    hover
                    sorter
                    pagination
                    scopedSlots = {{
                        'action':
                        (item, index)=>{
                            return (
                            <td className="py-2">
                                <Link to={{pathname: "/posts/edit", data: item}} onClick={() => handleEdit(item)}>
                                    <CButton size="sm" color="info">Edit
                                    </CButton>
                                </Link>
                                <CButton onClick={() => DeleteArticle(item.id)} size="sm" color="danger" className="ml-1">
                                    Delete
                                </CButton>
                            </td>
                            )
                        },
                    }}
                />
            </CCardBody>
        </CCard>
        <CModal 
            show={visible} 
            onClose={() => setVisible(!visible)}
            color="danger"
        >
            <CModalHeader closeButton>
            <CModalTitle>Modal title</CModalTitle>
            </CModalHeader>
            <CModalBody>
            Lorem
            </CModalBody>
            <CModalFooter>
                <CButton color="danger" onClick={() => handleDelete(id)}>Do Something</CButton>{' '}
                <CButton color="secondary" onClick={() => setVisible(!visible)}>Cancel</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
}

export default AllPosts
