/*
  Copyright (c) 2020, Jan Varho

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted, provided that the above
  copyright notice and this permission notice appear in all copies.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
  WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
  MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
  ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
  WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
  ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
  OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
import React from 'react'

import { Uppload, en, Camera, Crop, Local, Preview } from 'uppload'
import 'uppload/dist/uppload.css'
import 'uppload/dist/themes/light.css'


export const API_KEY = process.env.REACT_APP_API_KEY
export const API_URL = process.env.REACT_APP_API_URL

let uppload = null
const getUploader = () => {
  if (!uppload) {
    uppload = new Uppload({
      lang: en,
      defaultService: 'camera',
      uploader: (file) => new Promise((resolve, reject) => {
        fetch(API_URL + 'images', {method: 'post', headers: {'X-Api-Key': API_KEY}})
          .then((r) => {
            if (r.status === 200) {
              return r.json()
            }
            reject(r)
          })
          .then(({id, url, fields}) => {
            const body = new FormData()
            for (const [ key, value ] of Object.entries(fields)) {
              body.set(key, value)
            }
            body.set('file', file)
            return fetch(url, {method: 'post', body})
              .then((r) => {
                if (r.status === 204) {
                  resolve(API_URL + 'images/' + id)
                } else {
                  reject(r)
                }
              })
          })
          .catch(reject)
      }),
    })
    uppload.use([new Camera(), new Crop(), new Local(), new Preview()])
  }
  return uppload
}


const Upload = ({ children, onChange }) => {
  const handleClick = () => {
    const uploader = getUploader()
    uploader.on('upload', onChange)
    uploader.open()
  }
  return (
    <button onClick={handleClick}>{children}</button>
  )
}

export default Upload
