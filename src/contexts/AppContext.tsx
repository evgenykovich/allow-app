import React, { createContext, useState, useContext } from 'react'

interface AppContextProps {
  sharedData: any
  setSharedData: React.Dispatch<React.SetStateAction<any>>
  personalData: any
  personalDataData: React.Dispatch<React.SetStateAction<any>>
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sharedData, setSharedData] = useState<any>([])
  const [personalData, personalDataData] = useState<any>({})

  const contextValue: AppContextProps = {
    sharedData,
    setSharedData,
    personalData,
    personalDataData,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }

  return context
}
