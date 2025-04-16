import React from 'react'
import Form from './Form'
import { useLogin } from '../Store/LoginStore'
function AdminDash() {
  const {isLoged} = useLogin();
  return (
    <div className='w-full min-h-full p-8'>
      <Form/>
    </div>
  )
}

export default AdminDash
