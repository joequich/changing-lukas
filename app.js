const express = require('express');
const app = express();
const scrapeIt = require("scrape-it");

// const { query } = require('express-validator') not today
const { validateFields } = require('./middlewares/validateFields.middleware');
const port = 3000;
// app.use(express.json());

app.get('/currency/change', validateFields, async(req, res) => {
    const { sueldo } = req.query;

    // Obtener via scraping el tipo de cambio del dolar, usando la web de Kambista como ejemplo
    const scrapping = await scrapeIt("https://kambista.com", {
        valVenta: '#valventa',
    });

    // Convertir soles a dolares
    const { valVenta } = scrapping.data;
    const rate = 1/valVenta;
    const total = +(sueldo*rate).toFixed(2);

    res.status(200).json({
        status: 200,
        total,
    });

});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});