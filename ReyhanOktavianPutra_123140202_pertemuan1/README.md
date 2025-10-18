<h1 align="center">Dokumentasi</h1>


## Penjelasan singkat tentang fungsi aplikasi dan daftar fitur-fiturnya
Aplikasi ini digunakan untuk manajemen tugas-tugas mahasiswa.
Fiturnya:
* Tambah tugas
* Edit tugas
* Hapus tugas
* Cari tugas
* Menandai kalau tugas sudah selesai atau belum

## Screenshot
* Tambah tugas
<img width="859" height="637" alt="image" src="https://github.com/user-attachments/assets/b72c3533-e235-4289-962d-b7d784074a47" />

* Edit tugas
<img width="852" height="630" alt="image" src="https://github.com/user-attachments/assets/15a67fe6-0cd7-4680-b407-f04965bc9627" />

*Tandai tugas kalau sudah selesai
<img width="857" height="641" alt="image" src="https://github.com/user-attachments/assets/6a6e08f7-bae1-4051-98b4-3844865ec1e3" />

## How-To-Run
Untuk menjalankannya tinggal buka file index.htmlnya

##Penjelasan penggunaan LocalStorage & validasi form
Di dalam kode script.js terdapat:
<img width="456" height="64" alt="image" src="https://github.com/user-attachments/assets/8ad514b5-591e-44d9-af08-ceabdf779316" />
Fungsi saveTasks memuat sebuah baris kode untuk menyimpan/update data. 'tasks' adalah label nama penyimpanannya. JSON.stringify() itu fungsi mengubah array/objek js jadi string JSON karna localStorage hnya bisa menyimpan data dalam format string. tasks yang didalamnya itu array js yg berisi tugas2nya.

<img width="472" height="25" alt="image" src="https://github.com/user-attachments/assets/39ff7e07-14b2-4a29-9e9a-be7d28f3bef4" />
Digunakan unutk mengambil data localStorage dengan label 'tasks' saat halaman dimuat.

Untuk validasi form, terdapat __required__ untuk setiap input dengan class form-group di index.html, yang dimana form tidak bisa disubmit kalau input2nya kosong.
