const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const Admin = require('./models/Admin');
const User = require('./models/User');
const Event = require('./models/Event');
const Sponsor = require('./models/Sponsor');
const Review = require('./models/Review');
const Post = require('./models/Post');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "oaisdfpohwiausgofig2ofgaowhuidhooaiu";

app.use(express.json());
app.use(CookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('this is a test');
})

app.post('/admin-register', async (req, res) => {
    const { name, email, password, role, avatar } = req.body;
    try {
        const userDoc = await Admin.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
            role,
            avatar,
        });

        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    const userDoc = await Admin.findOne({ email });
    if (userDoc) {
        const passOK = bcrypt.compareSync(password, userDoc.password);
        if (passOK) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
})
app.post('/api/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.get('/api/admin', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, role, avatar, _id } = await Admin.findById(userData.id);
            res.json({ name, email, role, avatar, _id });
        });
    } else {
        res.json(null);
    }
});
app.post('/api/user-register', async (req, res) => {
    const { user_name, user_email, user_avatar, password } = req.body;
    const exist = await User.findOne({ user_email });
    if (!exist) {
        try {
            const userDoc = await User.create({
                user_name,
                user_email,
                password: bcrypt.hashSync(password, bcryptSalt),
                user_avatar,
            });
            res.json(userDoc);
        } catch (e) {
            res.status(422).json(e);
        }
    } else {
        res.json('exist');
    }
});
app.post('/api/user-login', async (req, res) => {
    const { user_email, password } = req.body;
    const userDoc = await User.findOne({ user_email });
    if (userDoc) {
        const passOK = bcrypt.compareSync(password, userDoc.password);
        if (passOK) {
            jwt.sign({
                email: userDoc.user_email,
                id: userDoc._id,
            }, jwtSecret, {}, (err, usertoken) => {
                if (err) throw err;
                res.cookie('usertoken', usertoken).json(userDoc);
            });
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
})
app.post('/api/user-logout', (req, res) => {
    res.cookie('usertoken', '').json(true);
});

app.get('/api/user', (req, res) => {
    const { usertoken } = req.cookies;
    if (usertoken) {
        jwt.verify(usertoken, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { user_name, user_email, user_avatar, _id } = await User.findById(userData.id);
            res.json({ user_name, user_email, user_avatar, _id });
        });
    } else {
        res.json(null);
    }
});

const avatarMiddleware = multer({ dest: 'uploads/avatar/' });
app.post('/upload-avatar', avatarMiddleware.single('avatar'), (req, res) => {
    const uploadedFiles = [];
    const { path, originalname, filename } = req.file;
    const parts = originalname.split('.');
    const newname = "avatar" + Date.now();
    const ext = parts[parts.length - 1];
    const newPath = path.replace(filename, newname) + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads\\avatar\\', ''))
    res.json(uploadedFiles);
});

const coverMiddleware = multer({ dest: 'uploads/cover/' });
app.post('/api/upload-cover', coverMiddleware.single('cover'), (req, res) => {
    const uploadedFiles = [];
    const { path, originalname, filename } = req.file;
    const parts = originalname.split('.');
    const newname = "cover" + Date.now();
    const ext = parts[parts.length - 1];
    const newPath = path.replace(filename, newname) + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads\\cover\\', ''))
    res.json(uploadedFiles);
});

const photoMiddleware = multer({ dest: 'uploads/photos' });
app.post('/api/upload-photos', photoMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const newname = "eventphoto" + Date.now();
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\photos\\', ''));
    }
    res.json(uploadedFiles);
});

const blogImgMiddleware = multer({ dest: 'uploads/blog/' });
app.post('/api/upload-blog-img', blogImgMiddleware.single('blog-img'), (req, res) => {
    const uploadedFiles = [];
    const { path, originalname, filename } = req.file;
    const parts = originalname.split('.');
    const newname = "blogimg" + Date.now();
    const ext = parts[parts.length - 1];
    const newPath = path.replace(filename, newname) + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads\\blog\\', ''))
    res.json(uploadedFiles);
});

