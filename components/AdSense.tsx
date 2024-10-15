import React from 'react'
import Script from 'next/script'

function AdSense() {
  return (
    <Script
      async  
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_AD_SENSE_PID}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  )
}

export default AdSense