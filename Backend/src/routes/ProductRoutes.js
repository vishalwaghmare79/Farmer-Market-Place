import express, { Router } from 'express';
import { addProduct, deleteProduct, getAllProducts, getAllUserProduct, getProductByCategory, getProductById, updateProduct } from '../controllers/ProductController.js';
import { uploadImage } from '../middlewares/imageUpload.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/allProduct', getAllProducts); 
router.get('/getProduct/:pid', requireSignIn, getProductById); 
router.get('/getProductByCategory/:category', getProductByCategory); 
router.get('/allUserProducts', requireSignIn, getAllUserProduct); 
router.delete('/deleteProduct/:pid',requireSignIn, deleteProduct);
router.post('/addProduct',requireSignIn, uploadImage.single('image'), addProduct); 
router.put('/updateProduct/:pid',requireSignIn, uploadImage.single('image'), updateProduct); 

export const productRoutes = router;

