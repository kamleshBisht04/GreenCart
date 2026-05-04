import express from 'express';
import { submitContact } from '../controllers/contactController.js';


const contactRouter = express.Router();

// POST /api/contact
contactRouter.post('/', submitContact);

export default contactRouter;
