import { X } from "lucide-react";
import Image from "next/image";
import * as pdfjsLib from "pdfjs-dist/webpack";
import React, { useEffect, useState } from "react";

const DocumentPreview = ({
  file,
  clearFile,
  handleClick,
  small = false,
}: {
  file: File;
  clearFile?: () => void;
  handleClick?: () => void;
  small?: boolean;
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const loadPdf = async () => {
      const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext("2d")!;
      await page.render({ canvasContext: context, viewport }).promise;

      setImageSrc(canvas.toDataURL());
    };

    if (file?.type === "application/pdf") {
      loadPdf();
    }
  }, [file]);

  if (file?.type === "application/pdf") {
    return (
      <div
        className="relative"
        onClick={() => {
          if (handleClick) {
            handleClick();
          }
        }}
      >
        <div className={`relative ${small ? "w-32 h-48" : "w-52 h-72"}`}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="PDF Preview"
              fill
              className="w-full h-full object-contain drop-shadow-xl hover:scale-105 hover:transition-transform"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 animate-pulse" />
          )}
        </div>

        {!!clearFile && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearFile();
            }}
            className="absolute -top-2 -right-2 bg-gray-300 text-white w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-600"
          >
            <X size={14} />
          </button>
        )}
      </div>
    );
  }

  if (
    file?.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return (
      <div className="w-52 h-72 flex flex-col p-2 items-center justify-center drop-shadow-xl border border-slate-100 rounded-md bg-white">
        <p className="text-gray-600 font-bold text-center">{file.name}</p>
      </div>
    );
  }

  return null;
};

export default React.memo(DocumentPreview);
