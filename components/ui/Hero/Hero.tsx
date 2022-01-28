import React, { FC } from 'react'
import { Container } from '@components/ui'
import { ArrowRight } from '@components/icons'
import s from './Hero.module.css'
import Link from 'next/link'
import ParticlesBg from "particles-bg";
interface HeroProps {
  className?: string
  headline: string
  description: string
}

const Hero: FC<HeroProps> = ({ headline, description }) => {
  return (
    <div className="bg-accent-1 border-b border-t border-accent-2">
      
      <div className=''>
        <div className={s.root}>
          <h2 className={s.title}>{headline}</h2>
          <div className={s.description}>
            <p>{description}</p>
            <Link href="/">
              <a className="flex items-center text-accent-8 pt-3 font-bold hover:underline cursor-pointer w-max-content">
                browse selection
                <ArrowRight width="20" heigh="20" className="ml-1" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}



export default Hero
