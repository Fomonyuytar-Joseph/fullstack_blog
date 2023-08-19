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


const upload = multer({dest:'uploads/'})


app.post('/api/v1/upload' ,upload.single('file'),(re,res)=>{

    res.status(200).json({
        status: 'success',
        message:' successfully uploaded'
    })

})


app.use('/api/v1/posts',postRoutes)
app.use('/api/v1/auth',authRoutes)

app.listen(port, () => console.log(`listening on port ${port}`));
