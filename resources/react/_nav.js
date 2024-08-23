import React, { useEffect } from 'react'
import CIcon from '@coreui/icons-react'
// import { BsBack } from "react-icons/bs";
import {
  // cilBell,
  // cilCalculator,
  // cilChartPie,
  cilCursor,
  // cilDescription,
  cilNotes,
  cilChart,
  cilPuzzle,
  // cilSpeedometer,
  cilNoteAdd,
  cilGroup,
  // cilStar,
  cibElasticStack

} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { getUserType } from './util/session';




export default function fetchNavItems(){
  const user = getUserType();

  let _nav =[];

  if(user===0){

  _nav = [

    // {
    //   component: CNavItem,
    //   name: 'Invoice Customize',
    //   to: '/invoiceCustomization',
    //   icon: <CIcon icon={cibElasticStack} customClassName="nav-icon" />,
    // },
    {
      component: CNavItem,
      name: 'Show Enquiry',
      to: '/inquiry',
      icon: <CIcon icon={cibElasticStack} customClassName="nav-icon" />,
    },

    // {
    //   component: CNavItem,
    //   name: 'Enquiry',
    //   to: '/contactUs',
    //   icon: <CIcon icon={cibElasticStack} customClassName="nav-icon" />,
    // },

    {
      component: CNavItem,
      name: 'Show Contact Us ',
      to: '/showContactUs',
      icon: <CIcon icon={cibElasticStack} customClassName="nav-icon" />,
    },


  //     {
  //       component: CNavItem,
  //       name: 'Dashboard',
  //       to: '/dashboard',
  //       icon: <CIcon icon={cibElasticStack} customClassName="nav-icon" />,
  //     },
    
  //     {
  //       component: CNavItem,
  //       name: 'Invoice',
  //       to: '/invoice',
  //       icon: <CIcon icon={cilNoteAdd} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavGroup,
  //       name: 'Products',
  //       icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //       items: [
  //         {
  //           component: CNavItem,
  //           name: 'New Product',
  //           to: '/products/new',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'All Products',
  //           to: '/products/all',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Bulk Quantity ',
  //           to: 'products/updateqty',
  //         },
    
          
  //       ],
  //     },
  //     {
  //       component: CNavGroup,
  //       name: 'Category',
  //       to: '/base',
  //       icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //       items: [
  //         {
  //           component: CNavItem,
  //           name: 'New Category',
  //           to: '/category/new',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'All Category',
  //           to: '/category/all',
  //         },
  //       ],
  //     },
  //     {
  //       component: CNavGroup,
  //       name: 'Orders',
  //       to: '/order',
  //       icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //       items: [
  //         {
  //           component: CNavItem,
  //           name: 'Advance Booking',
  //           to: '/bookings',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Regular Orders',
  //           to: '/regular',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'All Orders',
  //           to: '/order',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Credit',
  //           to: '/credit',
  //         },
  //       ],
  //     },
  //     {
  //       component: CNavGroup,
  //       name: 'Expense',
  //       icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //       items: [
  //         {
  //           component: CNavItem,
  //           name: 'New Expense',
  //           to: '/expense/new',
  //         },
          
  //         {
  //           component: CNavItem,
  //           name: 'New Expense Type',
  //           to: '/expense/new-type',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'All Expense Types',
  //           to: '/expense/all-type',
  //         },
  //       ],
  //     },
    
    
  //     {
  //       component: CNavGroup,
  //       name: 'Report',
  //       icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  //       items: [
  //         {
  //           component: CNavItem,
  //           name: 'Expense Report',
  //           to: 'Reports/Expense_Report',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Sales Report',
  //           to: 'Reports/Sales_Report',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Profit and Loss Report',
  //           to: 'Reports/pnl_Report',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Report',
  //           to: 'Reports/Reports',
  //         },
  //       ],
  //     },
      
    
  //     {
  //       component: CNavGroup,
  //       name: 'User Management',
  //       icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  //       items: [
  //         {
  //           component: CNavItem,
  //           name: 'All Users',
  //           to: 'usermanagement/all-users',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Create User',
  //           to: 'usermanagement/create-user',
  //         },
          
  //       ],
  //     },
    
  //   ]
    
  // }
  // else if(user===1){
  //   _nav = [

  //     {
  //       component: CNavItem,
  //       name: 'Dashboard',
  //       to: '/dashboard',
  //       icon: <CIcon icon={cibElasticStack} customClassName="nav-icon" />,
  //     },
    
  //     {
  //       component: CNavItem,
  //       name: 'Invoice',
  //       to: '/invoice',
  //       icon: <CIcon icon={cilNoteAdd} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavGroup,
  //       name: 'Products',
  //       icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //       items: [
  //         {
  //           component: CNavItem,
  //           name: 'New Product',
  //           to: '/products/new',
  //         },
        
  //         {
  //           component: CNavItem,
  //           name: 'Bulk Quantity ',
  //           to: 'products/updateqty',
  //         },
    
          
  //       ],
  //     },
  //     {
  //       component: CNavGroup,
  //       name: 'Category',
  //       to: '/base',
  //       icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //       items: [
  //         {
  //           component: CNavItem,
  //           name: 'New Category',
  //           to: '/category/new',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'All Category',
  //           to: '/category/all',
  //         },
  //       ],
  //     },
  //     {
  //       component: CNavGroup,
  //       name: 'Orders',
  //       to: '/order',
  //       icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //       items: [
  //         {
  //           component: CNavItem,
  //           name: 'Advance Booking',
  //           to: '/bookings',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Regular Orders',
  //           to: '/regular',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'All Orders',
  //           to: '/order',
  //         },
  //       ],
  //     },
  //     {
  //       component: CNavGroup,
  //       name: 'Expense',
  //       icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //       items: [
  //         {
  //           component: CNavItem,
  //           name: 'New Expense',
  //           to: '/expense/new',
  //         },
          
  //         {
  //           component: CNavItem,
  //           name: 'New Expense Type',
  //           to: '/expense/new-type',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'All Expense Types',
  //           to: '/expense/all-type',
  //         },
  //       ],
  //     },
    
    
    ]
    

  }
return _nav;
}
