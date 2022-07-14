import type { NextPage } from 'next'
import axios from 'axios'
import { Video } from "../types"
import VideoCard from '../components/videoCard'
import NoResults from '../components/noResults'

type HomeProps = {
  videos: Video[]
}

const Home: NextPage<HomeProps> = ({ videos }) => {
  console.log(videos);

  return (
    <div className='flex flex-col gap-10 videos h-full '>
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text={"No VIdeos"} />
      )}
    </div>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`)

  return {
    props: {
      videos: data
    }
  }
}

export default Home
