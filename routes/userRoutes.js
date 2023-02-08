import { Router } from 'express';
import { updateMe, deleteMe, getAllUsers, createUser, getUser, updateUser, deleteUser } from './../controllers/userController';
import { signup, login, forgotPassword, resetPassword, protect, updatePassword } from './../controllers/authController';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.patch(
  '/updateMyPassword',
  protect,
  updatePassword
);

router.patch('/updateMe', protect, updateMe);
router.delete('/deleteMe', protect, deleteMe);

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
