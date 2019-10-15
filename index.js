const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.use('/authors', require('./routes/authors'));
app.use('/posts', require('./routes/posts'));

app.listen(3000);