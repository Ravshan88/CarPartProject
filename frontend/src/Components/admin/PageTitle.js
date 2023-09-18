import React from 'react'

function PageTitle({ children,margin="my6"}) {
  return (
    <h1 className={margin+" text-2xl font-semibold text-white"}>{children}</h1>
  )
}

export default PageTitle
