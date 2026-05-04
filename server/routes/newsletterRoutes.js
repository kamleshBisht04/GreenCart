import express from 'express';
import { subscribeNewsletter } from '../controllers/newsletterController.js';

const newsletterRouter = express.Router();

// POST /api/newsletter
newsletterRouter.post('/', subscribeNewsletter);

export default newsletterRouter;
