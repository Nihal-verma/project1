const multer = require("multer")
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})
const upload = multer({
    storage:storage
}).fields([{name:"productImage",maxCount:10},{name:"pdf",maxCount:10},{name:"front_image",maxCount:10}])
// .array("productImage",10)

module.exports = {upload}