const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: ID otomatis dari user
 *         email:
 *           type: string
 *           description: Email user
 *         name:
 *           type: string
 *           description: Nama user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Waktu pembuatan user
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Waktu terakhir update user
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrasi user baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Email sudah terdaftar
 *       500:
 *         description: Kesalahan server
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Email atau password salah
 *       500:
 *         description: Kesalahan server
 */

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Mendapatkan profil user yang sedang login
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil user berhasil didapatkan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Token tidak valid atau tidak ada
 *       404:
 *         description: User tidak ditemukan
 *       500:
 *         description: Kesalahan server
 */

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);

module.exports = router; 