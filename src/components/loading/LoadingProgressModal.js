import {DialogContent, DialogTitle, LinearProgress, Modal, ModalDialog} from "@mui/joy";
import * as React from "react";

export default function LoadingProgressModal({isLoading}){
    return(
        <Modal open={isLoading} >
            <ModalDialog variant="soft" color="primary" >
                <DialogTitle>로딩중...</DialogTitle>
                <DialogContent><LinearProgress size="lg" variant="solid"/></DialogContent>
            </ModalDialog>
        </Modal>
    )
}