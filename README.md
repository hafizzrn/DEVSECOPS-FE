# CASHFLOW FE


## Prasyarat

Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (versi 18 atau lebih tinggi)
- [pnpm](https://pnpm.io/) (versi 8 atau lebih tinggi)
- [Docker](https://www.docker.com/) dan Docker Compose (untuk deployment)

## Instalasi pnpm

Jika belum menginstal pnpm, jalankan:
```bash
npm install -g pnpm
```

## Setup Projek Lokal

### 1. Clone Repository
```bash
git clone https://github.com/hafizzrn/DEVSECOPS-FE
cd DEVSECOPS-FE
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Setup Environment Variables

Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

Kemudian edit file `.env` dan sesuaikan nilai-nilai konfigurasi sesuai kebutuhan Anda:
```bash
nano .env
# atau gunakan editor favorit Anda
```

### 4. Jalankan Development Server
```bash
pnpm dev
```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000)

## Perintah Lainnya
```bash
# Build untuk production
pnpm build

# Jalankan production build
pnpm start

# Linting
pnpm lint

# Format code
pnpm format
```

## Deployment dengan Docker

### Prasyarat Deployment

Pastikan Anda telah:
1. Menginstal Docker dan Docker Compose
2. Menyiapkan file `.env` dengan konfigurasi production
3. Membuild image atau memiliki akses ke image registry

### Cara Deploy

#### 1. Persiapan File Environment

Pastikan file `.env` sudah dikonfigurasi dengan benar untuk production:
```bash
cp .env.example .env
# Edit .env dengan konfigurasi production
```

#### 2. Build dan Jalankan Container

Jalankan perintah berikut untuk memulai deployment:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

**Penjelasan flag:**
- `-f docker-compose.prod.yml`: Menggunakan file konfigurasi production
- `up`: Membuat dan menjalankan container
- `-d`: Menjalankan container di background (detached mode)

#### 3. Melihat Log Container

Untuk melihat log aplikasi:
```bash
docker-compose -f docker-compose.prod.yml logs -f
```

#### 4. Menghentikan Container

Untuk menghentikan aplikasi:
```bash
docker-compose -f docker-compose.prod.yml down
```

#### 5. Rebuild dan Restart

Jika ada perubahan code atau konfigurasi:
```bash
# Stop container
docker-compose -f docker-compose.prod.yml down

# Rebuild image
docker-compose -f docker-compose.prod.yml build

# Start ulang
docker-compose -f docker-compose.prod.yml up -d
```

## Troubleshooting

### Port sudah digunakan
Jika port 3000 sudah digunakan, ubah port di file `docker-compose.prod.yml` atau `.env`

