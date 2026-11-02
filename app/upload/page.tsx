'use client'

import { useState } from 'react'
import { CldUploadWidget, CldImage } from 'next-cloudinary'

interface CloudinaryResult {
  public_id: string
  secure_url: string
  original_filename: string
  format: string
  bytes: number
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState<string>('')
  const [uploadedUrl, setUploadedUrl] = useState<string>('')

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">File Upload</h1>
      <p className="text-sm text-gray-500 mb-6">
        Upload images to Cloudinary. The uploaded image will be displayed below using{' '}
        <code className="bg-base-200 px-1 rounded">CldImage</code> with automatic optimization.
      </p>

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        onUpload={(result) => {
          if (result.event === 'success') {
            const info = result.info as CloudinaryResult
            setPublicId(info.public_id)
            setUploadedUrl(info.secure_url)
          }
        }}
      >
        {({ open }) => (
          <button
            className="btn btn-primary mb-6"
            onClick={() => open()}
          >
            Upload Image
          </button>
        )}
      </CldUploadWidget>

      {publicId && (
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <h2 className="card-title text-sm">Uploaded Image</h2>
            <CldImage
              src={publicId}
              alt="Uploaded image"
              width={400}
              height={300}
              className="rounded-lg"
              crop="fill"
            />
            <p className="text-xs text-gray-500 break-all mt-2">
              <span className="font-semibold">Public ID: </span>{publicId}
            </p>
            <p className="text-xs text-gray-500 break-all">
              <span className="font-semibold">URL: </span>
              <a href={uploadedUrl} target="_blank" rel="noreferrer" className="link link-primary">
                {uploadedUrl}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadPage
