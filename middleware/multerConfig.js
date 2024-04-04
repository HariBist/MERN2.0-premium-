const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        const validateFileType =['image/png','image/jpeg','image/jpg']
        // const fileSize = 409600;
    if(!validateFileType.includes(file.mimetype)){
            cd(new Error("This file Type is not supported")) //cb (error)
            return
        }
        //       else if(file.size>=fileSize){                                               
        //     cd(new Error("image should be less than 400kb"))
        //     return
        // }
cb(null,'./storage')  //--> cb(error,success)
    },
    filename : function(req,file,cb){
        cb(null,Date.now()+"_" + file.originalname)
    }
})

module.exports = {
    storage: storage,
multer
}