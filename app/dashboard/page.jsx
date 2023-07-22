'use client'

import Hero from '@/components/dashboard/Hero'
import { AuthContext } from '@/src/context/auth-context';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();


React.useEffect(() => {
  // checks if the user is authenticated
  session
  ? router.push("/dashboard")
  : router.push("/");
}, [session]);

  return (
    <div className="flex flex-col  ">
    {/* <div className="gradient"></div> */}

    <Hero />
  </div>
  )
}

export default Dashboard