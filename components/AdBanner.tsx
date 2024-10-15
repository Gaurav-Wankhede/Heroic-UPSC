"use client"
import React, { useEffect } from 'react'


type AdBannerProps = {
    dataAdSlot: string,
    dataAdFormat: string,
    dataFullWidthResponsive: boolean,
}

function AdBanner({
    dataAdSlot,
    dataAdFormat,
    dataFullWidthResponsive,
}: AdBannerProps) {
    useEffect(() => {
        try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
        } catch (error) {
            console.error("Error initializing AdSense:", error);
        }
    }, []);

  return (
    <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_AD_SENSE_PID}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
    >

    </ins>
  )
}

export default AdBanner