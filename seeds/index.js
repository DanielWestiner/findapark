const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const park = require('../models/park');

mongoose.connect('mongodb://localhost:27017/find-a-park', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected.....ooooh yeah!");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await park.deleteMany({});
    for (let i = 0; i < 250; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new park({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})