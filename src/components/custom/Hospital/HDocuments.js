import { Button, Center, Grid, Input, Modal, Stack, Text , Box , Notification, Affix} from '@mantine/core'
import React, { useRef, useState } from 'react'

import { saveAs } from 'file-saver'

import { Dropzone } from '@mantine/dropzone';

import axios from 'axios';

import { Web3Storage } from 'web3.storage';
import Tables from './Tables';
import Navbar2 from '../../Navbar2';
const WEB3_TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGJjNWY5MEQzZEI3M0U3MDlhYzRBMDFFMmYxNzYwRDY2YzgxQzQzNzQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjQyMDYzNzg4MzUsIm5hbWUiOiJhcGktdGVzdCJ9.aHb6qZS3mbPhFYjzsjFpEr6kBhvoeusWN4hjuyOx9mw'
const client = new Web3Storage({ token: WEB3_TOKEN });


function HDocuments() {


  async function POSTdocs(file,uid){
    
    const fname = file[0].name
    NotiSet(`Uploading ${fname} to BlockChain` , 'orange', 1000000)

    console.log('CALL MED' , file[0].name)
    const rootCid = await client.put(file, {
      name: fname,
      maxRetries: 3,
    });
  
    console.log(rootCid)
    
    const resp = await axios.post('http://blockchain-ieee.herokuapp.com/postCID',{
      userId : `U-${uid}`,
      cid : rootCid,
      fileName : fname
    })

    const text = `Successfully Uploaded for ${fname} with Transaction Hash : ${resp.data.info.transactionHash} , and total gas used was ${resp.data.info.gasUsed}`
    NotiSet(text,'green',5000)
  
    
  }

  function NotiSet(text,color,timeout = 5000){
    setNotiText([text,color])
    console.log(notiText)
    setTimeout(() => {
      setNotiText([])
    }, timeout);
  }

async function printTickets(uid) {
  console.log('GET CALLED' , uid)
  const res = await axios.get(`https://blockchain-ieee.herokuapp.com/getCID?userId=U-${uid}`)
  const files =  await res.data.files
  console.log(files)



  const data = files?.map((element,index) => (
    <tr key={element.cid}>
      <td><Text weight={600}>{index+1}</Text></td>
      <td><Text weight={600}>{element.fileName}</Text></td>
      <td><Button onClick={()=>{
          getFiles(element.cid , element.fileName)
      }}><Text weight={600}>Download</Text></Button></td>
    </tr>
  ));

  setViewData(data)

}

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
  // console.log(blob)
  saveAs(blob, named)
}


const [opened ,setOpened] = useState(false)
const [value, setValue] = useState(null);
const [notiText , setNotiText] = useState([])
const [viewData , setViewData] = useState(null)

const UIDref = useRef()
const GETref = useRef()

if(value){
  setValue(1)
}
  const id = localStorage.getItem('ID')
  
  if(!id){
    window.location.replace('/login')
  }
  else if(id[1] != 'H'){
    window.location.replace('/udocs')
  }
  return (
    <Box >
      <Navbar2/>  
      <Stack> 
      <Grid m='lg' justify="center" align="center">
          <Grid.Col span={5 } >  
            <Input placeholder='UserID' size='md' mx='md' ref={GETref}/>
          </Grid.Col>
          <Grid.Col span={4}>
            <Button m='lg' size='sm' onClick={()=>{printTickets(GETref.current.value)}}>View Docs</Button>
          </Grid.Col>
        </Grid> 
        <Center> 
        <Button size='md' onClick={()=>{setOpened(1)}} sx={{
          maxWidth : '30%'
        }} >Upload New Docs</Button>
        </Center>
      </Stack>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Upload Documents"
        size='50%'
      >
      <Grid align='flex-start' justify='center'>
        <Grid.Col span={4}>
          <Input placeholder='UserID' size='md' ref={UIDref}/>
        </Grid.Col>
        <Grid.Col span={7}>
          <Dropzone onDrop={(files) => {
            if(!UIDref.current.value || UIDref.current.value === 'xyz'){

              NotiSet('Please Enter Valid USERID' , 'red')
              return
            } 
            POSTdocs(files,UIDref.current.value)}}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 8}
      ><Text color={'blue'} weight={600}> DROP FILES HERE TO UPLOAD AUTOMATICALLY</Text></Dropzone>
        </Grid.Col>
      </Grid>        
    </Modal>
    <Affix position={{top : 50 , right : 50}}>{notiText.length > 0 && <Notification color={notiText[1]} ><Text color={notiText[1]} weight={600}>{notiText[0]}</Text></Notification>} </Affix>
    {viewData && <Tables mt='lg' data={viewData}/>}
    </Box>
  )
}

export default HDocuments