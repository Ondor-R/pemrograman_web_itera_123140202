<h2 align="center"> ✒️ Dokumentasi </h2>

## Deskripsi Proyek
Ini adalah proyek tugas praktikum pyramid framework membuat aplikasi CRUD sederhana dengan pyramid Framework dan PostgreSQL

## Persiapan Lingkungan Pengembangan
1. Membuat Virtual Environment

	#Buat folder untuk proyek
	mkdir pyramid_matkul
	cd pyramid_matkul

	#Buat virtual environment
	python -m venv venv

	#Aktifkan virtual environment
	#Untuk Windows
	venv\Scripts\activate

2. Instalasi Pyramid & Dependensi
	
	#Upgrade pip
	pip install --upgrade pip setuptools

	#Install cookiecutter untuk template proyek
	pip install cookiecutter

	#Install pyramid dan dependensi dasar
	pip install pyramid pyramid_debugtoolbar waitress pyramid_jinja2

## Membuat Proyek Pyramid dengan Cookiecutter
1. Menjalankan Cookiecutter

	#Pastikan virtual environment aktif
	#Jalankan cookiecutter dengan template Pyramid
	cookiecutter gh:Pylons/pyramid-cookiecutter-alchemy

	project_name [Pyramid Scaffold]: pyramid_matkul
	repo_name [pyramid_matkul]:

2. Instalasi Dependensi Proyek

	#masuk ke dikertori proyek lalu install dependensi proyek (development mode)
	pip install -e ".[testing]"

## Verifikasi Setup

	# Pastikan berada di direktori root proyek
	# dan virtual environment aktif
	pserve development.ini

## Konfigurasi Database PostSQL
1. Membuat Database PostgreSQL

	#Login ke PostgreSQL sebagai superuser
	#Ganti username dengan user PostgreSQL Kalian
	psql -U postgres

	-- 1. Buat database
	CREATE DATABASE pyramid_matakuliah;
	-- 2. Buat user baru
	CREATE USER pyramid_user WITH ENCRYPTED PASSWORD 'pyramid_pass';
	-- 3. Beri user izin ke database
	GRANT ALL PRIVILEGES ON DATABASE pyramid_matakuliah TO pyramid_user;
	-- 4. Pindah ke database pyramid_matakuliah
	\c pyramid_matakuliah
	-- 5. Beri izin schema public ke user
	GRANT USAGE, CREATE ON SCHEMA public TO pyramid_user;
	-- 6. Ubah owner schema public (opsional tapi paling aman)
	ALTER SCHEMA public OWNER TO pyramid_user;
	-- 7. Pastikan owner default table/sequence future
	ALTER DEFAULT PRIVILEGES IN SCHEMA public
	GRANT ALL ON TABLES TO pyramid_user;
	ALTER DEFAULT PRIVILEGES IN SCHEMA public
	GRANT ALL ON SEQUENCES TO pyramid_user;
	-- 8. Keluar dari psql
	\q

2. Install Dependensi PostgreSQL

	pip install psycopg2-binary

3. Update Konfigurasi Pyramid

	#Cari dan ganti baris sqlalchemy.url
	sqlalchemy.url = sqlite:///%(here)s/pyramid_matakuliah.sqlite

	#Menjadi
	sqlalchemy.url = postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_matakuliah


## Lampiran
<img width="490" height="516" alt="Screenshot 2025-12-03 120511" src="https://github.com/user-attachments/assets/0e01564a-b00b-4f98-ab96-6d2f03f49433" />
<img width="769" height="38" alt="Screenshot 2025-12-03 121221" src="https://github.com/user-attachments/assets/8f06dc77-a976-4675-a359-19ce449706a1" />
<img width="775" height="219" alt="Screenshot 2025-12-03 121455" src="https://github.com/user-attachments/assets/5b5d2b1a-4c75-41cd-aae6-912be21099aa" />
<img width="764" height="184" alt="Screenshot 2025-12-03 121559" src="https://github.com/user-attachments/assets/7e339eec-3e4f-43aa-8689-db7042adc1f6" />
<img width="682" height="172" alt="Screenshot 2025-12-03 121741" src="https://github.com/user-attachments/assets/d0d76b7f-466d-4727-8484-750e64cb920a" />
<img width="763" height="185" alt="Screenshot 2025-12-03 122347" src="https://github.com/user-attachments/assets/7b9259cb-2c72-4032-b19a-1a47e6e2069b" />
<img width="562" height="136" alt="Screenshot 2025-12-03 122440" src="https://github.com/user-attachments/assets/7f4181cf-b77a-44e4-96f1-f5b8e99ba25c" />







