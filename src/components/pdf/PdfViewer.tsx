"use client";

import { useState, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Loader2,
  FileText,
  Printer,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Configure worker using unpkg CDN matching pdfjs version for zero bundler conflicts
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface PdfViewerProps {
  url: string;
  fileName?: string;
}

export default function PdfViewer({
  url,
  fileName = "Crown-Paints-Privacy-Notice.pdf",
}: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.15);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const updateWidth = () => {
      const w = window.innerWidth;
      if (w < 640) setScale(0.65);
      else if (w < 1024) setScale(0.9);
      else setScale(1.15);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Block copy shortcuts (Ctrl+C, Ctrl+P, Ctrl+S, etc.)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "p" || e.key === "s" || e.key === "u")) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setLoading(false);
      setError(false);
    },
    []
  );

  const onDocumentLoadError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  const prevPage = () => setPageNumber((p) => Math.max(p - 1, 1));
  const nextPage = () => setPageNumber((p) => Math.min(p + 1, numPages));
  const zoomIn = () => setScale((s) => Math.min(Number((s + 0.15).toFixed(2)), 2.5));
  const zoomOut = () => setScale((s) => Math.max(Number((s - 0.15).toFixed(2)), 0.5));
  const resetZoom = () => setScale(1.15);

  return (
    <div
      className="flex flex-col h-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-xs select-none"
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
    >
      {/* Clean Enterprise Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-20 gap-3 flex-wrap">
        {/* Document Title / Info */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#32298A]/08 text-[#32298A] flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                {fileName}
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                <Lock className="w-2.5 h-2.5 text-slate-400" />
                Protected View
              </span>
            </div>
            <p className="text-[10px] text-slate-500">
              Official Crown Paints Kenya PLC Publication
            </p>
          </div>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200">
          <button
            onClick={prevPage}
            disabled={pageNumber <= 1}
            className="w-7 h-7 rounded flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-2xs disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer disabled:cursor-not-allowed"
            title="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1 px-2 text-xs font-semibold text-slate-700">
            <span className="text-[#32298A] font-bold">{pageNumber}</span>
            <span className="text-slate-400">/</span>
            <span>{numPages || "..."}</span>
          </div>
          <button
            onClick={nextPage}
            disabled={pageNumber >= numPages || numPages === 0}
            className="w-7 h-7 rounded flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-2xs disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer disabled:cursor-not-allowed"
            title="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="w-7 h-7 rounded flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-2xs disabled:opacity-30 transition-all cursor-pointer disabled:cursor-not-allowed"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold text-slate-700 px-2 min-w-[48px] text-center font-mono">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            disabled={scale >= 2.5}
            className="w-7 h-7 rounded flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-2xs disabled:opacity-30 transition-all cursor-pointer disabled:cursor-not-allowed"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={resetZoom}
            className="w-7 h-7 rounded flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-2xs transition-all cursor-pointer"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Buttons: Inactive / Disabled */}
        <div className="flex items-center gap-2">
          {/* Print / Open Button (Inactive / Disabled) */}
          <button
            type="button"
            disabled
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-100 text-xs font-semibold text-slate-400 cursor-not-allowed opacity-60"
            title="Print is disabled for protected document"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print / Open</span>
          </button>

          {/* Download Button (Inactive / Disabled) */}
          <button
            type="button"
            disabled
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-400 text-xs font-bold cursor-not-allowed opacity-60"
            title="Download is disabled for protected document"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Viewer with copy prevention and text-layer disabled */}
      <div
        className="flex-1 overflow-auto bg-slate-200/70 p-4 sm:p-8 flex justify-center items-start min-h-[650px] select-none"
        style={{ userSelect: "none", WebkitUserSelect: "none" }}
      >
        {loading && !error && (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-600">
            <Loader2 className="w-8 h-8 animate-spin text-[#32298A]" />
            <p className="text-xs font-bold text-slate-700">
              Loading Crown Paints Kenya Document…
            </p>
          </div>
        )}

        {error && (
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-md text-center space-y-4 my-8">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Protected Document
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Crown Paints Kenya Privacy Notice is available for inline viewing only.
              </p>
            </div>
          </div>
        )}

        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading=""
          className={loading ? "hidden" : "flex flex-col items-center shadow-lg rounded pointer-events-none select-none"}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="rounded overflow-hidden bg-white select-none pointer-events-none"
          />
        </Document>
      </div>

      {/* Bottom pagination strip */}
      {numPages > 1 && !loading && (
        <div className="bg-white border-t border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-600">
          <span>
            Page {pageNumber} of {numPages}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={pageNumber <= 1}
              className="h-8 text-xs font-semibold cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5 mr-1" />
              Previous Page
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={pageNumber >= numPages}
              className="h-8 text-xs font-semibold cursor-pointer disabled:cursor-not-allowed"
            >
              Next Page
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
