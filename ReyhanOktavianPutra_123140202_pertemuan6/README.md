<h2 align="center"> ✒️ Dokumentasi </h2>

## Deskripsi Proyek
Ini adalah proyek tugas praktikum pyramid framework membuat aplikasi CRUD sederhana dengan pyramid Framework dan PostgreSQL

## Persiapan Lingkungan Pengembangan
1. Membuat Virtual Environment <br>

	#Buat folder untuk proyek <br>
	mkdir pyramid_matkul <br>
	cd pyramid_matkul <br>
    <br>
	#Buat virtual environment <br>
	python -m venv venv <br>
    <br>
	#Aktifkan virtual environment <br>
	#Untuk Windows <br>
	venv\Scripts\activate <br>
    <br>
2. Instalasi Pyramid & Dependensi <br>
    <br>
	#Upgrade pip <br>
	pip install --upgrade pip setuptools <br>
    <br>
	#Install cookiecutter untuk template proyek <br>
	pip install cookiecutter <br>
    <br>
	#Install pyramid dan dependensi dasar <br>
	pip install pyramid pyramid_debugtoolbar waitress pyramid_jinja2 <br>
    <br>

## Membuat Proyek Pyramid dengan Cookiecutter
1. Menjalankan Cookiecutter<br>
<br>
	#Pastikan virtual environment aktif<br>
	#Jalankan cookiecutter dengan template Pyramid<br>
	cookiecutter gh:Pylons/pyramid-cookiecutter-alchemy<br>
<br>
	project_name [Pyramid Scaffold]: pyramid_matkul<br>
	repo_name [pyramid_matkul]:<br>
<br>
2. Instalasi Dependensi Proyek<br>
<br>
	#masuk ke dikertori proyek lalu install dependensi proyek (development mode)<br>
	pip install -e ".[testing]"<br>
<br>

## Verifikasi Setup<br>
<br>
	# Pastikan berada di direktori root proyek<br>
	# dan virtual environment aktif<br>
	pserve development.ini<br>
<br>

## Konfigurasi Database PostSQL
1. Membuat Database PostgreSQL<br>
<br>
	#Login ke PostgreSQL sebagai superuser<br>
	#Ganti username dengan user PostgreSQL Kalian<br>
	psql -U postgres<br>
<br>
	-- 1. Buat database<br>
	CREATE DATABASE pyramid_matakuliah;<br>
	-- 2. Buat user baru<br>
	CREATE USER pyramid_user WITH ENCRYPTED PASSWORD 'pyramid_pass';<br>
	-- 3. Beri user izin ke database<br>
	GRANT ALL PRIVILEGES ON DATABASE pyramid_matakuliah TO pyramid_user;<br>
	-- 4. Pindah ke database pyramid_matakuliah<br>
	\c pyramid_matakuliah<br>
	-- 5. Beri izin schema public ke user<br>
	GRANT USAGE, CREATE ON SCHEMA public TO pyramid_user;<br>
	-- 6. Ubah owner schema public (opsional tapi paling aman)<br>
	ALTER SCHEMA public OWNER TO pyramid_user;<br>
	-- 7. Pastikan owner default table/sequence future<br>
	ALTER DEFAULT PRIVILEGES IN SCHEMA public<br>
	GRANT ALL ON TABLES TO pyramid_user;<br>
	ALTER DEFAULT PRIVILEGES IN SCHEMA public<br>
	GRANT ALL ON SEQUENCES TO pyramid_user;<br>
	-- 8. Keluar dari psql<br>
	\q<br>
<br>
2. Install Dependensi PostgreSQL<br>
<br>
	pip install psycopg2-binary<br>
<br>
3. Update Konfigurasi Pyramid<br>
<br>
	#Cari dan ganti baris sqlalchemy.url<br>
	sqlalchemy.url = sqlite:///%(here)s/pyramid_matakuliah.sqlite<br>
<br>
	#Menjadi<br>
	sqlalchemy.url = postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_matakuliah<br>
<br>

## Lampiran
<img width="490" height="516" alt="Screenshot 2025-12-03 120511" src="https://github.com/user-attachments/assets/0e01564a-b00b-4f98-ab96-6d2f03f49433" />
<img width="769" height="38" alt="Screenshot 2025-12-03 121221" src="https://github.com/user-attachments/assets/8f06dc77-a976-4675-a359-19ce449706a1" />
<img width="775" height="219" alt="Screenshot 2025-12-03 121455" src="https://github.com/user-attachments/assets/5b5d2b1a-4c75-41cd-aae6-912be21099aa" />
<img width="764" height="184" alt="Screenshot 2025-12-03 121559" src="https://github.com/user-attachments/assets/7e339eec-3e4f-43aa-8689-db7042adc1f6" />
<img width="682" height="172" alt="Screenshot 2025-12-03 121741" src="https://github.com/user-attachments/assets/d0d76b7f-466d-4727-8484-750e64cb920a" />
<img width="763" height="185" alt="Screenshot 2025-12-03 122347" src="https://github.com/user-attachments/assets/7b9259cb-2c72-4032-b19a-1a47e6e2069b" />
<img width="562" height="136" alt="Screenshot 2025-12-03 122440" src="https://github.com/user-attachments/assets/7f4181cf-b77a-44e4-96f1-f5b8e99ba25c" />







