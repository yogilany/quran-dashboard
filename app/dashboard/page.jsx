'use client'

import Hero from '@/components/dashboard/Hero'
import { AuthContext } from '@/src/context/auth-context';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useContext, useState, useEffect } from 'react'

const Dashboard = () => {
  const { data: session } = useSession();
  const [plan, setPlan] = useState(null)
  const router = useRouter();


React.useEffect(() => {
  // checks if the user is authenticated
  session
  ? plan ? router.push("/dashboard") : router.push("/plan")
  : router.push("/");
}, [session]);


const fetchPlan = async () => {
  
  var url = "/api/plan";
  var params = {
    userID: session?.user?.id,
  };
  var queryString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
  url = url + '?' + queryString;

const res = await fetch(url);

// const res = await fetch(`/api/plan/${session?.user.id}`);
const data = await res.json();
setPlan(data[0]?.plan);
console.log("DATA",data[0])
}

  
useEffect(() => {
  if(!plan){
    fetchPlan();

  }
 
},[session])


  return (
    <div className="flex flex-col  ">
    {/* <div className="gradient"></div> */}

    <Hero plan={plan} fetchPlan={fetchPlan} />
  </div>
  )
}

export default Dashboard