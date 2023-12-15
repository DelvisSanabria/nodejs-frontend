import Menu from "./Menu";

// eslint-disable-next-line react/prop-types
export default function Layout({children,activeTab, setActiveTab,setIsVisible}){

  return(
    <main  className="relative flex justify-center w-screen h-screen md:static md:grid md:items-center md:justify-items-center md:content-center md:grid-cols-[225px_1fr]">
      <div className="absolute bottom-14 w-[500px] flex justify-center md:static">
        <Menu activeTab={activeTab} setActiveTab={setActiveTab} setIsVisible={setIsVisible}></Menu>
      </div>
      <div className="overflow-auto m-2 rounded-xl w-[95vw] h-[97vh] md:w-[70vw] md:h-[95vh] bg-sky-500 lg:w-[75vw] xl:w-[80vw]">
        {children}
      </div>
    </main>
  )
}