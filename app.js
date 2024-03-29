const express = require('express');
const app = express();

 const connectToDatabase = require('./index.js');

const Book = require('./model/bookModel.js');

 app.use(express.json());//hamliey express lai json vanney record lai bujaa vaney ko
// app.use(express.urlencoded({extended: true}))  //node js batw backend garxaa veny yoo diney

connectToDatabase();

app.get("/",(req,res)=>{
    res.status(200).json({
        message : "Success"
    });
});

app.post("/book",async(req,res)=>{

    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication}=req.body
    await Book.create({
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication: publication
    })
    res.json({
        message:"Book Created Successfully"
    });
})

app.get("/book",async (req,res)=>{
    const books=await Book.find() //return in array
res.status(200).json({
    message:"book fatched successfully",
    data :books
    })
    })

    //single read
    app.get("/book/:id",async (req,res)=>{ //:id(: is to) is dynamic nature ko hunxaa 
    try{
            const id= req.params.id
        const book = await Book.findById(id) //retun object garxa
        if(!book){
            res.status(404).json({
                message: "Not found"
            })
        }
        else {
res.status(200).json({
message:"single Book fatched",
data : book
})
        }
    }
    catch(error){
        res.status(500).json({
            message:"something went wrong"
        })
    }
})



 app.listen(1200,()=>{
    console.log("nodejs serever has started at port 1200");
 });
