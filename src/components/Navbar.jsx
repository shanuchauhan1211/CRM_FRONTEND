import React from "react";

export default function Navbar() {
  const token_object = JSON.parse(localStorage.getItem("authToken"));

  return (
    <>
      <div>
        <nav className="bg-[#F8F8F8] py-4 px-6 fixed top-0 right-4 w-[82vw]  z-10">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-theme-primary flex gap-5 text-[24px] font-semibold">
              <img src="Vector.svg" alt="" />
              CRM Dashboard
            </div>
            <div>
              <p
                className="text-theme-primary xl:ml-[500px] 2xl:ml-[700px] text-md font-bold hover:text-grey"
              >
                {token_object.user.isadmin ? "Admin" : "Counsellor"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-theme-primary hover:text-grey">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M19 17v-5.2c-.5.1-1 .2-1.5.2H17v6H7v-7c0-2.8 2.2-5 5-5c.1-1.3.7-2.4 1.5-3.3c-.3-.4-.9-.7-1.5-.7c-1.1 0-2 .9-2 2v.3C7 5.2 5 7.9 5 11v6l-2 2v1h18v-1zm-9 4c0 1.1.9 2 2 2s2-.9 2-2zM21 6.5c0 1.9-1.6 3.5-3.5 3.5S14 8.4 14 6.5S15.6 3 17.5 3S21 4.6 21 6.5"
                    />
                  </svg>
                </p>
              </div>
              <div>
                <p
                  className="text-theme-primary hover:text-grey text-md font-bold"
                >
                  {token_object.data.user.name}
                </p>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
