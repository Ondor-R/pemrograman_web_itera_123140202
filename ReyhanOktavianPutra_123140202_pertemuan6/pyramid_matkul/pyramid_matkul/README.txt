<h2 align="center"> ✒️ Dokumentasi</h2>

## Deskripsi Proyek
Ini adalah proyek tugas praktikum pyramid framework membuat aplikasi CRUD sederhana dengan pyramid Framework dan PostgreSQL

## Persiapan Lingkungan Pengembangan
1. Membuat Virtual Environment

	# Buat folder untuk proyek
	mkdir pyramid_matkul
	cd pyramid_matkul

	# Buat virtual environment
	python -m venv venv

	# Aktifkan virtual environment
	# Untuk Windows
	venv\Scripts\activate

2. Instalasi Pyramid & Dependensi
	
	# Upgrade pip
	pip install --upgrade pip setuptools

	# Install cookiecutter untuk template proyek
	pip install cookiecutter

	# Install pyramid dan dependensi dasar
	pip install pyramid pyramid_debugtoolbar waitress pyramid_jinja2

## Membuat Proyek Pyramid dengan Cookiecutter
1. Menjalankan Cookiecutter

	# Pastikan virtual environment aktif
	# Jalankan cookiecutter dengan template Pyramid
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

	# Login ke PostgreSQL sebagai superuser
	# Ganti username dengan user PostgreSQL Kalian
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

	# Cari dan ganti baris sqlalchemy.url
	sqlalchemy.url = sqlite:///%(here)s/pyramid_matakuliah.sqlite

	# Menjadi
	sqlalchemy.url = postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_matakuliah



## ini readme ntah dari mana
pyramid_matkul
==============

Getting Started
---------------

- Change directory into your newly created project.

    cd pyramid_matkul

- Create a Python virtual environment.

    python3 -m venv env

- Upgrade packaging tools.

    env/bin/pip install --upgrade pip setuptools

- Install the project in editable mode with its testing requirements.

    env/bin/pip install -e ".[testing]"

- Initialize and upgrade the database using Alembic.

    - Generate your first revision.

        env/bin/alembic -c development.ini revision --autogenerate -m "init"

    - Upgrade to that revision.

        env/bin/alembic -c development.ini upgrade head

- Load default data into the database using a script.

    env/bin/initialize_pyramid_matkul_db development.ini

- Run your project's tests.

    env/bin/pytest

- Run your project.

    env/bin/pserve development.ini
