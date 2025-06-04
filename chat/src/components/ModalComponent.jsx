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
          {Array.isArray(sources) && sources?.length > 0 && (
            <>
              <p className="font-bold mb-1">Sources</p>
              <ul className="list-disc pl-5 text-sm">
                {sources.map((src, index) => (
                  <li key={index}>
                    {src?.file || 'Unnamed Source'}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <br />
        <div>
          <p className="font-bold mb-1">Timing</p>
          <ul className="list-disc pl-5 text-sm">
            <li>embedding_retrieval : {timing?.embedding_retrieval}</li>
            <li>llm_response : {timing?.llm_response}</li>
            <li>total : {timing?.total}</li>
          </ul>
        </div>

      </Box>
    </Modal>
  );
};
export default ModalComponent;
