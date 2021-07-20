const { MockService } = require('../services/Mock.service');
const mockService = new MockService();

const validateFields = (req, res, next) => {
    const { sueldo, dni } = req.query;

    // validar el ingreso de los campos
    if(!sueldo) {
        return res.status(400).json({
            status: 400,
            message: 'El campo sueldo es requerido'
        });
    }

    if(!dni) {
        return res.status(400).json({
            status: 400,
            message: 'El campo dni es requerido'
        });
    }
    
    // validar que el sueldo tenga un maximo 6 enteros y dos decimales
    const expR = /^\d{0,6}(\.\d{1,2})?$/g;
    const isValidSueldo = expR.test(sueldo);

    if(!isValidSueldo) {
        return res.status(400).json({
            status: 400,
            message: 'El campo sueldo no es valido'
        });
    }

    // validar que el dni sea de 8 digitos
    if(dni.length !== 8) {
        return res.status(400).json({
            status: 400,
            message: 'Este dni no es valido'
        });
    }

    // validar dni usando un servicio
    const isValid = mockService.validateDNI(parseInt(dni));
    
    if(!isValid) {
        return res.status(400).json({
            status: 400,
            message: 'EL dni no es apto'
        })
    }
    
    return next();
}

module.exports = {
    validateFields
}