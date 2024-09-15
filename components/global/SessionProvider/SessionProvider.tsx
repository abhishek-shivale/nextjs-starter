"use client"
import { Session } from 'next-auth';
import React from 'react'
import { SessionProvider } from "next-auth/react"


function SessionProviderComponent({
    children,
    session
  }: Readonly<{
    children: React.ReactNode;
    session: Session    
  }>) {
  return (
    <SessionProvider session={session}>
    {children}
  </SessionProvider>
  )
}

export default SessionProviderComponent