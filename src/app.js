const express = require("express");
const { create } = require("express-handlebars");
const http = require("http");
const path = require("path");
const productsRouter = require("./routes/products.routes");
const cartsRouter = require("./routes/carts.routes");
const productService = require("./services/productService");

const app = express();
const server = http.createServer(app);
const PORT = 8080;

const hbs = create({
  layoutsDir: path.join(__dirname, "views/layouts"), 
  defaultLayout: "main",
  extname: ".handlebars",
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/", (req, res) => {
  res.render("inicio"); 
});

app.get("/productos", async (req, res) => { 
  try { 
    const products = await productService.getAllProducts(); 
    console.log(products); 
    res.render("home", { products }); 
  } catch (error) { 
    console.error("Error al obtener los productos:", error); 
    res.status(500).send("Error al obtener los productos"); 
  } 
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const connectDB = require('./db');
connectDB();

