import fs from 'fs/promises'
import path from 'path'
import { Fragment } from 'react'

// schema
import type { Product, Props, Context } from '@/schema/page.schema'

const ProductDetailsPage = (props: Props) => {
  const { product } = props

  if (!product) {
    return (<div><h1>Product not found</h1></div>)
  }

  return (
    <Fragment>
      <div>{product.title}</div>
      <div>{product.description}</div>
    </Fragment>
  )
}

const getData = async () => {
  const jsonData = await fs.readFile(path.join(process.cwd(), 'data', 'dummy-backend.json'))
  
  return JSON.parse(jsonData.toString())
}

export const getStaticProps = async (context: Context) => {
  const { params } = context
  const { pid } = params
  let product = {}

  try {
    const data = await getData()
    product = data.products.find((product: Product) => product.id === pid)

    if (!product) {
      throw Error('Not found')
    }
  } catch (error) {
    console.log('error', error)

    return {
      notFound: true,
    }
  }

  return {
    props: {
      product,
    },
    revalidate: 10,
  }
  
}

export const getStaticPaths = async () => {
  const data = await getData()
  const params = data.products.map((product: Product) => ({ params: { pid: product.id } }))

  return {
    paths: [
      ...params,
    ],
    fallback: true,
  }
}

export default ProductDetailsPage