import Link from 'next/link'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>layout
        <div>
            {children}
        </div>
        <Link href='/'>back-back</Link>
        
    </div>
  )
}

export default layout