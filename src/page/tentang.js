import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from "framer-motion";
// import binus2 from '../asset/binus2.png';

function Tentang() {
    return (
        <Container>
            <Row className="mt-5">
                <h1 className='text-center'>Tentang</h1>
                <Row className="justify-content-center mb-4">
                    <motion.img
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        // src={binus2} // Ganti dengan path atau URL gambar Anda
                        alt="Gambar"
                        style={{ maxWidth: '100%', maxHeight: '500px' }} // Mengatur ukuran maksimum gambar
                    />
                </Row>
                <Col md={6}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                        <p style={{ fontWeight: 'bold' }}>Sejarah</p>
                        <p>SMK BINA NUSANTARA SEMARANG adalah sekolah menenengah kejuruan yang berdiri pada tanggal 18 mei 2010 dibawah Yayasan Bina Nusantara yang di ketuai Drs.Sugiyono,M.M dan Sugiyarto,S.Kom, M.M.</p>
                        <p>SMK BINA NUSANTARA SEMARANG beralamat di jl.Kemantren No.5 wonosari Ngaliyan Semarang. Dengan luas lokasi  4004 m2, sarana dan prasarana yang memadai, suasana belajar yang nyaman karena berada di tengah perkamampungan masyarakat yang jauh dari kebisingan.</p>
                        <p>Jumlah siswa SMK BINA NUSANTARA mengalami peningkatan dari tahun ketahun. Mayoritas siswa berasal dari lingkungan sekitar, Kota Semarang, dan luar Semarang. Siswa berasal dari keluarga dengan perekonomian menengah kebawah.</p>
                    </motion.div>
                </Col>
                <Col md={6}>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                        <p style={{ fontWeight: 'bold' }}>Tujuan</p>
                        <ol>
                            <li>Mempersiapkan tamatan yang memiliki kepribadian dan berakhlak mulia sebagai tenaga kerja tingkat menengah yang kompeten sesuai program keahlian pilihannya</li>
                            <li>Membekali peserta didik untuk berkarir, mandiri yang mampu beradaptasi dilingkungan kerja sesuai bidangnya dan mampu menghadapi perubahan yang terjadi di masyarakat.</li>
                            <li>Membekali peserta didik sikap profesional untuk mengembangkan diri dan mampu berkompetisi di tingkat nasional, regional dan internasional.</li>
                        </ol>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );
}

export default Tentang;