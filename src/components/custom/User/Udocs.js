import { Center, Text ,Button } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import Tables from '../Hospital/Tables'


import { saveAs } from 'file-saver'
import axios from 'axios'
import Navbar2 from '../../Navbar2'

function Udocs() {

  

    const [viewData , setViewData] = useState(null)
  
    async function printTickets(uid) {
        uid = uid.slice(1,uid.length - 1)
        console.log(uid)
        const res = await axios.get(`https://blockchain-ieee.herokuapp.com/getCID?userId=${uid}`)
        const files =  await res.data.files
        await console.log(res)
      
        const data = files?.map((element,index) => (
          <tr key={element.cid}>
            <td><Text weight={600}>{index+1}</Text></td>
            <td><Text weight={600}>{element.fileName}</Text></td>
            <td><Button onClick={()=>{
                getFiles(element.cid , element.fileName)
            }}>Download</Button></td>
          </tr>
        ));
      
        setViewData(data)
      
      }
      useEffect(()=>{
        printTickets(localStorage.getItem('ID'))
      },[])

      async function getFiles(cid,named) {
        console.log('DOWNLOAD STARTED...' , `https://${cid}.ipfs.dweb.link/${named}`)
        const resp =  await axios.get(`https://${cid}.ipfs.dweb.link/${named}`, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'arraybuffer'
        })
      
        console.log(resp)
      
        const { data } = resp
        const blob = new Blob([data], { type: 'application/pdf' })
        saveAs(blob, named)
      }
  
      const id = localStorage.getItem('ID')

      
      if(!id){
        window.location.replace('/login/user')
      }
      else if(id[1] != 'U'){
        window.location.replace('/hdocs')
      }
      
    return (
    <div>
        <Navbar2/>
        {viewData ? <Tables mt='lg' data={viewData}/> : <Center><Text>Fetching data please wait</Text></Center>}
    </div>
  )
}

export default Udocs