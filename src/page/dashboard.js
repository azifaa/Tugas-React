import React, { useState, useEffect } from 'react';
import { Table, Card, Pagination, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Chart from 'react-apexcharts';

function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [originalPosts, setOriginalPosts] = useState([]);
    const [searchResult, setSearchResult] = useState(true);
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
                setOriginalPosts(result);
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        getData();
    }, []);

    const handleFilter = (event) => {
        const searchQuery = event.target.value.toLowerCase();
        const newData = originalPosts.filter(row => {
            const { nama, nik, alamat, kelas, gender } = row;
            const rowData = `${nama} ${nik} ${alamat} ${kelas} ${gender}`.toLowerCase();
            return rowData.includes(searchQuery);
        });
        setPosts(newData);
        setSearchResult(newData.length > 0);
    };

    const maleCount = posts.filter(row => row.gender === 'Laki-Laki').length;
    const femaleCount = posts.filter(row => row.gender === 'Perempuan').length;

    const genderChartSeries = [
        {
            name: 'Laki-Laki',
            data: [maleCount],
            color: '#1f77b4' // Blue for male
        },
        {
            name: 'Perempuan',
            data: [femaleCount],
            color: '#800080' // Purple for female
        }
    ];

    const genderChartOptions = {
        chart: {
            id: 'gender-chart',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        xaxis: {
            categories: ['Jumlah']
        },
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-3">
            <h1 className='text-center'>Dashboard</h1>
            <Row>
                <Col md={12}>
                    <Card style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.10)", marginBottom: "20px" }}>
                        <Card.Body>
                            <h2 className="text-center">Jumlah Siswa berdasarkan Gender</h2>
                            <Chart options={genderChartOptions} series={genderChartSeries} type="bar" height={350} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="mb-4">
                <input className='form-control' type="text" onChange={handleFilter} placeholder="Search" />
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>NIK</th>
                        <th>Alamat</th>
                        <th>Kelas</th>
                        <th>Gender</th>
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
                        </tr>
                    ))}
                </tbody>
            </Table>
            {currentPosts.length === 0 && (
                <p className="text-center">{searchResult ? "Tidak ada data terbaru" : "Data tidak ditemukan"}</p>
            )}
            <Pagination className="justify-content-center">
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    <FontAwesomeIcon icon={faChevronLeft} /> {/* Panah ke kiri */}
                </Pagination.Prev>
                {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(number => (
                    <Pagination.Item key={number} onClick={() => paginate(number + 1)} active={number + 1 === currentPage}>
                        {number + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(posts.length / postsPerPage)}>
                    <FontAwesomeIcon icon={faChevronRight} /> {/* Panah ke kanan */}
                </Pagination.Next>
            </Pagination>

        </div>
    );
}

export default Dashboard;