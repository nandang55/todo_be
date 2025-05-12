# Todo List Backend API

Backend API untuk aplikasi Todo List menggunakan Node.js, Express, dan Prisma dengan MongoDB.

## Persyaratan

- Node.js (versi 14 atau lebih tinggi)
- MongoDB (versi 4.4 atau lebih tinggi)
- npm atau yarn

## Instalasi

1. Install dependensi:
```bash
npm install
```

2. Konfigurasi database:
- Pastikan MongoDB sudah berjalan di localhost:27017
- Atau ubah URL database di file `.env`

3. Generate Prisma Client:
```bash
npx prisma generate
```

4. Jalankan aplikasi:
```bash
# Mode development
npm run dev

# Mode production
npm start
```

## API Endpoints

- `GET /api/todos` - Mendapatkan semua todo
- `POST /api/todos` - Membuat todo baru
- `PUT /api/todos/:id` - Mengupdate todo
- `DELETE /api/todos/:id` - Menghapus todo

## Struktur Data Todo

```json
{
  "id": "string",
  "title": "string",
  "description": "string (opsional)",
  "completed": "boolean",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
``` 