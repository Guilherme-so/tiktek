import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from "../utils/tiktok.jpg"

import { GoogleLogin, googleLogout } from "@react-oauth/google"
import { useRouter } from "next/router"
import { AiOutlineLogout } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"
import { IoMdAdd } from "react-icons/io"
import { createOrGetUser } from '../utils'
import userAuthStore from '../store/authStore'

function Navbar() {
  const { userProfile, addUser, removeUser } = userAuthStore()

  return (
    <div
      className='flex justify-between items-center border-b-2 
    border-gray-300 py-2 px-4'>
      <Link href="/">
        <div className='flex items-center justify-center'>
          <Image className='cursor-pointer'
            src={Logo} alt="tiktek" width={50} height={50}
          />
        </div>
      </Link>

      <div>Search</div>

      <div>
        {userProfile ? (
          <div className='flex gap-5 md:gap-10'>
            <Link href="/upload">
              <button className='flex items-center gap-2 border-2 px-2 md:px-4 text-md font-semibold'>
                <IoMdAdd className='text-xl' />
                <span className='hidden md:block'>upload</span>
              </button>
            </Link>
            {userProfile?.image && (
              <Link href="/">
                <>
                  <Image
                    className='rounded-full cursor-pointer'
                    src={userProfile?.image}
                    alt="user profile"
                    width={42}
                    height={42}
                  />
                </>
              </Link>
            )}

            <button
              onClick={() => {
                googleLogout()
                removeUser()
              }}
              type='button'
              className='px-2'>
              <AiOutlineLogout color='red' fontSize={21} />
            </button>

          </div>
        ) :
          (<GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("error")}
          />
          )
        }
      </div>

    </div>
  )
}

export default Navbar