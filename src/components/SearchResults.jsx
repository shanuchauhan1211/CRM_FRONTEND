import React from 'react';

export default function SearchResults({results}){
    return(
        <>
        <div className='bg-loginGradient1 w-[540px] fixed left-[17.5%] rounded-md flex flex-col shadow-md max-h-[200px]  overflow-y-scroll gap-1'>
            {
                results.map((result , id)=>{
                    return (<div key={id} className='hover:bg-theme-primary hover:text-[#ffff] px-2 w-full'  >{result.name}</div>
                   
                );
                })
            } 
          

            </div>
            </>
    );
}