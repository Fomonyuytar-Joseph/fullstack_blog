import { db } from "../db.js";
import jwt from 'jsonwebtoken'
export const getPosts = (req, res) => {


const q = req.query.cat
  ? "SELECT * FROM posts WHERE cat=?"
  : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
     if (err) {
       return res.status(400).json({
         status: "fail",
         mesage: err,
       });
     }

     res.status(200).json({
       status: "success",
       results:data.length,
       data,
     });
  });

    
  
};


export const getPost = (req, res) => {


  const q= "SELECT `posts.id` `username`, `title`, `descr`,`cat`,`date` FROM users JOIN posts ON users.id = posts.uid WHERE posts.id = ? "

  db.query(q,[req.params.id *1],(err,data)=>{
     if (err) {
       return res.status(500).json({
         status: "fail",
         mesage: err,
       });
     }

     return res.status(200).json({
       status: "status",
       results:data.length,
       data
     });
    
  })
 
};
export const addPost = (req, res) => {
   const token = req.cookies.access_token;

   if (!token) {
     return res.status(401).json({
       status: "fail",
       message: "not authenticated",
     });
   }

   jwt.verify(token, "jwtkey", (err, userInfo) => {
     if (err) {
       return res.status(403).json({
         status: "fail",
         message: "token is not valid",
       });
     }

    
     const q = "INSERT INTO  posts(`title`,`desc`,`img`,`cat`,`date`,`uid`) VALUES (?)";
const values =[
  req.body.title,
  req.body.desc,
  req.body.img,
  req.body.cat,
  req.body.date,
]

     db.query(q, [values], (err, data) => {
       if (err) {
         return res.status(500).json({
           status: "fail",
           message: "you can delete only your own post",
         });
       }
       return res.json({
         status: "success",
         messgae: "Post has been created successfully",
       });
     });
   });
  
  
};
export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  
  if(!token){
    return res.status(401).json({
      status:'fail',
      message:'not authenticated'
    })


  }

  jwt.verify(token, "jwtkey",(err,userInfo)=>{
    if(err){
      return res.status(403).json({
        status: "fail",
        message: "token is not valid",
      });
    }

    const postId=req.params.id;
    const q = 'DELETE FROM posts WHERE `id`= ? AND `uid` = ?'
    db.query(q,[postId, userInfo.id],(err,data)=>{
     if (err) {
       return res.status(403).json({
         status: "fail",
         message: "you can delete only your own post",
       });
     }
     return res.json({
      status: "success",
      messgae:'Post has been deleted successfully'
     })
    })

  });



 
};
export const updatePost = (req, res) => {
   const token = req.cookies.access_token;
     const postId = req.params.id;

   if (!token) {
     return res.status(401).json({
       status: "fail",
       message: "not authenticated",
     });
   }

   jwt.verify(token, "jwtkey", (err, userInfo) => {
     if (err) {
       return res.status(403).json({
         status: "fail",
         message: "token is not valid",
       });
     }

     const q =
       "UPDATE posts `title`=? , `desc`=? ,`img`=?,`cat`=? WHERE `ID`=? AND ` desc=? AND `uid`=?";
     const values = [
       req.body.title,
       req.body.desc,
       req.body.img,
       req.body.cat,
       req.body.date,
     ];

     db.query(q, [...values,postId,userInfo.id], (err, data) => {
       if (err) {
         return res.status(500).json({
           status: "fail",
           message: "you can update only your own post",
         });
       }
       return res.json({
         status: "success",
         message: "Post has been updated successfully",
       });
     });
   });
};