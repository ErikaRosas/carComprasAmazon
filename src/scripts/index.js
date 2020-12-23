import '../styles/index.scss';
import {Persona} from '../modules/clases.js';

const Path = require('path');
var fileRutaJson = Path.resolve(__dirname, '../src/product.json');
var productos = [];
var filterListProductos = null;
var tablaProductos  = document.getElementById("tablaProductos");
var person1 = new Persona("anonimo"); // solo un usuario
var tablaCarrito  = document.getElementById("tablaCarrito");


    function traerDatos(){
        const archivoJson = new XMLHttpRequest();
        archivoJson.open('GET',fileRutaJson,true);
        archivoJson.send();
        archivoJson.onreadystatechange = function(){
            if(this.readyState == 4  && this.status ==200){
                productos = JSON.parse(this.responseText);
            }
        } 
    }

    traerDatos();
    
    export function  pintarTablaIncial (){
        deleteTabla(tablaProductos);
        pintarDatosEntabla(productos);
    }

    export function pintarCarrito(list) {
        
        // Cremos contenido tablas 
        list.forEach((p, index) => {
            let fila =  document.createElement("tr");
            // id
            let celda =  document.createElement("td");
            let valorCelda = document.createTextNode(index+1);
            celda.appendChild(valorCelda);
            fila.appendChild(celda);

            // productos 
            celda =  document.createElement("td");
            valorCelda = document.createTextNode(p.name);
            celda.appendChild(valorCelda);
            fila.appendChild(celda);

            // costo
            celda =  document.createElement("td");
            valorCelda = document.createTextNode(p.costo);
            celda.appendChild(valorCelda);
            fila.appendChild(celda);

            // categoria
            celda =  document.createElement("td");
            valorCelda = document.createTextNode(p.categoria);
            celda.appendChild(valorCelda);
            fila.appendChild(celda);

            tablaCarrito.appendChild(fila);
        });

        tablaCarrito.setAttribute("border", "1");
        
    }
    export function pintarDatosEntabla(list) {
        
        // Cremos contenido tablas 
        list.forEach((p, index) => {
            let fila =  document.createElement("tr");
            // id
            let celda =  document.createElement("td");
            let valorCelda = document.createTextNode(index+1);
            celda.appendChild(valorCelda);
            fila.appendChild(celda);

            // productos 
            celda =  document.createElement("td");
            valorCelda = document.createTextNode(p.name);
            celda.appendChild(valorCelda);
            fila.appendChild(celda);

            // costo
            celda =  document.createElement("td");
            valorCelda = document.createTextNode(p.costo);
            celda.appendChild(valorCelda);
            fila.appendChild(celda);

            // categoria
            celda =  document.createElement("td");
            valorCelda = document.createTextNode(p.categoria);
            celda.appendChild(valorCelda);
            fila.appendChild(celda);

            // piezas
            celda =  document.createElement("td");
            valorCelda = document.createTextNode(p.piezas);
            celda.appendChild(valorCelda);
            fila.appendChild(celda);
           
            // boton agregar a carrito 
            celda =  document.createElement("td");
            let boton =  document.createElement("input");
            boton.type = 'button';
            boton.name = 'agregarCarrito';
            boton.value = 'agregarCarrito';
            boton.title = "Agregar a Carrito";
            boton.addEventListener("click", function(){agregarCarrito(p)}, false);
            boton.className ="btn btn-outline-success";
            celda.appendChild(boton);
            fila.appendChild(celda);

            tablaProductos.appendChild(fila);
        });

        tablaProductos.setAttribute("border", "1");
    }


    function deleteTabla(tabla){
        var tableRows = tabla.getElementsByTagName('tr');
        var rowCount = tableRows.length;

        for (var x=rowCount-1; x>0; x--) {
            tabla.removeChild(tableRows[x]);
        }
    }

    function agregarCarrito(product){
        person1.agregarCarro(product);
        deleteTabla(tablaCarrito);
        pintarCarrito(person1.obtenerCarrito());
    }

    export function comprarCarrito(){
        eliminarProductoComprado(person1);

    }
    function eliminarProductoComprado(person) {
        let carrito = person.obtenerCarrito();
       
        
       productos.forEach((p, index) => {
           carrito.forEach((c, index) => {
                if(p.name === c.name){
                    p.piezas =  p.piezas-1;
                }
            })
        });
        person.inicializarCarrito();
        deleteTabla(tablaCarrito);
        pintarCarrito(person.obtenerCarrito());
        pintarTablaIncial();
    }

    export function filtarBusqueda(numeroFiltro){
        switch (numeroFiltro) {
            case 0: // por nombre
                
                filterListProductos = productos.filter(
                    element =>{
                        return element.name === document.getElementById("nombreProducto").value;
                    }
                );
                if(filterListProductos != null){
                    deleteTabla(tablaProductos);
                    pintarDatosEntabla(filterListProductos);
                }else{
                    alert("Error no existen valores con esa informacion");
                }
                filterListProductos = null;  
                break;
            case 1:

                filterListProductos = productos.filter(
                    element =>{
                        return element.costo == document.getElementById("costoProducto").value;   
                    }
                );
                if(filterListProductos != null){
                    deleteTabla(tablaProductos);
                    pintarDatosEntabla(filterListProductos);
                }else{
                    alert("Error no existen valores con esa informacion");
                }
                filterListProductos = null; 
              break;
            case 2:
                filterListProductos = productos.filter(
                    element =>{
                        return element.categoria === document.getElementById("categoriaProducto").value;
                    }
                );
                if(filterListProductos != null){
                    deleteTabla(tablaProductos);
                    pintarDatosEntabla(filterListProductos);
                }else{
                    alert("Error no existen valores con esa informacion");
                }
                filterListProductos = null; 
              break;
            default:
                alert("Error no existen valores con esa informacion");
              break;
        }
    }


    
    

    