app.post('/api/event', (req, res) => {
    const { usertoken } = req.cookies;
    const {
        eventTitle, eventLocation, eventDesc, eventCategory,
        eventPhotos, eventCover, eventSponsored,
        eventParticipants, eventStartTime, eventEndTime,
    } = req.body;
    jwt.verify(usertoken, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const eventDoc = await Event.create({
            user: userData.id,
            eventTitle, eventLocation, eventDesc, eventCategory,
            eventPhotos, eventCover, eventSponsored,
            eventParticipants, eventStartTime, eventEndTime,
        });
        res.json(eventDoc);
    });
})
app.put('/api/event', async (req, res) => {
    const { status, event } = req.body;
    if (event) {
        res.json(await Event.findOneAndUpdate({ _id: event }, { "$set": { "eventStatus": status } }))
    }
});
app.get('/api/places/:id', async (req, res) => {
    const { id } = req.params;
    const query = { user: id }
    res.json(await Event.find(query).populate('user'));
});
app.get('/api/places', async (req, res) => {
    res.json(await Event.find().populate('user'));
});
app.get('/api/event/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Event.findById(id).populate('user').populate('participants'));
});
app.get('/api/usersEvent', async (req, res) => {
    res.json(await Event.find());
});
app.get('/api/users', async (req, res) => {
    res.json(await User.find());
});
app.get('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await User.findById(id));
});
app.put('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    const { usertoken } = req.cookies;
    const { uid } = req.body;

    jwt.verify(usertoken, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        if (userData) {
            res.json(await User.findOneAndUpdate({ _id: id }, { "$push": { "follower": uid } }, { "new": true, "upsert": true }))
        }
    })
});
app.post('/api/sponsor', async (req, res) => {
    const {
        user, event, wish, sponsorAmount,
    } = req.body;
    const sponsorDoc = await Sponsor.create({
        user, event, wish, sponsorAmount,
    });
    res.json(sponsorDoc);
})
app.get('/api/sponsor/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Sponsor.find({ event: id }).populate('user'));
});
app.get('/api/sponsor', async (req, res) => {
    res.json(await Sponsor.find().populate('user'));
});
app.put('/api/participant', async (req, res) => {
    const { participants, event } = req.body;
    if (participants) {
        res.json(await Event.findOneAndUpdate({ _id: event }, { "$push": { "participants": participants } }, { "new": true, "upsert": true }))
    }
});
app.post('/api/review', async (req, res) => {
    const {
        user, event, review, rating,
    } = req.body;
    const reviewDoc = await Review.create({
        user, event, review, rating,
    });
    res.json(reviewDoc);
});
app.get('/api/review', async (req, res) => {
    res.json(await Review.find().populate('user')
        .populate('event'));
});
app.get('/api/review/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Review.find({ event: id }).populate('user'));
});

app.post('/api/blog', (req, res) => {
    const { usertoken } = req.cookies;
    const {
        event, user, postTitle, postCategory, postContent, postCover,
    } = req.body;
    jwt.verify(usertoken, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const postDoc = await Post.create({
            event, user, postTitle, postCategory, postContent, postCover,
        });
        res.json(postDoc);
    });
})
app.get('/api/blog', async (req, res) => {
    res.json(await Post.find().populate('event').populate('user'));
});
app.get('/api/blog/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Post.findById(id).populate('event').populate('user'));
});
app.put('/api/user', async (req, res) => {
    const { usertoken } = req.cookies;
    const {
        user_name, user_email,
        user_avatar, user_cover,
        user_desc,
        about, website, contact, social } = req.body;

    jwt.verify(usertoken, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        console.log(userData);
        const userDoc = await User.findById(userData.id);
        if (userData) {
            userDoc.set({
                user_name, user_email,
                user_avatar, user_cover,
                user_desc,
                about, website, contact, social
            })
            await userDoc.save();
            res.json('ok');
        }
    })
});

app.listen(4000);