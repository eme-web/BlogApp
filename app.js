import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";


const database_uri = process.env.MONGODB_URI



const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."

const aboutContent = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."

const contactContent = "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

mongoose.connect(database_uri, {useNewUrlParser: true});

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);

//module.exports = mongoose.model('Post', postSchema)


app.get("/", async (req, res) => {
    const posts = await Post.find();
      res.render("home", {
        startingContent: homeStartingContent,
        posts

        });
});
  

app.get("/compose", function(req, res,) {
    res.render("compose")
});

app.post("/compose", async (req, res,) => {
    await new Post({ ...req.body }).save()
    res.status(200).json({
        message: 'Successful'
    })
});

app.get("/posts/", async (req, res) => {

    const post = await Post.find()
    res.render("postS", post);
});

app.get("/post/:postId", async (req, res) => {
    const requestedPostId = req.params.postId;

    const post = await Post.findById({_id: requestedPostId})
    res.render(`post`, {
        title: post.title,
        content: post.content
    });
});

app.get("/about", function(req, res,) {
    res.render("about", {aboutusContent:aboutContent})

});

app.get("/contact", function(req, res,) {
    res.render("contact", {contactusContent:aboutContent})

});



app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
