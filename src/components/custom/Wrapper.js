import { Box } from '@mantine/core'
import React from 'react'

import bg2 from '../../images/bg2.jpg'

function Wrapper({children}) {
  return (
    <Box sx={{backgroundImage: `url(${bg2})`,
    backgroundSize : 'cover', height : '100vh' }}>{children}</Box>
  )
}

export default Wrapper