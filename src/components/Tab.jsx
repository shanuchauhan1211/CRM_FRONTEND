import React from 'react'

export default function Tab() {
  return (
    <>
      <div className='bar border border-black w-[34vw] h-[855px] rounded-[8px] '>
        <div className='flex justify-between p-[20px]'>
            <div className='text-[20px] text-theme-primary font-semibold'>Counsellors</div>
            <div>
                <select className='bg-[#025498] text-[white]  rounded-[8px] w-[120px] px-[4px] py-[4px] text-center  ' >
                    <option value="1" >Monthly</option>
                    <option value="1">jan</option>
                    <option value="1">fab</option>
                    <option value="1">mar</option>
                    <option value="1">april</option>

                </select>
            </div>
        </div>


      </div>
    </>
  )
}









