import { useEffect, useState } from 'react'
import exceptionIcon from './img/exception.png'
import vehicleIcon from './img/vehicle-icon.png'

const storageAllIcons = async (resolve, reject) => {
  for (let i = 0; i <= 4; i++) {
    for (let j = 0; j <= 4; j++) {
      const exceptionKey = `vehicleIcon${j}_${i}_exceptions`
      const exceptionIcon = await createExceptionIcon(20, 40, i * 20, (j - 1) * 40)
      window.VehicleIconsMapBase64.set(exceptionKey, exceptionIcon)
      const key = `vehicleIcon${j}_${i}`
      const icon = await createIcon(20, 40, i * 20, (j - 1) * 40)
      window.VehicleIconsMapBase64.set(key, icon)
    }
  }

  return resolve(window.VehicleIconsMapBase64)
}

async function createExceptionIcon(width, height, offsetX, offsetY) {
  const exceptionImg = await base64ToImg(exceptionIcon)
  const vehicleImg = await base64ToImg(vehicleIcon)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height
  ctx.drawImage(vehicleImg, offsetX, offsetY, width, height, 0, 0, width, height)
  ctx.drawImage(exceptionImg, width - 10, height - 10)

  return canvas.toDataURL()
}

window.VehicleIconsMapBase64 = new Map()

export default function App() {
  const [target, setTarget] = useState([])
  useEffect(() => {
    new Promise((resolve, reject) => {
      return storageAllIcons(resolve, reject)
    }).then((res) => {
      console.log('res: ', res)
      const values = []
      res.forEach((item, i) => {
        const img = (<img style={{ height: 40, width: 20 }} src={item} key={i} />)
        values.push(img)
      })

      setTarget(values)
    })
  })

  return (
    <>
      <h1>图片处理</h1>
      {target}
    </>
  )
}


function base64ToImg(base64) {
  const img = new Image()

  return new Promise(function (resolve, reject) {
    if (typeof base64 === 'string') {
      img.src = base64
    } else {
      console.error('input string not valid')
    }
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function (e) {
      reject(e)
    }
  })
}

async function createIcon(width, height, offsetX, offsetY) {
  const vehicleImg = await base64ToImg(vehicleIcon)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height
  ctx.drawImage(vehicleImg, offsetX, offsetY, width, height, 0, 0, width, height)

  return canvas.toDataURL()
}