import { FC } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import ThemeSwitch from './ThemeSwitch'
import { ThemeProvider } from 'next-themes'
import NiceLogo from './NiceLogo'
import { Disclosure } from '@headlessui/react'
import { FiSearch } from 'react-icons/fi'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => (
  <NavbarRoot>
    <Container>
      <Disclosure>
        {({ open }) => (
          <div>
            <div className={s.nav}>
              <div className="flex items-center flex-1">
                <Link href="/">
                  <a className={s.logo} aria-label="Nice">
                    <Logo />
                  </a>
                </Link>
                <Link href="/">
                  <a className="" aria-label="Home">
                    <NiceLogo className="" />
                  </a>
                </Link>

                <nav className={s.navMenu}>
                  <Link href="/search">
                    <a className={s.link}>All</a>
                  </Link>
                  {links?.map((l) => (
                    <Link href={l.href} key={l.href}>
                      <a className={s.link}>{l.label}</a>
                    </Link>
                  ))}
                </nav>
              </div>
              {process.env.COMMERCE_SEARCH_ENABLED && (
                <div className="justify-center flex-1 hidden lg:flex mt-5">
                  <Searchbar />
                </div>
              )}

              <div className="flex items-center justify-end flex-1 space-x-2">
                <Disclosure.Button className="lg:hidden">
                  <FiSearch className={`${open ? "transform rotate-90" : ""}`} size={20} />
                </Disclosure.Button>
                <ThemeSwitch />
                <UserNav />
              </div>
            </div>
            <div>
              {process.env.COMMERCE_SEARCH_ENABLED && (
                <div>
                  <Disclosure.Panel className="pb-2 lg:hidden">
                    <Searchbar id="mobile-search" />
                  </Disclosure.Panel>
                </div>
              )}
            </div>
          </div>
        )}
      </Disclosure>
    </Container>
  </NavbarRoot>
)

export default Navbar
