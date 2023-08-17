import { db } from "../db.js";
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
       data,
     });
  });

    
  
};


export const getPost = (req, res) => {


  const q= "SELECT `username`, `title`, `descr`,`cat`,`date` FROM users JOIN posts ON users.id = posts.uid WHERE posts.id = ? "

  db.query(q,[req.params.id *1],(err,data)=>{
     if (err) {
       return res.status(400).json({
         status: "fail",
         mesage: err,
       });
     }

     return res.status(200).json({
       status: "status",
       data
     });
    
  })
 
};
export const addPost = (req, res) => {
  res.json({
    status: "status",
    mesage: "connected",
  });
};
export const deletePost = (req, res) => {
  res.json({
    status: "status",
    mesage: "connected",
  });
};
export const updatePost = (req, res) => {
  res.json({
    status: "status",
    mesage: "connected",
  });
};