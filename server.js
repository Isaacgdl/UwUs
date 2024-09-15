const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Conectar a MongoDB
mongoose.connect('mongodb+srv://Usuario123:DCqcN4AtEzLxeu8P@hack2024.98ayq.mongodb.net/Base_math', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Conectado a MongoDB');
});

// Esquema y modelo de Coordenadas
const coordenadasSchema = new mongoose.Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

// Crear índice geoespacial
coordenadasSchema.index({ location: '2dsphere' });

const Coordenadas = mongoose.model('Coordenadas', coordenadasSchema);

// Ruta para obtener coordenadas
app.get('/api/coordenadas', async (req, res) => {
    try {
        const coordenadas = await Coordenadas.find({});
        res.json(coordenadas);
    } catch (error) {
        console.error('Error al obtener coordenadas:', error);
        res.status(500).send('Error al obtener coordenadas');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
