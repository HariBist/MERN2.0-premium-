const express = require('express');
const app = express();
const fs = require('fs')

 const connectToDatabase = require('./index.js');

const Book = require('./model/bookModel.js');

const {multer,storage} = require('./middleware/multerConfig.js')
const upload = multer({storage :storage})


 app.use(express.json());//hamliey express lai json vanney record lai bujaa vaney ko
// app.use(express.urlencoded({extended: true}))  //node js batw backend garxaa veny yoo diney

connectToDatabase();

app.get("/",(req,res)=>{
    res.status(200).json({
        message : "Success"
    });
});

app.post("/book",upload.single("image"),async(req,res)=>{
// console.log(req.file)
let fileName;
if(!req.file){
    fileName ="https://www.google.com/imgres?q=art%20gojo%20satoru&imgurl=https%3A%2F%2Flookaside.instagram.com%2Fseo%2Fgoogle_widget%2Fcrawler%2F%3Fmedia_id%3D3251073439500594868&imgrefurl=https%3A%2F%2Fwww.instagram.com%2Ffreiart_mjr%2Fp%2FC0eIhOfoYY-%2F&docid=qPCdGQb2rcOf3M&tbnid=G5KtDK-xGBQAOM&vet=12ahUKEwjwyq3H-KSFAxU5zDgGHaxFBjcQM3oECF0QAA..i&w=1440&h=1800&hcb=2&ved=2ahUKEwjwyq3H-KSFAxU5zDgGHaxFBjcQM3oECF0QAA"
}
else {
    fileName = "http://localhost:1200/" + req.file.filename
}

    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication}=req.body
    await Book.create({
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication: publication,
        imageUrl: fileName
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
        })


     app.delete("/book/:id"
     ,async (req,res)=>{
        const id = req.params.id
        const bookData = await Book.findById(id)
        if(req.file){
        const filePath = bookData.imageUrl
        const filePathLength = "http://localhost/1200/".length;
        const fileName = filePath.slice(filePathLength);
        const filePathDelete = 'storage/' +fileName
        fs.unlink(filePathDelete ,(err)=>
        {
            if(err){
                console.log(err)
            }
            else
            {
                console.log("file deleted successfully")
            }
        })
    }

       await Book.findByIdAndDelete(id)
       res.status(200).json({
        message:"Book Deleted Successfully"
       })
     })   




app.patch("/book/:id",upload.single('image'), async (req,res)=>{
    const id = req.params.id  //kun book update garney id ho vaney
    const{bookName,bookPrice,authorName,isbnNumber,publication,publishedAt}=req.body
    const oldDatas = await Book.findById(id)
    let fileName;
    if(req.file){
        // console.log(req.file)
        // console.log(oldDatas)
         const oldImagePath = oldDatas.imageUrl
         console.log(oldImagePath)
         const localHostUrlLength = "http://localhost:1200/".length
         const newOldImagePath = oldImagePath.slice(localHostUrlLength)
         console.log(newOldImagePath)
         fs.unlink('storage/'+ newOldImagePath,(err)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log("file Deleted successfully")
            }
         })
fileName = "http://localhost:1200/"+ req.file.filename
    }
    await Book.findByIdAndUpdate(id,{
        bookName: bookName,
        bookPrice:bookPrice,
        authorName: authorName,
        publication: publication,
        isbnNumber : isbnNumber,
        publishedAt: publishedAt,
        imageUrl :fileName
    })
    res.status(200).json({
        message:"Book update Successfully"
    })
})

app.use(express.static("./storage/"))

 app.listen(1200,()=>{
    console.log("nodejs serever has started at port 1200");
 });
