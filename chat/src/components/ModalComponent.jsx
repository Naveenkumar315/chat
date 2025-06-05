import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PDFViewer from "../PDFViewer/PDFViwer";
import { useState } from "react";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  // height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ModalComponent = ({ open, setOpen, sources, timing }) => {

  const [openPdf, SetOpenPdf] = useState(false)
  const [pdfDetails, setPdfDetails] = useState({ pageNo: 1, path: "" })

  const openPdfModel = (path, pageNo) => {
    try {
      setPdfDetails({ pageNo: pageNo, path: path })
      SetOpenPdf(true)
    } catch (error) {
      console.error(`Error in OpenPdfModel: ${error}`);
    }
  }

  return (<>
    {(<Modal
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
          <div className="overflow-y-auto max-h-[300px]">
            <p className="font-bold mb-1">Sources</p>
            {Array.isArray(sources) && sources?.length > 0 && (
              <>
                {sources.map((src, index) => (
                  <div
                    key={index}
                    className="border border-blue-200 rounded-lg p-2 bg-blue-50 shadow-sm mb-2"
                  >
                    <p><span className="font-medium">File Name:</span> {src?.file || 'Unnamed Source'}</p>
                    <p><span className="font-medium">Page No:</span> {src?.page || 'Unknown Page'}</p>
                    <p><span className="font-medium">View PDF:</span> <button
                      onClick={() =>
                        openPdfModel(src?.file, src?.page)
                      }
                      type="button"
                      className="text-black z-50 cursor-pointer"
                    >
                      <PictureAsPdfIcon />
                    </button></p>
                  </div>
                ))}
              </>
            )}
          </div>

          <br />
          <div>
            <p className="font-bold mb-1">Timing</p>
            <ul className="list-disc pl-5 text-sm">
              <li>key search time : {timing?.['key search time']}</li>
              <li>search response time : {timing?.['search response time']}</li>
              <li>total time taken : {timing?.['total time taken']}</li>
            </ul>
          </div>
        </div>
      </Box>
    </Modal>)}
    {
      openPdf && (
        <PDFViewer
          open={openPdf}
          setOpen={SetOpenPdf}
          sources={[
            { file: "/25-02-0268A-360421.pdf", page: pdfDetails.pageNo },
          ]}
          timing={{
            "key search time": "120ms",
            "search response time": "300ms",
            "total time taken": "450ms",
          }}
        />
      )
    }


  </>);
};
export default ModalComponent;
