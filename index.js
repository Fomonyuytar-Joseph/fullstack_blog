import  express  from "express";
import  morgan  from "morgan";
import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'


const  app = express();

const port =  5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));


app.use('/api/v1/posts',postRoutes)
app.use('/api/v1/auth',authRoutes)

app.listen(port, () => console.log(`listening on port ${port}`));
