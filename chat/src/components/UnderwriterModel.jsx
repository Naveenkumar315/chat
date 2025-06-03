// import React, { useState } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
// } from "@mui/material";
// import Button from "./Button";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   borderRadius: 2,
//   boxShadow: 24,
//   p: 4,
// };

// const MyModal = (props) => {
//   const {
//     open,
//     handleClose,
//     selectedOption,
//     handleOptionChange,
//     model_1_Cancel,
//     model_1_Okay,
//   } = props;

  

//   return (
//     <div>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography
//             id="modal-modal-title"
//             variant="h6"
//             component="h2"
//             gutterBottom
//           >
//             Choose an Option
//           </Typography>

//           <FormControl>
//             <RadioGroup
//               name="options"
//               value={selectedOption}
//               onChange={handleOptionChange}
//             >
//               <FormControlLabel
//                 value="dscr rules"
//                 control={<Radio />}
//                 label="DSCR Rules"
//               />
//               <FormControlLabel
//                 value="fannie mae rules"
//                 control={<Radio />}
//                 label="Fannie Mae Rules"
//               />
//             </RadioGroup>
//           </FormControl>

//           <Box
//             sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}
//           >
//             <Button variant="secondary" onClick={model_1_Cancel}>
//               Cancel
//             </Button>
//             <Button variant="primary" onClick={model_1_Okay}>
//               Okay
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default MyModal;
