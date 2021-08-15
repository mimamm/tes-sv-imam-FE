import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [

  {
    _tag: 'CSidebarNavTitle',
    _children: ['Dashboard']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Posts',
    route: '/base',
    icon: 'cil-pencil',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Posts',
        to: '/posts/all-posts',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New',
        to: '/posts/add-new',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Preview',
        to: '/posts/preview',
      },
    ],
  },
]

export default _nav
