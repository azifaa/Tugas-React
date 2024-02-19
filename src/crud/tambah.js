import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function Tambah() {
    const [student, setStudent] = useState({
        nama: "",
        kelas: "",
        nik: "",
        alamat: "",
        gender: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateInputs()) {
            // Tampilkan SweetAlert konfirmasi sebelum menambahkan data
            Swal.fire({
                icon: 'question',
                title: 'Yakin ingin menambah data?',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Jika pengguna menekan tombol "Ya"
                    addStudent();
                }
            });
        } else {
            // Tampilkan peringatan jika ada data yang belum diisi
            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Isi semua data terlebih dahulu',
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false
            });
        }
    };

    const addStudent = async () => {
        try {
            await axios.post("http://localhost:3030/siswa", student);
            console.log("Berhasil menambah data");
            // Tampilkan SweetAlert "Student added successfully"
            Swal.fire({
                icon: 'success',
                title: 'Sukses',
                text: 'Berhasil menambah data',
                timer: 1500, // Menutup SweetAlert setelah 1500 ms
                timerProgressBar: true, // Menampilkan progress bar
                showConfirmButton: false // Menyembunyikan tombol OK
            }).then(() => {
                window.location.href = "/siswa";
            });
        } catch (error) {
            console.error("Kesalahan saat mengisi data:", error);
            // Handle error here if needed
        }
    };

    const validateInputs = () => {
        const { nama, kelas, nik, alamat, gender } = student;
        return (
            nama.trim() !== "" &&
            kelas.trim() !== "" &&
            nik.trim() !== "" &&
            alamat.trim() !== "" &&
            gender.trim() !== ""
        );
    };

    return (
        <div className="container mt-5">
            <h2>Tambah Data Siswa</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nama:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nama"
                        value={student.nama}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Kelas:</label>
                    <select
                        className="form-control"
                        name="kelas"
                        value={student.kelas}
                        onChange={handleChange}
                    >
                        <option value="">Pilih Kelas</option>
                        <option value="X TKJ">X TKJ</option>
                        <option value="XI TKJ">XI TKJ</option>
                        <option value="XII TKJ">XII TKJ</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>NIK:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nik"
                        value={student.nik}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Alamat:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="alamat"
                        value={student.alamat}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <select
                        className="form-control"
                        name="gender"
                        value={student.gender}
                        onChange={handleChange}
                    >
                        <option value="">Pilih Gender</option>
                        <option value="Laki-Laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Tambah
                </button>
            </form>
        </div>
    );
}

export default Tambah;