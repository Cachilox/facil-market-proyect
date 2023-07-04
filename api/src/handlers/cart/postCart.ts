import { Request, Response } from "express";
import { createCart } from "../../controllers/cart.controllers";

export const addItem = async (req: Request, res: Response) => {
	try {
		// Obtener los datos de la solicitud
		const { userID } = req.params;

		//const parseProducts: Array<number> = Object.values(products)[0];

		// Crear el carrito de compras
		const response = await createCart(Number(userID));

		// Enviar respuesta de éxito
		res.status(201).json(response);
	} catch (error) {
		// Manejar errores
		res.status(500).json(error);
	}
};
