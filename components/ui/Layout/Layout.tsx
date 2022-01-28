



export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex flex-col items-center  ">


      <main className="flex flex-col justify-center sm:max-w-3xl max-w-sm ">
        {children}
      </main>



    </div>
  )
}

export default Layout