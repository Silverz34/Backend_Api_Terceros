import express, { Request, Response } from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000; 
const API_URL = process.env.API_URL || '';

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET'] 
}));

app.get('/api/personajes', async (req: Request, res: Response) => {
   try {
        const response = await axios.get(API_URL);
        const personajes = response.data.data;
        res.status(200).json({
            success: true,
            data: personajes
        });

    } catch (error) {
        console.error("Error al consultar la API de Disney:", error);
        res.status(500).json({
            success: false,
            message: "Error de comunicación con el servidor externo."
        });
    }
});

//para el id de u solo personaje 
app.get('/api/personajes/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        const response = await axios.get(`${API_URL}/${id}`);
        
        res.status(200).json({
            success: true,
            data: response.data.data
        });
    } catch (error) {
        console.error(`Error al consultar el personaje ${req.params.id}:`, error);
        res.status(500).json({ success: false, message: "Error al obtener el personaje." });
    }
});

app.listen(PORT, () =>{
    console.log(`Servidor BFF corre exitosamente http://localhost:${PORT}`)
})