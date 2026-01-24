import React, { useState, useRef, useEffect } from 'react'
import { Upload, X, FileIcon, AlertCircle, Loader2, Eye, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { useUploadFile } from '@/hooks/api/file'

interface FileUploadProps {
  value?: string | null;
  onChange: (value: string | null) => void;
  onFileUploaded?: (fileName: string) => void;
  existingFileName?: string;
  accept?: string;
  maxSize?: number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function FileUpload({
  value,
  onChange,
  onFileUploaded,
  existingFileName,
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
  const [uploadedFileInfo, setUploadedFileInfo] = useState<{ fileName: string; fileUrl: string } | null>(null);

  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();

  // Initialize with existing file info
  useEffect(() => {
    if (!uploadedFileInfo && value && existingFileName) {
      setUploadedFileInfo({ fileName: existingFileName, fileUrl: value });
    }
  }, [value, existingFileName, uploadedFileInfo]);

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
      const { fileUrl, fileName } = response.data || {};
      if (fileUrl && fileName) {
        onChange(fileUrl);
        setUploadedFileInfo({ fileName, fileUrl });
        setSelectedFile(null);
        setUploadError('');
        onFileUploaded?.(fileName);
      } else {
        setUploadError('Không thể lấy thông tin file đã tải lên');
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
    setUploadedFileInfo(null);
    setUploadError('');
    onFileUploaded?.(''); // Clear filename in parent
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle replace file - remove current and trigger file picker
  const handleReplace = () => {
    // setUploadedFileInfo(null);
    // setSelectedFile(null);
    // setUploadError('');
    // if (fileInputRef.current) {
    //   fileInputRef.current.value = '';
    // }
    // Trigger file picker
    setTimeout(() => handleClick(), 100);
  };

  // Handle view file - open in new tab
  const handleViewFile = () => {
    const fileUrl = value || uploadedFileInfo?.fileUrl;
    if (value) {
      window.open(fileUrl, '_blank');
    }
  };

  const getFileName = () => {
    if (uploadedFileInfo) {
      return uploadedFileInfo.fileName;
    }
    if (selectedFile) {
      return selectedFile.name;
    }
    if (existingFileName) {
      return existingFileName;
    }
    if (value) {
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
  console.log(fileName);
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
            'relative border-2 border-dashed rounded-md p-6 text-center transition-colors',
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
        <div className="border border-gray-300 rounded-md p-4">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
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

            <div className="flex items-center gap-1">
              {/* View File Button */}
              {(value || existingFileName) && !isUploading && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleViewFile}
                  disabled={disabled}
                  className="shrink-0 h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                  title="Xem file"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}

              {/* Replace File Button */}
              {!isUploading && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleReplace}
                  disabled={disabled}
                  className="shrink-0 h-8 w-8 p-0 hover:bg-orange-50 hover:text-orange-600"
                  title="Thay đổi file"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}

              {/* Remove File Button */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                disabled={disabled || isUploading}
                className="shrink-0 h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                title="Xóa file"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
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
