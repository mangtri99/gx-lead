import React, { useState } from 'react'
import { LayoutContext } from '../context/LayoutContext'
import { useMedia } from 'react-use';
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '../../config/general';

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isShowSidebar, setIsShowSidebar] = useState(true)
  const isMobile = useMedia('(max-width: 992px)');

  function setMarginContent(){
    if(isMobile){
      return '0px'
    } else if (!isMobile && isShowSidebar){
      return `${SIDEBAR_WIDTH}px`
    } else {
      return `${SIDEBAR_COLLAPSED_WIDTH}px`
    }
  }
  return (
    <LayoutContext.Provider value={{
      isShowSidebar,
      setIsShowSidebar,
      setMarginContent,
    }}>
      {children}
    </LayoutContext.Provider>
  )
}
