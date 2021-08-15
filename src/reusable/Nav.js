import React, {useState, useEffect} from 'react'
import {
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink
} from '@coreui/react'

const Nav = ({parentCallback, publishedAmount, draftsAmount, thrashAmount}) => {
    function onTrigger(params) {
        setActiveTab(params)
    }

    useEffect(() => {
        parentCallback(activeTab);
    })

    const [activeTab, setActiveTab] = useState(1)

  return (
    <>
        <CCardHeader>
            <strong>All Posts</strong>
        </CCardHeader>
        <CCardBody>
            <CNav variant="tabs">
            <CNavLink onClick={() => onTrigger(1)} active={activeTab === 1}>Published ({publishedAmount})</CNavLink>
            <CNavLink onClick={() => onTrigger(2)} active={activeTab === 2}>Drafts ({draftsAmount})</CNavLink>
            <CNavLink onClick={() => onTrigger(3)} active={activeTab === 3}>Thrashed ({thrashAmount})</CNavLink>
            </CNav>
        </CCardBody>
    </>
  )
}

export default Nav
