const express = require("express");
const { create } = require("express-handlebars");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const productsRouter = require("./routes/products.routes");
const cartsRouter = require("./routes/carts.routes");
const productService = require("./services/productService");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 8080;

const hbs = create({
    layoutsDir: path.join(__dirname, "views/layouts"), 
    defaultLayout: "main",
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/", (req, res) => {
  const products = productService.getAllProducts();
  res.render("main", { products });
});

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.emit("productList", productService.getAllProducts());

  socket.on("addProduct", (productData) => {
    const newProduct = productService.addProduct(productData);
    io.emit("productList", productService.getAllProducts());
  });

  socket.on("deleteProduct", (productId) => {
    productService.deleteProduct(productId);
    io.emit("productList", productService.getAllProducts());
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});



/*const express = require("express");
const { create } = require("express-handlebars");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const productsRouter = require("./routes/products.routes");
const cartsRouter = require("./routes/carts.routes");
const productService = require("./services/productService");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 8080;

app.engine("handlebars", create().engine);
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/", (req, res) => {
  const products = productService.getAllProducts();
  res.render("home", { products });
});

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.emit("productList", productService.getAllProducts());

  socket.on("addProduct", (productData) => {
    const newProduct = productService.addProduct(productData);
    io.emit("productList", productService.getAllProducts());
  });

  socket.on("deleteProduct", (productId) => {
    productService.deleteProduct(productId);
    io.emit("productList", productService.getAllProducts());
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});*/
