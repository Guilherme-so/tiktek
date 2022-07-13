import React from 'react'
import Link from "next/link"
import { useRouter } from "next/router"
import { topics } from '../utils/constants'

function Discover() {
   const router = useRouter()
   const { topic } = router.query


   const activeTopicStyle = "xl:border-2 xl:border-[#F51997] hover:bg-primary px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]"

   const topicStyle = "xl:border-2 xl:border-gray-300 hover:bg-primary px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black"

   return (
      <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
         <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
            Popular Topics
         </p>
         <div className="xl:flex gap-3 xl:flex-wrap">
            {topics.map((item) => {
               return (
                  <Link key={item.name} href={`/?topic=${item.name}`}>
                     <div className={topic === item.name ? activeTopicStyle : topicStyle}>
                        <span className="font-bold text-xl xl:text-md">
                           {item.icon}
                        </span>
                        <span className="font-medium text-medium capitalize hidden xl:block">
                           {item.name}
                        </span>
                     </div>
                  </Link>
               )
            })
            }
         </div>
      </div >
   )
}

export default Discover