/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

const express = require('express');
const router = express.Router();
const {
  login,
  refreshToken,
  register,
} = require('../controllers/AuthenticationController');
const {
  getAllUsers,
  getUser,
  updateAvatar,
  updateUser,
} = require('../controllers/UsersController');
const {
  arrangeCleaningDuties,
  getCleaningDuties,
} = require('../controllers/CleanningDutyController');

const {
  savingTokenDevice,
  deleteTokenDevice,
} = require('../controllers/DevicesController');

/**
 * @swagger
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     scheme: bearer
 *     in: header
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *       '401':
 *         description: Unauthorized
 */
router.post('/api/auth/login', login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               name:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully registered
 *       '409':
 *         description: User already exists
 *       '500':
 *         description: Internal server error
 */
router.post('/api/auth/register', register);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved users
 *       '500':
 *         description: Internal server error
 */
router.get('/api/users', getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *   summary: Get a single user
 *   tags: [Users]
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      type: integer
 *   responses:
 *    '200':
 *     description: Successfully retrieved user
 *    '404':
 *     description: User not found
 *    '500':
 *     description: Internal server error
 */
router.get('/api/users/:id', getUser);

/**
 * @swagger
 * /api/users/update-avatar:
 *   put:
 *     summary: Update user's avatar
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: base64
 *     responses:
 *       '204':
 *         description: User information updated successfully
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.put('/api/users/update-avatar', updateAvatar);

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               phone_number:
 *                 type: string
 *     responses:
 *       '204':
 *         description: User information updated successfully
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '500':
 *         description: Internal server error
 */
router.put('/api/users', updateUser);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully refreshed token
 *       '403':
 *         description: Invalid token
 */
router.post('/api/auth/refresh-token', refreshToken);

/**
 * @swagger
 * /api/cleaning-duties/arrange:
 *   post:
 *     summary: Arrange cleaning duties
 *     tags: [Cleaning Duties]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Cleaning duties arranged successfully
 *       '500':
 *         description: Internal server error
 */
router.post('/api/cleaning-duties/arrange', arrangeCleaningDuties);

/**
 * @swagger
 * /api/cleaning-duties/{year}/{month}:
 *   get:
 *     summary: Get cleaning duties
 *     tags: [Cleaning Duties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         type: string
 *         format: date
 *       - in: path
 *         name: month
 *         required: true
 *         type: string
 *         format: date
 *     responses:
 *       '200':
 *         description: Successfully retrieved cleaning duties
 *       '400':
 *         description: Invalid month or year
 *       '500':
 *         description: Internal server error
 */
router.get('/api/cleaning-duties/:year/:month', getCleaningDuties);

/**
 * @swagger
 * /api/devices:
 *   post:
 *     summary: Save device token
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceToken:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Device token saved
 *       '500':
 *         description: Internal server error
 */
router.post('/api/devices', savingTokenDevice);

/**
 * @swagger
 * /api/devices:
 *   delete:
 *     summary: Delete device token
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceToken:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Device token deleted
 *       '500':
 *         description: Internal server error
 */
router.delete('/api/devices', deleteTokenDevice);

module.exports = router;
