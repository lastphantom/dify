import {
  createContext,
  useContext,
  useRef,
} from 'react'
import {
  create,
  useStore as useZustandStore,
} from 'zustand'
import type {
  FileEntity,
} from './types'

type Shape = {
  files: FileEntity[]
  setFiles: (files: FileEntity[]) => void
}

export const createFileStore = (onChange?: (files: FileEntity[]) => void) => {
  return create<Shape>(set => ({
    files: [],
    setFiles: (files) => {
      set({ files })
      onChange?.(files)
    },
  }))
}

type FileStore = ReturnType<typeof createFileStore>
export const FileContext = createContext<FileStore | null>(null)

export function useStore<T>(selector: (state: Shape) => T): T {
  const store = useContext(FileContext)
  if (!store)
    throw new Error('Missing FileContext.Provider in the tree')

  return useZustandStore(store, selector)
}

export const useFileStore = () => {
  return useContext(FileContext)!
}

type FileProviderProps = {
  children: React.ReactNode
  isPublicAPI?: boolean
  url?: string
  onChange?: (files: FileEntity[]) => void
}
export const FileContextProvider = ({
  children,
  onChange,
}: FileProviderProps) => {
  const storeRef = useRef<FileStore>()

  if (!storeRef.current)
    storeRef.current = createFileStore(onChange)

  return (
    <FileContext.Provider value={storeRef.current}>
      {children}
    </FileContext.Provider>
  )
}