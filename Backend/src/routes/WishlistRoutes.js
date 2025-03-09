import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/WishlistController.js';
import { uploadImage } from '../middlewares/imageUpload.js';

const router = express.Router();

router.post('/addwishlist',requireSignIn, uploadImage.single("image"), addToWishlist);
router.get('/getwishlist', requireSignIn, getWishlist);
router.delete('/deletewishlist/:id', requireSignIn, removeFromWishlist);

export const wishlistRoutes = router;