import { FC, useState } from 'react'
import type { Product } from '@commerce/types/product'
import Image, { ImageProps } from 'next/image'

interface CarouselProps {
  product: Product
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
}

const Carousel: FC<CarouselProps> = ({ product, imgProps }) => {
  const placeholderImg = '/product-img-placeholder.svg'
  let count = 0
  const [currentIndex, setCurrentIndex] = useState(0)
  const handleOnNextClick = () => {
    count = (count + 1) % product.images.length
    setCurrentIndex(count)
  }
  const handleOnPrevClick = () => {
    const productsLength = product.images.length
    count = (currentIndex + productsLength - 1) % productsLength
    setCurrentIndex(count)
  }
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="w-full relative select-none">
        <div className="aspect-w-16 aspect-h-16">
          {product?.images && (
            
              <Image
                quality="100"
                src={product.images[0]?.url || placeholderImg}
                alt={product.name || 'Product Image'}
                layout="fill"
                {...imgProps}
              />
            
          )}
        </div>
      </div>
    </div>
  )
}

export default Carousel
