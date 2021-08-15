import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CPagination,
  CRow,
} from  '@coreui/react'
import { DocsLink } from 'src/reusable'


const Preview = () => {
    const [firstLoad, setFirstLoad] = useState(true)
    const [data, setData] = useState([])
    const [articlePublish, setArticlePublish] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (firstLoad) {
            getArticles()
            mapData()
        }
    })

    function mapData() {
        data.map((data) => {
            if (data.status === 'Publish') articlePublish.push(data)
        })
    }

    function getArticles() {
        axios.get(`http://localhost:1323/article/all/`).then((response) => {
            console.log(response)

            setData(response.data)
            setFirstLoad(false)
        })
    }

    if (firstLoad) {
        return <> Loading.. </>
    }
    
return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <strong>{articlePublish[currentPage - 1].title}</strong>
            </CCardHeader>
            <CCardBody>
              <p>{articlePublish[currentPage - 1].content}</p>
            </CCardBody>
            <CCardFooter>
                Category: {articlePublish[currentPage - 1].category}
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
        <CPagination
        align="center"
        addListClass="some-class"
        activePage={currentPage}
        pages={articlePublish.length}
        onActivePageChange={setCurrentPage}
        />
    </>
  )
}

export default Preview
