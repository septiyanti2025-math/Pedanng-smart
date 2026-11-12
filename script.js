
let barang = [];

function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

function tambahBarang() {
    let nama = document.getElementById("nama").value.trim();
    let harga = Number(document.getElementById("harga").value);
    let jumlah = Number(document.getElementById("jumlah").value);

    if (nama === "" || harga <= 0 || jumlah <= 0 ||
        !Number.isFinite(harga) ||
        !Number.isInteger(jumlah)) {
        alert("Masukkan nama, harga, dan jumlah barang dengan benar!");
        return;
    }

    let total = harga * jumlah;

    barang.push({
        nama: nama,
        harga: harga,
        jumlah: jumlah,
        total: total
    });

    tampilkanBarang();

    document.getElementById("nama").value = "";
    document.getElementById("harga").value = "";
    document.getElementById("jumlah").value = "";
}

function tampilkanBarang() {
    let daftar = document.getElementById("daftarBarang");

    daftar.innerHTML = "";

    let totalBelanja = 0;

    barang.forEach(function(item, index) {
        totalBelanja += item.total;

        let baris = document.createElement("tr");

        let data = [
            item.nama,
            formatRupiah(item.harga),
            item.jumlah,
            formatRupiah(item.total)
        ];

        data.forEach(function(teks) {
            let kolom = document.createElement("td");
            kolom.textContent = teks;
            baris.appendChild(kolom);
        });

        let aksi = document.createElement("td");
        let tombol = document.createElement("button");

        tombol.textContent = "Hapus";
        tombol.className = "delete";

        tombol.onclick = function() {
            barang.splice(index, 1);
            tampilkanBarang();
        };

        aksi.appendChild(tombol);
        baris.appendChild(aksi);

        daftar.appendChild(baris);
    });

    document.getElementById("totalBelanja").textContent =
        formatRupiah(totalBelanja);
}

function resetBelanja() {
    if (barang.length === 0) {
        alert("Daftar penjualan masih kosong!");
        return;
    }

    if (confirm("Apakah Anda yakin ingin menghapus semua penjualan?")) {
        barang = [];
        tampilkanBarang();
    }
}

tampilkanBarang();
