/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { AnimatePresence, motion } from "framer-motion";
import tabs from "./Tabs";


function Menu({activeTab,setActiveTab, setIsVisible}) {
  
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center m-4  bg-[#d2d3ce] w-[300px] rounded-xl p-1 text-[#101736] text-xs select-none md:grid md:grid-rows-4 md:w-[200px] md:m-2 md:h-[95vh] md:text-lg"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsVisible(true);
              }}
              className={`${
                activeTab === tab.id ? "" : "hover:text-black/75"
              } relative flex flex-row justify-center items-center rounded-lg w-20 h-7 md:w-48 md:h-14`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-[#b9b9b9] mix-blend-overlay"
                  style={{ borderRadius: 8 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default Menu;