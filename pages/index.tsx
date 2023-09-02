import Image from 'next/image'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import type { NextPage, GetStaticProps } from 'next'

// server side imports
import fs from 'fs/promises'
import path from 'path'

// components
import EventList from '@/components/events/EventList'
import NewsletterRegistration from '../components/input/newsletter-registration'
import Hero from '@/components/home/Hero'
import FeaturedPosts from '@/components/home/FeaturedPosts'

// api
import { apiHelper } from '../utils/api.util'

// schema
import { IPost } from '@/schema/posts.schema'

// utils
import { getAllEvents, getFeatureEvents } from '../utils/api.util'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  posts: IPost[]
}

export default function Home({ posts }: Props) {
  // const featureEvents = getFeaturedEvents()
  // const { products } = props 
  console.log('posts', posts)

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <Head>
        <title>NextJs blog</title>
        <meta title='description' content='Computing events for everyone' />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
      {/* <div>
         <NewsletterRegistration />
        <EventList events={featureEvents} />
      </div> */}
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    await apiHelper().posts.connect()

    const posts = await apiHelper().posts.retrieveAllWithQuery({ isFeatured: true })
  
    if (!posts.length) {
      throw new Error("Could not retrive any posts");
    }

    return {
      props:{
        posts
      },
      revalidate: 300,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
