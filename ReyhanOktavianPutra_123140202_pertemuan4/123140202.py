
data_mahasiswa = [
    {'nama': 'Sigma', 'NIM': '1231', 'nilai_uts': 80, 'nilai_uas': 85, 'nilai_tugas': 90},
    {'nama': 'Bruh', 'NIM': '1232', 'nilai_uts': 70, 'nilai_uas': 75, 'nilai_tugas': 80},
    {'nama': 'Kai', 'NIM': '1233', 'nilai_uts': 90, 'nilai_uas': 95, 'nilai_tugas': 85},
    {'nama': 'Cenat', 'NIM': '1234', 'nilai_uts': 50, 'nilai_uas': 60, 'nilai_tugas': 55},
    {'nama': 'Bal', 'NIM': '1235', 'nilai_uts': 40, 'nilai_uas': 45, 'nilai_tugas': 50},
]

def hitung_nilai_akhir(uts, uas, tugas):
    return (uts * 0.30) + (uas * 0.40) + (tugas * 0.30)

def tentukan_grade(nilai_akhir):
    if nilai_akhir >= 80:
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'

def proses_data(data_list):
    for mhs in data_list:
        mhs['nilai_akhir'] = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        mhs['grade'] = tentukan_grade(mhs['nilai_akhir'])

def tampilkan_tabel(data_list):
    print("=" * 80)
    print(f"| {'No':<3} | {'Nama':<20} | {'NIM':<10} | {'UTS':<5} | {'UAS':<5} | {'Tugas':<5} | {'Akhir':<6} | {'Grade':<5} |")
    print("-" * 80)
    
    if not data_list:
        print(f"| {'Tidak ada data untuk ditampilkan':^76} |")
    else:
        for i, mhs in enumerate(data_list, 1):
            print(f"| {i:<3} | {mhs['nama']:<20} | {mhs['NIM']:<10} | {mhs['nilai_uts']:<5} | {mhs['nilai_uas']:<5} | {mhs['nilai_tugas']:<5} | {mhs['nilai_akhir']:<6.2f} | {mhs['grade']:<5} |")
    
    print("=" * 80)

def cari_nilai_tertinggi(data_list):
    if not data_list:
        return None
    return max(data_list, key=lambda x: x['nilai_akhir'])

def cari_nilai_terendah(data_list):
    if not data_list:
        return None
    return min(data_list, key=lambda x: x['nilai_akhir'])

def input_nilai(prompt):
    while True:
        try:
            nilai = int(input(prompt))
            if 0 <= nilai <= 100:
                return nilai
            else:
                print("Input tidak valid. Nilai harus antara 0 dan 100.")
        except ValueError:
            print("Input tidak valid. Harap masukkan angka.")

def tambah_mahasiswa(data_list):
    print("\n--- Menambah Data Mahasiswa Baru ---")
    nama = input("Masukkan Nama: ")
    nim = input("Masukkan NIM: ")
    uts = input_nilai("Masukkan Nilai UTS: ")
    uas = input_nilai("Masukkan Nilai UAS: ")
    tugas = input_nilai("Masukkan Nilai Tugas: ")
    nilai_akhir = hitung_nilai_akhir(uts, uas, tugas)
    grade = tentukan_grade(nilai_akhir)
    
    data_list.append({
        'nama': nama,
        'NIM': nim,
        'nilai_uts': uts,
        'nilai_uas': uas,
        'nilai_tugas': tugas,
        'nilai_akhir': nilai_akhir,
        'grade': grade
    })
    print(f"\nData untuk {nama} berhasil ditambahkan.")

def filter_berdasarkan_grade(data_list):
    grade_dicari = input("Masukkan Grade yang ingin dicari (A/B/C/D/E): ").upper()
    
    if grade_dicari not in ['A', 'B', 'C', 'D', 'E']:
        print("Grade tidak valid.")
        return
    
    hasil_filter = [mhs for mhs in data_list if mhs['grade'] == grade_dicari]
    
    print(f"\n--- Daftar Mahasiswa dengan Grade {grade_dicari} ---")
    tampilkan_tabel(hasil_filter)

def hitung_rata_rata_kelas(data_list):
    if not data_list:
        print("Tidak ada data untuk dihitung.")
        return
        
    total_nilai = sum(mhs['nilai_akhir'] for mhs in data_list)
    rata_rata = total_nilai / len(data_list)
    
    print(f"\nTotal Mahasiswa: {len(data_list)}")
    print(f"Nilai Rata-rata Kelas (Nilai Akhir): {rata_rata:.2f}")

def main():
    proses_data(data_mahasiswa)

    while True:
        print("\n" + "=" * 40)
        print("   Program Pengelolaan Nilai Mahasiswa   ")
        print("=" * 40)
        print("1. Tampilkan Semua Data Mahasiswa")
        print("2. Tambah Data Mahasiswa")
        print("3. Cari Nilai Tertinggi")
        print("4. Cari Nilai Terendah")
        print("5. Filter Berdasarkan Grade")
        print("6. Tampilkan Rata-rata Nilai Kelas")
        print("0. Keluar")
        print("-" * 40)

        pilihan = input("Masukkan pilihan Anda (0-6): ")

        if pilihan == '1':
            print("\n--- Daftar Lengkap Nilai Mahasiswa ---")
            tampilkan_tabel(data_mahasiswa)
        
        elif pilihan == '2':
            tambah_mahasiswa(data_mahasiswa)
        
        elif pilihan == '3':
            tertinggi = cari_nilai_tertinggi(data_mahasiswa)
            if tertinggi:
                print("\n--- Mahasiswa dengan Nilai Tertinggi ---")
                tampilkan_tabel([tertinggi])
            else:
                print("Data kosong.")
        
        elif pilihan == '4':
            terendah = cari_nilai_terendah(data_mahasiswa)
            if terendah:
                print("\n--- Mahasiswa dengan Nilai Terendah ---")
                tampilkan_tabel([terendah])
            else:
                print("Data kosong.")
        
        elif pilihan == '5':
            filter_berdasarkan_grade(data_mahasiswa)
        
        elif pilihan == '6':
            hitung_rata_rata_kelas(data_mahasiswa)
        
        elif pilihan == '0':
            print("\nTerima kasih telah menggunakan program ini.")
            break
        
        else:
            print("\nPilihan tidak valid. Silakan masukkan angka 0 hingga 6.")

if __name__ == "__main__":
    main()