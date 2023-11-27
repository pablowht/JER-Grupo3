class CameraMovement {
    cam;
    constructor(escena){
        this.cam = escena.cameras.main;
        this.cam.setBounds(0,0,1600,380);
    }

    moveCameraFunction(){
        this.cam.scrollX += 0.5;
    }

    getScrollCam(){
        return this.cam.scrollX;
    }
}

