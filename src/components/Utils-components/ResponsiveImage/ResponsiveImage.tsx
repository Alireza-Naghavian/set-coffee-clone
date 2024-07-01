"use client"
import { customeBlurDataURL } from '@/utils/constants'
import Image, { ImageProps } from 'next/image'
import React, { useState } from 'react'
interface Props extends Omit<ImageProps, 'placeholder' | 'quality' | 'layout'> {
    dimensions?: string
    imageStyles?: string
  }
  
const ResponsiveImage:React.FC<Props> =(props)=> {
    const {dimensions,className,src,imageStyles,alt,blurDataURL,...restProps} =props
  const [isLoaded,setIsLoaded] =useState(false)
    //? render
    return (
        <div className={`relative ${dimensions??""} ${className??""}`} title={alt}>
            <Image
            src={src}
            alt={alt}
            className={`${imageStyles} ${isLoaded ? "" : "blur-effect"}`}
            placeholder='blur'
            blurDataURL={blurDataURL ? "data:image/png;base64,"+blurDataURL: customeBlurDataURL}
            fill
            quality={"100"}
            sizes={dimensions}
            onLoad={()=>setIsLoaded(true)}
            {...restProps}
           />
 
        </div>
  )
}

export default ResponsiveImage