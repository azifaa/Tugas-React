import React, { useState, useEffect } from 'react';
import { Button, Table, Card, Pagination } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

function Siswa() {
    const [posts, setPosts] = useState([]);
    const [records, setRecords] = useState([]);
    const [searchResult, setSearchResult] = useState(true); // Menyimpan status hasil pencarian
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const getData = () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        fetch("http://localhost:3030/siswa", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setPosts(result);
                setRecords(result);
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            icon: 'question',
            title: 'Yakin ingin menghapus data?',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const requestOptions = {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                    };
                    await fetch(`http://localhost:3030/siswa/${id}`, requestOptions);
                    const updatedRecords = records.filter(record => record.id !== id);
                    setRecords(updatedRecords);
                    setSearchResult(updatedRecords.length > 0); // Perbarui status hasil pencarian
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Berhasil menghapus data',
                        timer: 1500,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                } catch (error) {
                    console.error('Kesalahan saat menghapus data:', error);
                }
            }
        });
    };

    function handleFilter(event) {
        const searchQuery = event.target.value.toLowerCase();
        const newData = posts.filter(row => {
            const { nama, nik, alamat, kelas, gender } = row;
            const rowData = `${nama} ${nik} ${alamat} ${kelas} ${gender}`.toLowerCase();
            return rowData.includes(searchQuery);
        });
        setRecords(newData);
        setSearchResult(newData.length > 0); // Perbarui status hasil pencarian
    }

    // Menghitung indeks data pada halaman saat ini
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = records.slice(indexOfFirstPost, indexOfLastPost);

    // Mengubah halaman
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-5">
            <h1 className='text-center'>Siswa</h1>
            <div className="text-end mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <Button href={`/tambah`} className="btn btn-primary" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <input type="text" onChange={handleFilter} placeholder="Search" />
                </div>
            </div>
            <Card>
                <Card.Body>
                    {records.length === 0 ? (
                        <p className="text-center">{searchResult ? "Tidak ada data terbaru" : "Data tidak ditemukan"}</p>
                    ) : (
                        <>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama</th>
                                        <th>NIK</th>
                                        <th>Alamat</th>
                                        <th>Kelas</th>
                                        <th>Gender</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPosts.map((row, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{row.nama}</td>
                                            <td>{row.nik}</td>
                                            <td>{row.alamat}</td>
                                            <td>{row.kelas}</td>
                                            <td>{row.gender}</td>
                                            <td>
                                                <Button href={`/edit/${row.id}`} variant="warning" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.10)', borderBottom: '2px solid #000' }}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>{' '}
                                                <Button variant="danger" onClick={() => handleDelete(row.id)} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.10)', borderBottom: '2px solid #000' }}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </Button>{' '}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Pagination className="justify-content-center">
                                {[...Array(Math.ceil(records.length / postsPerPage)).keys()].map(number => (
                                    <Pagination.Item key={number} onClick={() => paginate(number + 1)} active={number + 1 === currentPage}>
                                        {number + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        </>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}

export default Siswa;