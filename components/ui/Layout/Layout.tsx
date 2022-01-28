

import { ScrollToTop } from '../scroll'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex flex-col items-center  ">


      <main className="flex flex-col justify-center sm:max-w-3xl max-w-sm ">
        {children}
      </main>


      <ScrollToTop />
    </div>
  )
}

export default Layout