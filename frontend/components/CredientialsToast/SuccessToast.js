import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
// import "./SuccessToast.css";

const SuccessToast = ({ openVr, setOpenSt, text}) => {
  return (
    <Toast.Provider swipeDirection="up" swipeThreshold={10} label={"Success"}>

      <Toast.Root className="SuccessToastRoot" duration={3000} open={openVr} onOpenChange={setOpenSt}>
        <Toast.Description className="SuccessToastTitle">{text}</Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="SuccessToastViewport" />
    </Toast.Provider>
  );
};
export default SuccessToast;