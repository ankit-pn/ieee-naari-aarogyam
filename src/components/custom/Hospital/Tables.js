import React from 'react'
import {Table , Text} from '@mantine/core'
function Tables({data}) {
  console.log(data)
  return (
    
    <div>
        <Table m={'lg'} 
                highlightOnHover withBorder horizontalSpacing="sm" verticalSpacing="md" fontSize='md'>
                  <thead>
                    <tr>
                      <th><Text weight={700} color={'#c9298b'}>Sr no.</Text></th>
                      <th><Text weight={700} color={'#c9298b'}>File Name</Text></th>
                      <th><Text weight={700} color={'#c9298b'}>Download Now</Text></th>
                    </tr>
                  </thead>
                  <tbody>{data}</tbody>
          </Table>
    </div>
  )
}

export default Tables