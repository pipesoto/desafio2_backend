
const fs = require('fs');

class ProductManager {
  constructor() {
    this.path = './index.txt';
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
  }

  generateId() {
    return this.products.length + 1;
  }

  addProduct(product) {
    const newProduct = {
      id: this.generateId(),
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock
    };

    this.products.push(newProduct);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);

    if (product) {
      return product;
    } else {
      throw new Error("Producto no encontrado");
    }
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex !== -1) {
      updatedFields.id = id;
      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
      this.saveProducts();
    } else {
      throw new Error("Producto no encontrado");
    }
  }

  deleteProduct(id) {
    const initialLength = this.products.length;
    this.products = this.products.filter(product => product.id !== id);

    if (initialLength === this.products.length) {
      throw new Error("Producto no encontrado");
    }

    this.saveProducts();
  }
}

// Caso de uso
const productManager = new ProductManager('./index.txt');

// Obtener productos (arreglo vacío)
const initialProducts = productManager.getProducts();
console.log("Productos iniciales:", initialProducts);

// Agregar un producto
productManager.addProduct({
  title: "producto ejemplo",
  description: "Este es un producto de ejemplo",
  price: 300,
  thumbnail: "Sin imagen",
  code: "cod123",
  stock: 12
});

// Obtener productos después de agregar un producto
const productsAfterAdd = productManager.getProducts();
console.log("Productos después de agregar uno:", productsAfterAdd);

// Obtener un producto por ID
const productIdToFind = 1; 
try {
  const foundProduct = productManager.getProductById(productIdToFind);
  console.log("Producto encontrado:", foundProduct);
} catch (error) {
  console.error(error.message);
}
 
// Actualizar un producto
const productIdToUpdate = 1; 
try {
  productManager.updateProduct(productIdToUpdate, { price: 250 });
  const updatedProduct = productManager.getProductById(productIdToUpdate);
  console.log("Producto actualizado:", updatedProduct);
} catch (error) {
  console.error(error.message);
}

//Eliminar un producto
const productIdToDelete = 1; 
try {
  productManager.deleteProduct(productIdToDelete);
  const productsAfterDelete = productManager.getProducts();
  console.log("Productos después de eliminar uno:", productsAfterDelete);
} catch (error) {
  console.error(error.message);
}
