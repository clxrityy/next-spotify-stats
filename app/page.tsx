import Logo from "@/components/Logo";
import SearchArtist from "@/components/SearchArtist";


export default function Home() {
  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <div className="flex flex-col-reverse md:flex-col container lg:flex-row justify-center items-center space-x-0 xl:space-x-[14rem]">
        <div className="gradient-box rounded-2xl flex flex-col shadow-xl lg:shadow-none">
          <div className="flex flex-col md:flex-row lg:flex-col items-center justify-around space-y-8">

            <div className="flex">
              <Logo />
            </div>

            <div className="flex flex-col items-center justify-center">
              <h1 className="uppercase text-7xl md:text-8xl lg:text-9xl shadow-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-blue-400 hover:bg-gradient-to-l transition-colors ease-out">
                next
              </h1>
              <h1 className="uppercase text-3xl md:text-4xl lg:text-5xl font-semibold font-sub bg-gradient-to-r from-white/90 to-white/80 bg-clip-text text-transparent">
                spotify stats
              </h1>
            </div>

          </div>
        </div>

        
          <SearchArtist />

      </div>
    </div>
  )
}
