import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom'; 

function Edit() {
    const [student, setStudent] = useState({
        nama: "",
        kelas: "",
        nik: "",
        alamat: "",
        gender: "",
    });

    const { id } = useParams();

    useEffect(() => {
        getStudent();
    }, []);

    const getStudent = async () => {
        try {
            const response = await axios.get(`http://localhost:3030/siswa/${id}`);
            setStudent(response.data);
        } catch (error) {
            console.error("Error fetching student:", error);
        }
    };

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
            Swal.fire({
                icon: 'question',
                title: 'Yakin ingin menyimpan perubahan?',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak'
            }).then((result) => {
                if (result.isConfirmed) {
                    updateStudent();
                }
            });
        } else {
            console.log("All fields are required");
        }
    };

    const updateStudent = async () => {
        try {
            await axios.put(`http://localhost:3030/siswa/${id}`, student);
            Swal.fire({
                icon: 'success',
                title: 'Sukses',
                text: 'Student updated successfully',
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "/siswa";
            });
        } catch (error) {
            console.error("Error updating student:", error);
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
            <h2 className="text-center mb-4">Edit Data Siswa</h2>
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
                <div className="text-center mt-3">
                    <button type="submit" className="btn btn-primary">
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Edit;