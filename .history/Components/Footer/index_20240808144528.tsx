import React from 'react'

const Footer = () => {
  return (
    <div className="w-full  h-12 flex justify-center items-center bg-black text-white absolute bottom-0">
      <div>
        © 2024 Sufficient Premium Club. All rights reserved.
      </div>
      <div className='absolute h-10 w-12 bottom-7 right-14 hover:scale-110 cursor-pointer mobile:hidden'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/598px-WhatsApp_icon.png'></img>
      </div>
    </div>
  )
}
export default Footer