import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

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

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <div className="overflow-y-auto max-h-[300px]">
            {Array.isArray(sources) && sources?.length > 0 && (
              <>
                <p className="font-bold mb-1">Sources</p>
                {sources.map((src, index) => (
                  <div
                    key={index}
                    className="border border-blue-200 rounded-lg p-2 bg-blue-50 shadow-sm mb-2"
                  >
                    <p><span className="font-medium">File Name:</span> {src?.file || 'Unnamed Source'}</p>
                    <p><span className="font-medium">Page No:</span> {src?.page || 'Unknown Page'}</p>
                  </div>
                ))}
              </>
            )}
          </div>
          <br />
          <div>
            <p className="font-bold mb-1">Timing</p>
            <ul className="list-disc pl-5 text-sm">
              <li>Embedding Retrieval : {timing?.embedding_retrieval}</li>
              <li>LLM Response : {timing?.llm_response}</li>
              <li>Total : {timing?.total}</li>
            </ul>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
export default ModalComponent;
