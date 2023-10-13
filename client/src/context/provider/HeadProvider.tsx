import React from 'react'
import AuthContextProvider from './AuthContextProvider'

const HeadProvider = ({ children }: React.HTMLProps<HTMLDivElement>) => {
    return (
        <AuthContextProvider>{children}</AuthContextProvider>
    )
}

export default HeadProvider