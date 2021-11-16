import express from 'express';

//Importing route functions from their respective controllers.
import { getLandlords, createLandlord, upvotePost } from '../controllers/landlords.js';

const router = express.Router();

router.get('/', getLandlords);
router.post('/', createLandlord);
router.patch('/:id/upvotePost', upvotePost);
export default router;