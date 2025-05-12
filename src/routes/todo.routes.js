const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: ID otomatis dari todo
 *         title:
 *           type: string
 *           description: Judul todo
 *         description:
 *           type: string
 *           description: Deskripsi todo
 *         completed:
 *           type: boolean
 *           description: Status todo
 *         userId:
 *           type: string
 *           description: ID user pemilik todo
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Waktu pembuatan todo
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Waktu terakhir update todo
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Mengambil semua todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar todo berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Tidak terautentikasi
 */
router.get('/', auth, async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.userId
      }
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data todo' });
  }
});

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Membuat todo baru
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Tidak terautentikasi
 */
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId: req.userId
      },
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat membuat todo baru' });
  }
});

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Mengupdate todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Todo berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Tidak terautentikasi
 *       403:
 *         description: Tidak memiliki akses
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    // Cek kepemilikan todo
    const todo = await prisma.todo.findUnique({
      where: { id }
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo tidak ditemukan' });
    }

    if (todo.userId !== req.userId) {
      return res.status(403).json({ error: 'Tidak memiliki akses untuk mengupdate todo ini' });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        description,
        completed,
      },
    });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat mengupdate todo' });
  }
});

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Menghapus todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID todo
 *     responses:
 *       204:
 *         description: Todo berhasil dihapus
 *       401:
 *         description: Tidak terautentikasi
 *       403:
 *         description: Tidak memiliki akses
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Cek kepemilikan todo
    const todo = await prisma.todo.findUnique({
      where: { id }
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo tidak ditemukan' });
    }

    if (todo.userId !== req.userId) {
      return res.status(403).json({ error: 'Tidak memiliki akses untuk menghapus todo ini' });
    }

    await prisma.todo.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat menghapus todo' });
  }
});

module.exports = router; 