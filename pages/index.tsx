import commerce from '@lib/api/commerce'
import { Layout, Carousel } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 50 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="">
      <Hero
        headline="Nice Co"
        description="We strive to give beauty professionals the highest quality products at the best prices.  "
      />
      {products.slice(0, 5).map((product: any, i: number) => (
      <Carousel product={product}/>
      ))}
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.slice(13, 29).map((product: any, i: number) => (
            <ProductCard key={product.id} product={product} variant="modern" />
          ))}
        </div>
      </div>

      <Marquee variant="secondary">
        {products.slice(16, 27).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="modern" />
        ))}
      </Marquee>
      <Grid variant="filled">
        {products.slice(3, 9).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="modern"
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
              priority: true,
            }}
          />
        ))}
      </Grid>
      <Grid layout="B" variant="filled">
        {products.slice(0, 6).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="modern"
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee>
        {products.slice(3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="modern" />
        ))}
      </Marquee>
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </div>
  )
}

Home.Layout = Layout
