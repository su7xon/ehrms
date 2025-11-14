'use client'

import { useState } from 'react'
import { X, Upload, File, Trash2, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface UploadedDocument {
  id: string
  name: string
  size: string
  uploadedDate: string
  type: string
}

export default function DocumentsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [documents, setDocuments] = useState<UploadedDocument[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach((file) => {
      const newDoc: UploadedDocument = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: formatFileSize(file.size),
        uploadedDate: new Date().toLocaleDateString('en-IN'),
        type: file.type || 'Unknown'
      }
      setDocuments([newDoc, ...documents])
    })

    setUploadSuccess(true)
    setTimeout(() => setUploadSuccess(false), 2000)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const deleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Documents</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-300 bg-slate-50 hover:border-blue-400'
              }`}
            >
              <input
                type="file"
                multiple
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer block">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  Drag files here or click to browse
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Supported: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
                </p>
              </label>
            </div>

            {/* Success Message */}
            {uploadSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-sm text-green-700">File uploaded successfully!</p>
              </motion.div>
            )}

            {/* Documents List */}
            {documents.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700">Uploaded Documents</h3>
                {documents.map((doc) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <File className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {doc.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {doc.size} • {doc.uploadedDate}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteDocument(doc.id)}
                      className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <File className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500">No documents uploaded yet</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors font-medium text-sm"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
