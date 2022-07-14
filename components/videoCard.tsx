import React, { useRef, useState } from 'react'
import type { NextPage } from "next"

import Link from 'next/link'
import Image from 'next/image'
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi"
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from "react-icons/go"

import { Video } from '../types'

type VideoProps = {
  post: Video
}

const VideoCard: NextPage<VideoProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [isVideoMulted, setIsVideoMulted] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  const isVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef.current?.play()
      setPlaying(true)
    }
  }

  return (

    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      {/* //! heading perfil */}
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='w-10 h-10 md:w-16 md:h-16'>
            <Link href="/">
              <>
                <Image
                  className='rounded-full'
                  src={post.postedBy.image}
                  alt="user profile"
                  width={62}
                  height={62}
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href='/'>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center font-bold md:text-md text-primary'>
                  {post.postedBy.userName} {" "}
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden xl:block'>
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>{/* //! heading perfil img and name */}


      {/* //? video Player */}
      <div className='flex gap-4 relative lg:ml-20'>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className='rounded-3x1'>
          <Link href='/'>
            <video
              ref={videoRef}
              className='h-[300px] w-[200px] rounded-2xl cursor-pointer md:h-[400px] bg-gray-100 lg:w-[600px] lg:h-[550px] '
              src={post.video.asset.url}>

            </video>
          </Link>
          {isHover && (
            <div className="flex gap-10 absolute bottom-6 w-[100px] md:w-[50px] p-3 cursor-pointer left-10 md:left-14 lg:left-0 lg:justify-between">
              {playing ? (
                <button onClick={isVideoPress}>
                  <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
                </button>
              ) :
                <button onClick={isVideoPress}>
                  <BsFillPlayFill className='text-black text-2xl lg:text-4xl' />
                </button>
              }
              {isVideoMulted ? (
                <button onClick={() => setIsVideoMulted(false)}>
                  <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
                </button>
              ) :
                <button onClick={() => setIsVideoMulted(true)}>
                  <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
                </button>
              }
            </div>
          )}
        </div>
      </div>


    </div>
  )
}

export default VideoCard
