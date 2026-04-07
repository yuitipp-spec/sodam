import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://sodamspace.com', lastModified: new Date() },
    { url: 'https://sodamspace.com/portfolio/residential', lastModified: new Date() },
    { url: 'https://sodamspace.com/portfolio/commercial', lastModified: new Date() },
  ]
}