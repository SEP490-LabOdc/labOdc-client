import React, { useState, useRef } from 'react';
import { Upload, X, FileIcon, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUploadFile } from '@/hooks/api/file'

interface FileUploadProps {
  value?: string | null; // Changed back to string (file URL) after successful upload
  onChange: (value: string | null) => void; // Changed back to handle file URLs
  accept?: string;
  maxSize?: number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function FileUpload({
   value,
   onChange,
   accept = '.pdf,.jpg,.jpeg,.png',
   maxSize = 10,
   placeholder = 'Chọn file để tải lên',
   disabled = false,
   className
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();

  const handleFileSelect = async (file: File) => {
    setUploadError('');

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setUploadError(`Kích thước file không được vượt quá ${maxSize}MB`);
      return;
    }

    // Validate file type
    const allowedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      setUploadError(`Định dạng file không được hỗ trợ. Chỉ chấp nhận: ${accept}`);
      return;
    }

    // Store selected file and upload
    setSelectedFile(file);

    // Create FormData and upload
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadFile(formData);
      // Handle success - access the nested data structure
      const fileUrl = response.data?.fileUrl;
      if (fileUrl) {
        onChange(fileUrl);
        setSelectedFile(null);
        setUploadError('');
      } else {
        setUploadError('Không thể lấy URL của file đã tải lên');
        setSelectedFile(null);
      }
    } catch (error: unknown) {
      setUploadError(error instanceof Error ? error.message : 'Tải file lên thất bại');
      setSelectedFile(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      void handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onChange(null);
    setSelectedFile(null);
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileName = () => {
    if (selectedFile) {
      return selectedFile.name;
    }
    if (value) {
      // Extract filename from URL
      return value.split('/').pop() || 'Uploaded file';
    }
    return null;
  };

  const getFileSize = () => {
    if (selectedFile) {
      return `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`;
    }
    return null;
  };

  const fileName = getFileName();
  const fileSize = getFileSize();
  const hasFile = !!(fileName || value);
  const showLoading = isUploading || !!selectedFile;

  return (
    <div className={cn('w-full', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            void handleFileSelect(file);
          }
        }}
        className="hidden"
        disabled={disabled}
      />

      {!hasFile ? (
        <div
          onClick={!isUploading ? handleClick : undefined}
          onDrop={!isUploading ? handleDrop : undefined}
          onDragOver={!isUploading ? handleDragOver : undefined}
          onDragLeave={!isUploading ? handleDragLeave : undefined}
          className={cn(
            'relative border-2 border-dashed rounded-lg p-6 text-center transition-colors',
            !isUploading && 'cursor-pointer',
            isDragOver && !isUploading
              ? 'border-[#2a9d8f] bg-[#2a9d8f]/5'
              : 'border-gray-300 hover:border-[#2a9d8f]',
            (disabled || isUploading) && 'opacity-50 cursor-not-allowed',
            uploadError && 'border-red-300 bg-red-50'
          )}
        >
          <div className="flex flex-col items-center gap-3">
            {isUploading ? (
              <Loader2 className="h-8 w-8 text-[#2a9d8f] animate-spin" />
            ) : (
              <Upload className={cn(
                'h-8 w-8',
                uploadError ? 'text-red-400' : 'text-gray-400'
              )} />
            )}
            <div>
              <p className="text-sm font-medium text-gray-700">
                {isUploading ? 'Đang tải lên...' : placeholder}
              </p>
              {!isUploading && (
                <>
                  <p className="text-xs text-gray-500 mt-1">
                    Hoặc kéo thả file vào đây
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Định dạng: {accept} • Tối đa {maxSize}MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {showLoading ? (
                <Loader2 className="h-8 w-8 text-[#2a9d8f] animate-spin" />
              ) : (
                <FileIcon className="h-8 w-8 text-[#2a9d8f]" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {fileName}
              </p>
              {fileSize && (
                <p className="text-xs text-gray-500">{fileSize}</p>
              )}
              {isUploading && (
                <p className="text-xs text-blue-600">Đang tải lên...</p>
              )}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={disabled || isUploading}
              className="flex-shrink-0 h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {uploadError && (
        <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          {uploadError}
        </div>
      )}
    </div>
  );
}
