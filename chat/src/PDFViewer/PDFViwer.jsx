import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const PDFViewer = ({ open, setOpen, sources, timing, pdfDetails }) => {
    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const targetPage = pdfDetails.page || 1;
    console.log('sources from PDFVIWER', pdfDetails);


    useEffect(() => {
        if (numPages && targetPage) {
            const element = document.getElementById(`page_${targetPage}`);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            }
        }
    }, [numPages, targetPage]);

    // Hardcoded PDF URL
    // const pdfUrl = `${import.meta.env.VITE_BACKEND_URL}/api/pdf?path=${encodeURIComponent(pdfDetails?.fileName)}`;
    console.log('pdfDetails?.fullpath;', pdfDetails?.fullpath);


    const fullPath = pdfDetails?.fullpath;
    // Extract only the filename: "sample.pdf"
    const filename = fullPath?.split(/[/\\]/).pop();
    // Extract directory path WITHOUT filename: "C:/Users/LDNA40015/Documents/ChatDoc"
    const directory = fullPath?.replace(/[/\\][^/\\]+$/, "");
    // Send BOTH to API
    const pdfUrl = `${import.meta.env.VITE_BACKEND_URL}/api/pdf?directory=${encodeURIComponent(directory)}&filename=${encodeURIComponent(filename)}`;



    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div>
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-2 right-2 text-gray-600 hover:text-blue-600 transition cursor-pointer"
                    >
                        <CloseIcon />
                    </button>

                    <div>
                        <p className="font-bold mb-1">PDF Preview: {pdfDetails?.file}</p>

                        <div className="border border-gray-300 w-[100%] rounded max-h-[80dvh] overflow-auto flex justify-center">
                            <Document
                                file={pdfUrl}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={<p className="p-4">Loading PDF...</p>}
                                error={<p className="p-4 text-red-500">Failed to load PDF.</p>}
                            >
                                {Array.from(new Array(numPages), (el, index) => (
                                    <div key={`page_wrapper_${index + 1}`} id={`page_${index + 1}`}>
                                        <Page pageNumber={index + 1} />
                                    </div>
                                ))}
                            </Document>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default React.memo(PDFViewer);