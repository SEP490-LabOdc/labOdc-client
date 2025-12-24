import FileSaver from "file-saver";

export const downloadTxtFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, filename);
};

export const downloadFile = (content: string, filename: string, mimeType: string = "text/csv") => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};

/**
 * Download file from URL
 * @param url - The URL of the file to download
 * @param filename - Optional filename. If not provided, will extract from URL
 */
export const downloadFileFromUrl = async (url: string, filename?: string) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to download file: ${response.statusText}`);
        }

        const blob = await response.blob();
        const fileName = filename || url.split('/').pop() || 'download';

        FileSaver.saveAs(blob, fileName);
    } catch (error) {
        console.error('Error downloading file:', error);
        // Fallback: try direct download link
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || url.split('/').pop() || 'download';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};