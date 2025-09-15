import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string>("");

  // Debug logging
  console.log(
    "FileUploader render - selectedFile:",
    selectedFile?.name || "null"
  );

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[], event: any) => {
      // Stop event propagation to prevent bubbling
      event?.stopPropagation();
      event?.preventDefault();

      // Clear any previous errors
      setUploadError("");

      // Ensure only one file is processed (extra safety)
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]; // Always take only the first file
        console.log("📁 Setting selected file:", file.name);
        setSelectedFile(file);
        if (onFileSelect) {
          console.log("📤 Calling onFileSelect with:", file.name);
          onFileSelect(file);
        }

        // Always log for debugging (temporarily)
        console.log(
          `✅ File accepted: ${file.name}, Size: ${formatSize(file.size)}, Type: ${file.type}`
        );
        console.log("Selected file state:", file);
        console.log("Setting selectedFile state to:", file.name);

        if (acceptedFiles.length > 1) {
          console.warn(
            `⚠️ Multiple files dropped, only processing first file: ${file.name}`
          );
        }
      }
    },
    []
  );

  const onDropRejected = useCallback((rejectedFiles: any[], event: any) => {
    // Stop event propagation to prevent bubbling
    event?.stopPropagation();
    event?.preventDefault();

    // Always log for debugging (temporarily)
    console.log("❌ Files rejected:", rejectedFiles);
    console.log(
      "Rejection reasons:",
      rejectedFiles.map((f) => f.errors)
    );

    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      const errors = rejection.errors || [];

      if (errors.some((e: any) => e.code === "file-too-large")) {
        setUploadError(
          `File is too large. Maximum size: ${formatSize(20 * 1024 * 1024)}`
        );
      } else if (errors.some((e: any) => e.code === "file-invalid-type")) {
        setUploadError(
          "Invalid file type. Only PDF, DOC, and DOCX files are allowed."
        );
      } else {
        setUploadError("File upload failed. Please try again.");
      }
    }
  }, []);

  const removeFile = (e?: React.MouseEvent) => {
    // Stop event propagation to prevent triggering dropzone
    e?.stopPropagation();
    e?.preventDefault();

    setSelectedFile(null);
    setUploadError("");
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    onDropRejected: onDropRejected,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
    maxSize: 20 * 1024 * 1024, // 20MB limit
  });

  return (
    <div className="w-full">
      {/* Show Upload Area ONLY when no file is selected */}
      {!selectedFile && (
        <div className="gradient-border">
          <div
            {...getRootProps()}
            className={`space-y-4 cursor-pointer p-8 rounded-2xl text-center transition-all duration-300 ${
              isDragActive
                ? "bg-green-50 border-green-300"
                : "bg-white/50 backdrop-blur-sm hover:bg-white/70"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <img src="/images/pdf.png" alt="upload" className="size-20" />
              <div className="text-center">
                {isDragActive ? (
                  <p className="text-lg font-semibold text-green-600">
                    Drop your resume here!
                  </p>
                ) : (
                  <>
                    <p className="text-lg font-semibold">
                      Drag & drop your resume here
                    </p>
                    <p className="text-gray-600">or click to browse files</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Supports PDF, DOC, DOCX (Max:{" "}
                      {formatSize(20 * 1024 * 1024)})
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show Selected File Display ONLY when file is selected */}
      {selectedFile && (
        <div className="gradient-border">
          <div className="p-6 bg-green-50/90 backdrop-blur-sm rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src="/images/pdf.png" alt="file" className="size-12" />
                <div>
                  <p className="font-bold text-green-800 text-lg">
                    {selectedFile.name}
                  </p>
                  <p className="text-green-600">
                    {formatSize(selectedFile.size)} • {selectedFile.type}
                  </p>
                  <p className="text-sm text-green-500 mt-1">
                    ✅ File ready for analysis
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={removeFile}
                  className="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors font-semibold"
                  title="Remove file and upload different one"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {uploadError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-semibold">❌ {uploadError}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
