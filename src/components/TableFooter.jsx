import React, { useEffect, useState } from "react";

export default function TableFooter({ range, setPage, page, slice }) {
  useEffect(() => {
    if (slice.length <= 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  const [active, setActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  function handlefirstpage() {
    setPage(1);
    setCurrentPage(1);
  }

  function handlelastpage() {
    setPage(range.length-1);
    setCurrentPage(range.length);
  }

  function handleprevpage() {
    const newPage = currentPage > 1 ? currentPage - 1 : 1;
    setCurrentPage(newPage);
    setPage(newPage);
  }
  

  function handlenextPage() {
    const newPage = currentPage >= range.length ? range.length : currentPage + 1;
    setCurrentPage(newPage);
    setPage(newPage);   
  }
  

  return (
    <div className=" rounded-lg flex justify-around my-5 ">
      <button
        className="duration-300  bg-theme-primary rounded-md text-white hover:scale-110 px-2  py-1"
        onClick={handlefirstpage}
      >
        1
      </button>
      <button
        className="duration-300  bg-theme-primary rounded-md text-white hover:scale-110 px-2  py-1"
        onClick={handleprevpage}
      >
        &lt; &lt;
      </button>

      <div>
        {currentPage} of {range.length}
      </div>

      <button
        className="duration-300   bg-theme-primary rounded-md text-white hover:scale-110 px-2  py-1"
        onClick={handlenextPage}
      >
        &gt; &gt;
      </button>

      <button
        className="duration-300   bg-theme-primary rounded-md text-white hover:scale-110 px-2  py-1"
        onClick={handlelastpage}
      >
        {range.length}
      </button>
      
    </div>
  );
}
