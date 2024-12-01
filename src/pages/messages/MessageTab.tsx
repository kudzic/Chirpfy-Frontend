import React from 'react'

function MessageTab() {
  return (
    <div className='w-full'>
    <div className='w-full hover:bg-gray-100 rounded-xl flex flex-col'>
       <div className='flex flex-row'>
        <p className='ml-0 font-mono'>Kudzai Chidzodzo</p>
        <p className='ml-auto'>10:00</p>
       </div>
       <div className='mt-2'>
        <p className='text-gray-500 text-sm'>Hey there how was your day</p>
       </div>
    </div>
    </div>

  )
}

export default MessageTab