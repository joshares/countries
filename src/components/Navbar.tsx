import React from 'react'
import { BsMoon,BsSun } from 'react-icons/bs'
import { useState, useEffect } from 'react'


export const Navbar = () => {

  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);
  useEffect(() => {
    if (darkMode === true) {
      document.querySelector<any>('body').classList.add("dark");
    } else if(darkMode === false) {
      document.querySelector<any>('body').classList.remove("dark");
    }
  }, [darkMode]);
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <main className='flex justify-between items-center p-6 shadow-md font-nunito dark:bg-darkColor dark:text-darkTextColor'>
     <div>
      <h1 className="text-2xl font-semibold">Where in the world</h1>
     </div>
     {
      darkMode ? (
        <div className='flex gap-1 items-center cursor-pointer ' onClick={() => handleDarkMode()}>
      <BsMoon/>
      <p>Darkmode</p>
     </div>
      ):(
        <div className='flex gap-1 items-center cursor-pointer ' onClick={() => handleDarkMode()}>
      <BsSun/>
      <p>Lightmode</p>
     </div>
      )
     }
    </main>
  )
}

