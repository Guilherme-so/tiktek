import React, { useState } from 'react'
import { NextPage } from "next"
import { useRouter } from "next/router"
import Link from 'next/link'
import GoogleLogin from 'react-google-login'
import { AiFillHome, AiOutlineMenu } from "react-icons/ai"
import { ImCancelCircle } from "react-icons/im"
import Discover from './discover'
import Footer from './footer'
import SuggestedAccounts from './suggestedAccounts'


function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const normalLink = "flex items-center justify-center gap-3 p-3 cursor-pointer hover:bg-primary rounded text-[#F51997] font-semibold xl:justify-start "

  const userProfile = false

  return (
    <div>

      {/*  //! this is the open and close sidebar */}
      <div
        className='block m-2 ml-4 mt-4  xl:hidden'
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        {
          isSidebarOpen ? <ImCancelCircle />
            : <AiOutlineMenu />
        }
      </div>

      {/* //! this is the sidebar content */}
      {isSidebarOpen && (

        <div
          className='w-20 p-3 flex flex-col justify-start xl:w-400 mb-10 
            border-r-2 border-gray-200 xl:border-0'
        >

          <div className='xl:border-b-2 xl:pb-4 border-gray-100'>
            <Link href="/">
              <div className={normalLink}>
                <p className='text-2xl'>
                  <AiFillHome />
                </p>
                <span className='text-xl hidden xl:block'>
                  For You
                </span>
              </div>
            </Link>
          </div> {/* //? Home Button */}

          {!userProfile && (
            <div className=' px-2 py-4 hidden xl:block'>
              <p className="text-gray-400">
                Log in to like and comment on videos
              </p>
              <div className='pr-4'>
                <GoogleLogin
                  render={(renderProps) => (
                    <button
                      className="px-6 py-2 mt-2 text-lg cursor-pointer font-semibold border-[1px] border-[#F51997] rounded-md text-[#F51997] w-full  lg:hover:bg-[#F51997] lg:hover:lg:text-[#fff] outline-none"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Login
                    </button>
                  )}
                  clientId=''
                  onSuccess={() => { }}
                  onFailure={() => { }}
                  cookiePolicy="single_host_origin"
                />
              </div>
            </div>
          )} {/* //? login Button on lg screen */}

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}

    </div>
  )
}

export default Sidebar
