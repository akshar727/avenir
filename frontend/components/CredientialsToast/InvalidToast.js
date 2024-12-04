import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
// import "./InvalidToast.css";

const InvalidToast = ({ openVr, setOpenSt, text }) => {
  return (
    <Toast.Provider swipeDirection="up" swipeThreshold={10} label={"Invalid Credentials"}>

      <Toast.Root className="InvalidToastRoot" duration={3000} open={openVr} onOpenChange={setOpenSt}>
        <Toast.Description className="InvalidToastTitle">{text}</Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="InvalidToastViewport" />
    </Toast.Provider>
  );
};
export default InvalidToast;