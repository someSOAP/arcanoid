import happy1 from '@/assets/happy/1.mp4'
import happy2 from '@/assets/happy/2.mp4'
import happy3 from '@/assets/happy/3.mp4'
import happy4 from '@/assets/happy/4.mp4'
import happy5 from '@/assets/happy/5.mp4'
import happy6 from '@/assets/happy/6.mp4'

import sad1 from '@/assets/sad/1.mp4'
import sad2 from '@/assets/sad/2.mp4'
import sad3 from '@/assets/sad/3.mp4'
import sad4 from '@/assets/sad/4.mp4'
import sad5 from '@/assets/sad/5.mp4'
import sad6 from '@/assets/sad/6.mp4'
import sad7 from '@/assets/sad/7.mp4'
import sad8 from '@/assets/sad/8.mp4'
import sad9 from '@/assets/sad/9.mp4'

import getRandom from '@/utils/getRandom.ts'

export const happyCats = [happy1, happy2, happy3, happy4, happy5, happy6]

export const sadCats = [sad1, sad2, sad3, sad4, sad5, sad6, sad7, sad8, sad9]

export const getHappyCatVideo = () => {
  return getRandom(happyCats)
}

export const getSadCatVideo = () => {
  return getRandom(sadCats)
}

export const getCatVideo = (isSad: boolean) => {
  return isSad ? getSadCatVideo() : getHappyCatVideo()
}

export const preloadAllVideos = async () => {
  const sadCatsFetches = Promise.all(sadCats.map((it) => fetch(it)))
  const happyCatsFetches = Promise.all(happyCats.map((it) => fetch(it)))

  const [sadCatsResponses, happyCatsResponses] = await Promise.all([
    sadCatsFetches,
    happyCatsFetches,
  ])

  const sadCatsBlobs = Promise.all(sadCatsResponses.map((it) => it.blob()))
  const happyCatsBlobs = Promise.all(happyCatsResponses.map((it) => it.blob()))

  const [sad, happy] = await Promise.all([sadCatsBlobs, happyCatsBlobs])

  return {
    sad: sad.map((it) => URL.createObjectURL(it)),
    happy: happy.map((it) => URL.createObjectURL(it)),
  }
}
