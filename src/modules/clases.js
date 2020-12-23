const Persona = class {
    constructor(name) {
        this.name = name,
        this.carrito = [];
    }

    agregarCarro(list) {
        this.carrito.push(list);
    }

    obtenerCarrito(){
        return this.carrito;
    }
    
    inicializarCarrito(){
        this.carrito = [];
    }

}
export {Persona};