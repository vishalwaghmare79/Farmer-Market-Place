import express from 'express';
import { addToCart, getCart, removeFromCart, updateCartItem } from '../controllers/CartController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/addcart',requireSignIn, addToCart);
router.get('/getcart',requireSignIn, getCart);
router.delete('/deletecart/:id',requireSignIn, removeFromCart);
router.put('/updatecart/:id',requireSignIn, updateCartItem);




export const cartRoutes = router;