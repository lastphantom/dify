import { isImage } from '../utils'
import { useFile } from '../hooks'
import { useStore } from '../store'
import FileImageItem from './file-image-item'
import FileItem from './file-item'
import type { FileUpload } from '@/app/components/base/features/types'

type FileListProps = {
  fileConfig: FileUpload
}
const FileList = ({
  fileConfig,
}: FileListProps) => {
  const files = useStore(s => s.files)
  const {
    handleRemoveFile,
    handleReUploadFile,
  } = useFile(fileConfig)

  return (
    <div className='flex flex-wrap gap-2'>
      {
        files.map((file) => {
          if (isImage(file.file)) {
            return (
              <FileImageItem
                key={file.fileId}
                fileId={file.fileId}
                imageUrl={file.base64Url}
                progress={file.progress}
                showDeleteAction
                onRemove={handleRemoveFile}
                onReUpload={handleReUploadFile}
              />
            )
          }

          return (
            <FileItem
              key={file.fileId}
              fileId={file.fileId}
              file={file.file}
              progress={file.progress}
              showDeleteAction
              showDownloadAction={false}
              onRemove={handleRemoveFile}
              onReUpload={handleReUploadFile}
            />
          )
        })
      }
    </div>
  )
}

export default FileList