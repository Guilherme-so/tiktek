import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from "axios"
import { FaCloudUploadAlt } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

import userAuthStore from '../store/authStore'
import { client } from '../utils/client'
import { SanityAssetDocument } from "@sanity/client"
import { topics } from '../utils/constants'

function Upload() {
  const [isLoading, setIsLoading] = useState(false)
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>()
  const [wrongTypeFile, setWrongTypeFile] = useState(false)
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState(topics[0].name)
  const [savingPost, setSavingPost] = useState(false)
  const { userProfile }: { userProfile: any } = userAuthStore()
  const router = useRouter()

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0]

    const fileTypes = ["video/mp4", "video/webm", "video/ogg"]

    if (fileTypes.includes(selectedFile.type)) {
      client.assets.upload('file', selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name
      }).then((data) => {
        setVideoAsset(data)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
      setWrongTypeFile(true)
    }
  }


  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true)

      const document = {
        _type: "post",
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id
        },
        topic: category
      }
      await axios.post("http://localhost:3000/api/post", document)

      router.push('/')
    }
  }


  return (
    <div className="flex w-full h-full absolute left-0 top-16 mb-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className='bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap w-[60%] justify-between items-center p-14 pt-6'>
        <div>
          <div>
            <p className='text-lg font-bold'>Upload Video</p>
            <p className='text-md text-gray-500 mt-1'>Post a video in your account</p>
          </div>

          {/* //? box video upload */}
          <div className='flex flex-col justify-center items-center mt-10 p-10 cursor-pointer w-[260px] h-[460px] border-4 border-dashed rounded-xl border-gray-200 hover:bg-gray-100 hover:border-red-300'>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className='rounded-xl h-[450px] mt-16 bg-black'
                    >

                    </video>
                  </div>
                ) : (
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col items-center justify-center h-full'>
                        <p className='font-bold text-xl'>
                          <FaCloudUploadAlt className='text-6xl text-gray-300' />
                        </p>
                        <p className='font-semibold text-xl'>Upload Video</p>
                      </div>
                      <p className='text-gray-400 text-center text-sm mt-10 leading-relaxed'>
                        MP4 or webM or ogg <br />
                        720x1290 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2gb
                      </p>
                      <p className=' bg-[#F51997] text-center rounded mt-10 text-white text-md font-medium p-2 w-52 outline-none'>
                        Upload File
                      </p>
                    </div>
                    <input
                      type="File"
                      name='upload video'
                      className='w-0 h-0'
                      onChange={(e) => uploadVideo(e)}
                    />
                  </label>
                )}
              </div>
            )}
            {wrongTypeFile && (
              <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>Please select a video file</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 pb-10">
          <label className='text-md font-medium'>caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className='rounded outline-none text-md border-2 border-gray-200 p-2'
          />
          <label className='text-md font-medium'>Choose a Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className='outline-none border-2 borderp-gray-200 text-md capitalize p-2 lg:p-4 rounded cursor-pointer'
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                value={topic.name}
                className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className='flex gap-6 mt-10'>
            <button
              onClick={() => { }}
              type='button'
              className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type='button'
              className='bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Upload