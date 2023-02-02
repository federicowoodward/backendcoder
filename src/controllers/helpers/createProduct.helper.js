export default function createdProduct(product) {
    const productToCreate = {
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: Number(product.precio),
        stock: Number(product.stock),
    }
    return productToCreate; 
}