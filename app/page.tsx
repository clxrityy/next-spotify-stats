import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import SearchArtist from "@/components/SearchArtist";


export default function Home() {
  return (
    <div className="h-[110vh] md:h-[80vh] w-full flex justify-center items-center">
      <div className="flex flex-col-reverse md:flex-col lg:flex-row justify-center items-center space-x-0 container xl:space-x-[14rem]">
        <div className="rounded-2xl flex flex-col p-[2rem]">
          <div className="flex flex-col md:flex-row lg:flex-col items-center justify-around space-y-4 md:space-y-8">

            <div className="flex">
              <Logo />
            </div>

            <div className="flex flex-col items-center justify-center">
              <h1 className="uppercase text-7xl md:text-8xl lg:text-9xl shadow-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-blue-400 hover:bg-gradient-to-l transition-all ease-out hover:scale-105">
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
      <Footer />
    </div>
  )
}
