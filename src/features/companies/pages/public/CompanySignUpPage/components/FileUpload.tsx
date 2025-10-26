import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUploadFile } from '@/hooks/api/file/mutations';

interface FileUploadProps {
  value?: string | File;
  onChange: (value: string | null) => void; // Changed to only accept string (URL) or null
  accept?: string;
  maxSize?: number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  autoUpload?: boolean; // New prop to control auto upload behavior
}

export function FileUpload({
                             value,
                             onChange,
                             accept = '.pdf,.jpg,.jpeg,.png',
                             maxSize = 10,
                             placeholder = 'Chọn file để tải lên',
                             disabled = false,
                             className,
                             autoUpload = true
                           }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: uploadFile, isPending } = useUploadFile();

  const handleFileSelect = async (file: File) => {
    setUploadError('');
    setSelectedFile(file);

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setUploadError(`Kích thước file không được vượt quá ${maxSize}MB`);
      setSelectedFile(null);
      return;
    }

    // Validate file type
    const allowedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      setUploadError(`Định dạng file không được hỗ trợ. Chỉ chấp nhận: ${accept}`);
      setSelectedFile(null);
      return;
    }

    // Auto upload if enabled
    if (autoUpload) {
      try {
        const result = await uploadFile(file);
        onChange(result.url || result.data?.url); // Adjust based on your API response structure
        setSelectedFile(null); // Clear selected file after successful upload
      } catch (error) {
        setUploadError('Có lỗi xảy ra khi tải file lên server');
        console.error('Upload error:', error);
        setSelectedFile(null);
      }
    }
  };

  const handleManualUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploadError('');
      const result = await uploadFile(selectedFile);
      onChange(result.url || result.data?.url); // Adjust based on your API response structure
      setSelectedFile(null);
    } catch (error) {
      setUploadError('Có lỗi xảy ra khi tải file lên server');
      console.error('Upload error:', error);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
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
    if (!isPending) {
      fileInputRef.current?.click();
    }
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
    if (typeof value === 'string' && value) {
      return value.split('/').pop() || 'File đã tải lên';
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
  const hasFile = !!fileName;
  const isUploaded = typeof value === 'string' && value && !selectedFile;

  return (
    <div className={cn('w-full', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileSelect(file);
          }
        }}
        className="hidden"
        disabled={disabled || isPending}
      />

      {!hasFile ? (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
            isDragOver
              ? 'border-[#2a9d8f] bg-[#2a9d8f]/5'
              : 'border-gray-300 hover:border-[#2a9d8f]',
            (disabled || isPending) && 'opacity-50 cursor-not-allowed',
            uploadError && 'border-red-300 bg-red-50'
          )}
        >
          <div className="flex flex-col items-center gap-3">
            {isPending ? (
              <Loader2 className="h-8 w-8 text-[#2a9d8f] animate-spin" />
            ) : (
              <Upload className={cn(
                'h-8 w-8',
                uploadError ? 'text-red-400' : 'text-gray-400'
              )} />
            )}
            <div>
              <p className="text-sm font-medium text-gray-700">
                {isPending ? 'Đang tải lên...' : placeholder}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Hoặc kéo thả file vào đây
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Định dạng: {accept} • Tối đa {maxSize}MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {isPending ? (
                <Loader2 className="h-8 w-8 text-[#2a9d8f] animate-spin" />
              ) : isUploaded ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
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
              {isPending && (
                <p className="text-xs text-[#2a9d8f]">Đang tải lên...</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Manual upload button (only show if autoUpload is false and file is selected but not uploaded) */}
              {!autoUpload && selectedFile && !isUploaded && !isPending && (
                <Button
                  type="button"
                  size="sm"
                  onClick={handleManualUpload}
                  className="bg-[#2a9d8f] hover:bg-[#2a9d8f]/90 text-white"
                >
                  Tải lên
                </Button>
              )}

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                disabled={disabled || isPending}
                className="flex-shrink-0 h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
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
