class CameraMovement {
    constructor(escena){
        this.cam = escena.cameras.main;
        //this.cam.setBounds(0,0,1920,1080);
    }
    moveCameraFunction(){
        this.cam.scrollX += 0.5;
    }

    getScrollCam(){
        return this.cam.scrollX;
    }

}

