const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;

const db = require('./config/dbConfig');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'));


app.get('/', async (req, res) => {                // Display all the contacts
    try {
        const contacts = await Contact.find({});
        return res.render('home', {
            title: 'Contact List',
            contact_list: contacts
        });
    } catch (error) {
        console.log("error in fetching data");
    }
});



app.post('/add-contact', async (req, res) => {     // Add contact to the Database
    try {
        const response = await Contact.create(req.body);
    } catch (error) {
        console.log(error); 
    }

    return res.redirect('back');
});


app.get('/delete-contact/user', async (req, res) => {       // delete contact from database
    try {
        await Contact.findByIdAndRemove(req.query.id);
        return res.redirect('back');
    } catch (error) {
        console.log("error in deleting contact")
    } 
})



app.listen(PORT, async () => {
    console.log(`Server started on PORT: ${PORT}`);
    
});