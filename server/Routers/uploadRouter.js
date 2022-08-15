import {Router} from 'express'
import multer from 'multer'


const router = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
router.post("/", upload.single("file", (req, res, next)=> {
 try {
    return res.status(200).json({message:"file uploaded"})
 } catch (error) {
    res.send(error)
 }
}));


export default router;