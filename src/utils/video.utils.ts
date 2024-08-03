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

export const fetchCatsVideos = async () => {
  const preloadVideo = async (url: string) => {
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      return URL.createObjectURL(blob)
    } catch (err) {
      console.error(`Failed to load ${url} video. Reason: `, err)
      throw err
    }
  }

  const [firstSadCat, ...restSadCats] = sadCats
  const [firstHappyCat, ...restHappyCats] = happyCats

  const [sadRes, happyRes] = await Promise.all([
    fetch(firstSadCat),
    fetch(firstHappyCat),
  ])

  const [firstSadVidBlob, firstHappyVidBlob] = await Promise.all([
    sadRes.blob(),
    happyRes.blob(),
  ])

  const sadVideos: string[] = [URL.createObjectURL(firstSadVidBlob)]
  const happyVideos: string[] = [URL.createObjectURL(firstHappyVidBlob)]

  setTimeout(() => {
    restHappyCats.forEach((url) => {
      preloadVideo(url).then((url) => happyVideos.push(url))
    })
    restSadCats.forEach((url) => {
      preloadVideo(url).then((url) => sadVideos.push(url))
    })
  })

  return {
    sad: sadVideos,
    happy: happyVideos,
  }
}
