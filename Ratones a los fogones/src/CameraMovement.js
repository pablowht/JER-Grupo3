class CameraMovement {
    constructor(escena){
        this.cam = escena.cameras.main;
        this.cam.setBounds(-2000,-185,5270,1080);//3350
    }
    moveCameraFunction(){
        this.cam.scrollX += 1;
    }

    getScrollCam(){
        return this.cam.scrollX;
    }

}

