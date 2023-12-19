class CameraMovement {
    constructor(escena){
        this.cam = escena.cameras.main;
        this.cam.setBounds(-2250,-185,5550,1080, true);
        this.cam.setBackgroundColor(0x442474)
    }
    moveCameraFunction(){
        this.cam.scrollX += 1.2;
    }

    getScrollCam(){
        return this.cam.scrollX;
    }


}

