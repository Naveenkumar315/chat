import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set worker for react-pdf
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

const PDFViewer = ({ open, setOpen, sources, timing }) => {
    const [numPages, setNumPages] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };
    const targetPage = sources?.[0]?.page || 1;
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


    const defaultFile = sources?.[0]?.file || null;

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        // style={{ zIndex: 1400 }}
        // disableEnforceFocus
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
                        <p className="font-bold mb-1">PDF Preview</p>
                        {selectedFile || defaultFile ? (
                            <div className="border border-gray-300 rounded max-h-[80dvh] overflow-auto flex justify-center ">
                                // Inside your JSX
                                <Document
                                    file={selectedFile || defaultFile}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    loading={<p className="p-4">Loading PDF...</p>}
                                    error={<p className="p-4 text-red-500">Failed to load PDF.</p>}
                                >
                                    {Array.from(new Array(numPages), (el, index) => (
                                        <div key={`page_wrapper_${index + 1}`} id={`page_${index + 1}`}>
                                            <Page
                                                pageNumber={index + 1}
                                                width={600}
                                            />
                                        </div>
                                    ))}
                                </Document>

                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No PDF selected</p>
                        )}
                    </div>

                </div>
            </Box>
        </Modal>
    );
};

export default PDFViewer;
