import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'
import usePrice from '@framework/product/use-price'
import ProductTag from '../ProductTag'

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple' | 'modern'
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  )

  return (
    <Link href={`/product/${product.slug}`}>
      <a className={rootClassName} aria-label={product.name}>
        {variant === 'slim' && (
          <>
            <div className="">
              <span className="">{product.name}</span>
            </div>
            {product?.images && (
              <div>
                <Image
                  quality="100"
                  src={product.images[0]?.url || placeholderImg}
                  alt={product.name || 'Product Image'}
                  height={320}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                  width={320}
                  layout="responsive"
                  {...imgProps}
                />
              </div>
            )}
          </>
        )}

        {variant === 'simple' && (
          <>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0]}
              />
            )}
            {!noNameTag && (
              <div className={s.header}>
                <h3 className={s.name}>
                  <span className="">{product.name}</span>
                </h3>
                <div className={s.price}>
                  {`${price} ${product.price?.currencyCode}`}
                </div>
              </div>
            )}
            <div className={s.imageContainer}>
              {product?.images && (
                <div>
                  <Image
                    alt={product.name || 'Product Image'}
                    className="{s.productImage}"
                    src={product.images[0]?.url || placeholderImg}
                    height={540}
                    width={540}
                    quality="100"
                    layout="responsive"

                    {...imgProps}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {variant === 'default' && (
          <>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0] as any}
              />
            )}
            <ProductTag
              name={product.name}
              price={`${price} ${product.price?.currencyCode}`}
            />
            <div className={s.imageContainer}>
              {product?.images && (
                <div>
                  <Image
                    alt={product.name || 'Product Image'}
                    className={s.productImage}
                    src={product.images[0]?.url || placeholderImg}
                    height={540}
                    width={540}
                    quality="85"
                    layout="responsive"
                    {...imgProps}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {variant === 'modern' && (
          <div className="bg-primary">
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0] as any}
              />
            )}

            <div className="w-full aspect-w-1 aspect-h-1  rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 ">
              {product?.images && (
                <div>
                  <Image
                    alt={product.name || 'Product Image'}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                    src={product.images[0]?.url || placeholderImg}
                    height={630}
                    width={540}
                    quality="85"
                    layout="responsive"
                    {...imgProps}
                  />
                </div>
              )}
            </div>
            <h3 className="mt-4 text-sm ">{product.name}</h3>
            <p className="mt-1 text-lg font-medium ">
              {price} {product?.price?.currencyCode}
            </p>
          </div>
        )}
      </a>
    </Link>
  )
}

export default ProductCard
