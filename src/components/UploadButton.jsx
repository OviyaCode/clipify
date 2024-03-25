import React from 'react'
import { IoIosAddCircle } from "react-icons/io";

const UploadButton = ({onClick, fileInputRef}) => {
  return (
    <div onClick={() => onClick(fileInputRef)}>
        <IoIosAddCircle className='cursor-pointer'/>
    </div>
  )
}

export default UploadButton;