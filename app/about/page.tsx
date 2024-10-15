'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

// Import local images
import awsCertImage from './_assets/core_python.png'
import googleCertImage from './_assets/sql_intermediate.png'
import microsoftCertImage from './_assets/sql.png'
import kubernetesCertImage from './_assets/Google_Analytics.png'
import scrumCertImage from './_assets/html.png'
import Link from 'next/link'

const certificates = [
  { id: 1, image: awsCertImage, name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services' },
  { id: 2, image: googleCertImage, name: 'Google Cloud Professional Developer', issuer: 'Google Cloud' },
  { id: 3, image: microsoftCertImage, name: 'Microsoft Certified: Azure Developer Associate', issuer: 'Microsoft' },
  { id: 4, image: kubernetesCertImage, name: 'Certified Kubernetes Administrator', issuer: 'Cloud Native Computing Foundation' },
  { id: 5, image: scrumCertImage, name: 'Certified Scrum Master', issuer: 'Scrum Alliance' },
]

export default function AboutPage() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">About <Link href="https://gaurav-wankhede.vercel.app/" target="_blank" className="text-primary hover:underline">Gaurav Wankhede</Link></h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Background</h2>
        <p className="text-muted-foreground">
        Highly motivated and detail-oriented software developer with a strong passion for developing innovative AI and data-driven solutions. Proficient in machine learning, deep learning, data science, computer vision, web scraping, optimization, and automation. With over a year of experience in web technologies and cloud computing, I have successfully contributed to various projects, ranging from small startups to larger enterprise applications. My expertise enables me to create impactful solutions that leverage data and advanced technologies to drive business success.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            Frontend: NextJs, TypeScript
          </li>
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            Backend: Node.js, Python, Java
          </li>
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
              <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
            </svg>
            Databases: MongoDB, PostgreSQL, MySQL
          </li>
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
              <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
            DevOps: Docker
          </li>
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
              <path d="M19.8 18.4L14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z"/>
            </svg>
            Scraping: Selenium, Scrapy, BeautifulSoup
          </li>
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V8z"/>
            </svg>
            Machine Learning: Tensorflow, Pytorch, Scikit-learn, OpenCV, Pandas, Numpy
          </li>
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
            Visualization: Matplotlib, Seaborn, Plotly, PowerBI
          </li>
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
              <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
            </svg>
            Other: Automation, Git, Linux
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {certificates.map((cert, index) => (
                <div
                  key={cert.id}
                  className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
                    index === currentIndex 
                      ? 'opacity-100 translate-x-0' 
                      : index === (currentIndex - 1 + certificates.length) % certificates.length 
                        ? 'opacity-0 -translate-x-full' 
                        : 'opacity-0 translate-x-full'
                  }`}
                >
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}