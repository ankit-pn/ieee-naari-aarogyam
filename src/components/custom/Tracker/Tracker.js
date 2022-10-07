import { Title } from '@mantine/core'
import React from 'react'
import Tables from './Tables'

    
function Tracker() {
  
  if(!localStorage.getItem('ID') || localStorage.getItem('ID')[1] != 'U'){
    window.location.replace('/hdocs')
  }

  return (
  <>
    <Title m='md'order={2} weight={500} color='violet'>YOUR RECORDS : </Title>
    <Tables/> 
    </>
  )
}

export default Tracker