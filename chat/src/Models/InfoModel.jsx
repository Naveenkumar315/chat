
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};



const InfoModel = ({infoModel, setInfoModel}) => {

    return (<>
    <Modal
      open={infoModel.open}
      onClose={() => setInfoModel({open:false})}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <button
            onClick={() => setInfoModel({open:false})}
            className="absolute top-2 right-2 text-gray-600 hover:text-blue-600 transition cursor-pointer"
          >
            <CloseIcon />
          </button>
          <div>
            Content Here
          </div>
        </div>
      </Box>
    </Modal>
    </>)
}

export default InfoModel;