import { Table, Text ,Button, Modal , Input, Grid , Notification , Affix  , Center} from '@mantine/core';
import { Calendar } from '@mantine/dates';
import React, { useRef, useState } from 'react'
import axios from 'axios';

function Tables() {
   

  async function fetchData(){
    var uid = localStorage.getItem('ID')
    uid = uid.slice(1,uid.length - 1)
    
    const url = `https://ieee-period-tracker.herokuapp.com/getDates`
    console.log(uid)
    const resp = await axios.post(url, {
      'userId' : uid
    })
        await console.log(resp)
        if(resp.data.message){
          setNoData(resp.data.message)
          return
        }
        setData(resp.data.dates)
  }

  const [data , setData] = useState(()=>{fetchData()})
  const [noData , setNoData] = useState('Please wait while we fetch your data')

  const [text,setText] = useState('')

  const handleAdd = async() => {
    console.log(value)
    if(!value){
      setOpened(0)
      setText('Please select date to add Entry')

      
      setTimeout(() => {
        setText('')
      }, 3000)
      return
    }
    const dt = value.toLocaleDateString()
    var uid = localStorage.getItem('ID')
    uid = uid.slice(1,uid.length - 1)
    await axios.post('https://ieee-period-tracker.herokuapp.com/postDates',{
      userId : uid,
      note : inpRef.current.value,
      date : dt
    }).then(()=>{
      fetchData()
      setOpened(0)
    }).catch((err)=>{
      setOpened(0)
      setText('Date already exists , delete and add again to UPDATE note')
      console.log(err.message)

      setTimeout(() => {
        setText('')
      }, 3000)
      
      
    })
  }

  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState(null);


    const rows = data?.map((element,index) => (
        <tr key={element.date}>
          <td><Text>{index+1}</Text></td>
          <td><Text weight={600}>{element.date}</Text></td>
          <td><Text weight={600}>{element.note}</Text></td>
          <td><Button onClick={async ()=>{
            console.log('del called')
            var uid = localStorage.getItem('ID')
            uid = uid.slice(1,uid.length - 1)

            const resp = await axios.post('https://ieee-period-tracker.herokuapp.com/delDate',{
              'userId' : uid,
              'date' : element.date
            })
            console.log(resp)

            window.location.reload()

          }}>Delete</Button></td>
        </tr>
      ));

      const inpRef = useRef()
  
    return (
      <Grid gutter={'xl'}>
        <Grid.Col span={8} >
          {!data ?  <Text m={'xl'} size='xl' weight={'600'} color='black'>{noData}</Text>:

          <Table ml={'md'}  
                highlightOnHover withBorder withColumnBorders horizontalSpacing="sm" verticalSpacing="md" fontSize='md'>
                  <thead>
                    <tr>
                      <th><Text weight={700} color='#e64980'>Sr no.</Text></th>
                      <th><Text weight={700} color='#e64980'>Date (mm/dd/yyyy)</Text></th>
                      <th><Text weight={700} color='#e64980'>Note</Text></th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
          </Table>}
        </Grid.Col>
          <Grid.Col span={3}>
            <Calendar hideOutsideDates value={value} onChange={setValue} size='md' mx={'xl'} styles={()=>({
              day: { fontWeight: 600 },
              weekday: { fontWeight: 600 , color : '#c9298b'},
              outside : {opacity : 0}
              
            })}/>
            <Center >
              <Button mx='md' color={'pink'} sx={{maxWidth : '100px'}}><Text color={'white'} onClick={() => setOpened(true)}>Add Entry</Text></Button>
            </Center>
          </Grid.Col>
       
              
        {text.length ? <Affix position={{ top: 35, right: 150 }}> <Notification title="Warning" color='red'>{text}</Notification></Affix> : null}
        <Modal opened={opened} onClose={() => setOpened(false)} title="Add an optional Note for this date">
          <Input ref={inpRef} />
          <Button my='sm' onClick={() => handleAdd()}>Add Entry</Button>
        </Modal>
      </Grid>
  )
}

export default Tables