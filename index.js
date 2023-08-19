import  express  from "express";
import  morgan  from "morgan";
import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import cookieParser from "cookie-parser";
import multer from "multer";


const  app = express();

const port =  5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date().now+file.fieldname);
  },
});

const upload = multer({ storage: storage });


// const upload = multer({dest:'./uploads/'})


app.post('/api/v1/upload' ,upload.single('file'),(re,res)=>{
    const file = req.file

    res.status(200).json({
        status: 'success',
        message:' successfully uploaded',
        file:file.filename
    })

})


app.use('/api/v1/posts',postRoutes)
app.use('/api/v1/auth',authRoutes)

app.listen(port, () => console.log(`listening on port ${port}`));
