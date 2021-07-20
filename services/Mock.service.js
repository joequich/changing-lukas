class MockService {
    // servicio con data simulada
    dniCollections = [12345678, 34241525, 45267825, 69478493, 83759373, 37843738, 83138379];

    validateDNI(dni) {
        try {
            // Aqui un servicio verificara si el dni es apto o no.
            // const data = await fetch(`https://url/?dni=${dni}`);
            // const { apto } = await data.json();
            const apto = this.dniCollections.includes(dni);
            return apto;
        } catch (error) {
            throw new Error('Error in Mock service');
        }
    }
}

module.exports = {
    MockService
}