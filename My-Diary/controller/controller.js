const mongoose = require("mongoose");
exports.composeEntry = function (req, res) {
    const Diary = mongoose.model('Diary');
    const obj = new Diary({
        title: req.body.title,
        entry: req.body.post
    });
    obj.save();
    res.redirect("/");
};

exports.getDiaryItems = function (req, res) {
    const Diary = mongoose.model('Diary');
    Diary.find(function (err, posts) {
        if (err) {
            console.log(err);
        } else {
            const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
            res.render("home", { home_text: homeStartingContent, Posts: posts });
        }
    });
};

exports.checkItem = function (req, res) {
    const Diary = mongoose.model('Diary');
    const postId = req.params.id;
    Diary.findOne({ _id: postId }, function (err, post) {
        res.render("post", { Element: post });
    });
};