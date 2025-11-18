from abc import ABC, abstractmethod

#-------------------------------------------------------------Kelas Abstrak LibraryItemny (ABC menandakan dia kls abstrak)
class LibraryItem(ABC):
    def __init__(self, item_id, title):
        self._item_id = item_id
        self._title = title

    #property2ny
    #semuan method kosong kalau di class abstrak, tpi di subclass harus diimplementasikan
    @property
    def item_id(self):
        return self._item_id

    @property
    def title(self):
        return self._title

    #Abstarct methodny, method yg harus diimplementasikan di subclass
    @abstractmethod
    def display_details(self):
        pass

#-------------------------------------------------------------child class/subclass Booknya, menginherit dari class Abstrak LibraryItem
class Book(LibraryItem):
    def __init__(self, item_id, title, author):
        # super() memanggil constructor dari parent class LibraryItem
        super().__init__(item_id, title)
        self._author = author

    def display_details(self):
        print(f"[BOOK]     ID: {self.item_id}, Judul: \"{self.title}\", Penulis: {self._author}")

#-------------------------------------------------------------child class/subclass Magazineny, menginherit dari class Abstrak LibraryItem
class Magazine(LibraryItem):
    def __init__(self, item_id, title, issue_number):
        # super() memanggil constructor dari parent class LibraryItem
        super().__init__(item_id, title)
        self._issue_number = issue_number

    #konsep polymorphism, method display_details yg sma seperti di kls Book, tpi isinya beda
    def display_details(self):
        print(f"[MAGAZINE] ID: {self.item_id}, Judul: \"{self.title}\", Edisi: {self._issue_number}")

#-------------------------------------------------------------Class Librarynya
class Library:
    def __init__(self):
        # Menggunakan atribut private __items untuk ekapsulasi
        self.__items = []

    def add_item(self, item):
        if isinstance(item, LibraryItem):
            self.__items.append(item)
            print(f"INFO: Berhasil menambahkan \"{item.title}\" ke perpustakaan.")
        else:
            print("ERROR: Hanya item turunan LibraryItem (Book/Magazine) yang bisa ditambahkan.")

    def display_available_items(self):
        if not self.__items:
            print("\nPerpustakaan saat ini kosong.")
            return
            
        print("\n--- Daftar Item di Perpustakaan ---")
        # Polymorphism: memanggil display_details(), python akan otomatis memanggil method yang sesuai (Book atau Magazine)
        for item in self.__items:
            item.display_details()
        print("-------------------------------------")

    def find_item(self, query):
        print(f"\n--- Hasil Pencarian untuk \"{query}\" ---")
        found_items = []
        query_lower = query.lower()
        
        for item in self.__items:
            if query == item.item_id or query_lower in item.title.lower():
                found_items.append(item)
                
        if found_items:
            for item in found_items:
                item.display_details()
        else:
            print(f"Tidak ada item yang cocok dengan pencarian \"{query}\".")
        print("-------------------------------------")
        
    def delete_item(self, item_id):
        item_to_delete = None
        for item in self.__items:
            if item.item_id == item_id:
                item_to_delete = item
                break
        
        if item_to_delete:
            self.__items.remove(item_to_delete)
            print(f"INFO: Berhasil menghapus \"{item_to_delete.title}\" (ID: {item_id}) dari perpustakaan.")
        else:
            print(f"ERROR: Item dengan ID \"{item_id}\" tidak ditemukan.")

#-------------------------------------------------------------Fungsi untuk Menampilkan Menu
def show_menu():
    """Menampilkan menu utama program."""
    print("\n--- Sistem Manajemen Perpustakaan ---")
    print("1. Tambah Item Baru")
    print("2. Hapus Item")
    print("3. Cari Item")
    print("4. Tampilkan Semua Item")
    print("5. Keluar")
    print("-------------------------------------")

#mainny
if __name__ == "__main__":
    
    my_library = Library()
    print("Perpustakaan telah dibuat.")

    # Data awal
    my_library.add_item(Book("B001", "Dark Disciple", "Christie Golden"))
    my_library.add_item(Book("B002", "Thrawn", "Timothy Zahn"))
    my_library.add_item(Magazine("M001", "Time", "Maret 2025"))

    while True:
        show_menu()
        pilihan = input("Masukkan pilihan Anda (1-5): ")

        #pilihan menuny:
        #Tambah Item
        if pilihan == '1':
            print("\n[Tambah Item Baru]")
            tipe_item = input("Pilih tipe item [Book (b) / Magazine (m)]: ").lower()
            
            item_id = input("Masukkan ID Item (ex: B003): ")
            title = input("Masukkan Judul: ")
            
            if tipe_item == 'b':
                author = input("Masukkan Penulis: ")
                new_item = Book(item_id, title, author)
                my_library.add_item(new_item)
            elif tipe_item == 'm':
                issue_number = input("Masukkan Edisi/Nomor Terbit: ")
                new_item = Magazine(item_id, title, issue_number)
                my_library.add_item(new_item)
            else:
                print("ERROR: Tipe item tidak valid. Harap pilih 'b' atau 'm'.")

        #Hapus Item
        elif pilihan == '2':
            print("\n[Hapus Item]")
            item_id = input("Masukkan ID item yang akan dihapus: ")
            my_library.delete_item(item_id)

        #Cari Item 
        elif pilihan == '3':
            print("\n[Cari Item]")
            query = input("Masukkan ID atau Judul untuk dicari: ")
            my_library.find_item(query)

        #tampilkan semua item 
        elif pilihan == '4':
            my_library.display_available_items()

        #keluar 
        elif pilihan == '5':
            print("\nTerima kasih telah menggunakan sistem. Sampai jumpa!")
            break
        
        #kalau milih diluar 1-5
        else:
            print("\nPilihan tidak valid. Silakan masukkan angka antara 1 dan 5.")