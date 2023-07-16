import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const ScrollToBottom = ({onClick}) => {
  return (
    // scroll to bottom button
    <div className="fixed bottom-10 right-10">
        <button
            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
            onClick={onClick}
        >
            <ArrowForwardIosIcon 
            // rotate 90deg
            style={{ transform: "rotate(90deg)" }}
            className="text-gray-700"
             />
        </button>
    </div>

  )
}

export default ScrollToBottom