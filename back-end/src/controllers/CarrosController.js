const connection = require('../config/connection');

function listarCarros(req, res) {
    if(connection) {
        let sql = "SELECT * FROM CARROS";
        connection.query(sql, (err, carros) => {
            if(err) 
                res.json(err);
            else {
                console.log(carros);
                res.json(carros);
            }
        });
    }
}

function insertarCarro(req, res){
    if(connection){
        console.log(req.body);
        const carro = req.body;

        if(!carro.modelo){
            return res.status(400).send({error: true, mensaje: "El modelo del carro es obligatorio"});
        }

        if(carro.modelo && carro.modelo.length > 50){
            return res.status(400).send({error: true, mensaje: "El campo de modelo debe contener como máximo 50 caracteres"});
        }

        if(!carro.marca){
            return res.status(400).send({error: true, mensaje: "La marca del carro es obligatoria"});
        }
        if(carro.marca && carro.marca.length > 60){
            return res.status(400).send({error: true, mensaje: "El campo de marca debe contener como máximo 60 caracteres"});
        }
        if(carro.año && carro.año.length !== 4){
            return res.status(400).send({error: true, mensaje: "El campo de año debe ser de 4 carcateres"});
        }

        if(carro.color && carro.color.length > 20){
            return res.status(400).send({error: true, mensaje: "El campo de color debe contener como máximo 20 caracteres"});
        }

        //Lo hice con esta sintaxis porque si lo agrego directo me marca error porque no pongo el id por alguna razón,
        //aunque ya sé que se puede usar el ?
        let sql = "INSERT INTO CARROS (Modelo, Marca, Año, Color) VALUES ('" 
        + carro.modelo + "', '" + carro.marca + "', " + carro.año + ", '" + carro.color + "')";

    
        connection.query(sql, [carro], (err, data) => {
            if(err){
                console.log(err);
            } else {
            
                res.json({error: false, data, mensaje: "Carro agregado con exito."});
            }
        })
    }
}

module.exports = {
    listarCarros,
    insertarCarro
}