import React, { useState, useEffect } from 'react';
import { ProfileLayout } from './ProfileLayout';
import { Table, Button, Badge, Modal, Form, InputGroup } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaStar } from 'react-icons/fa';
import api from '../data/Axios';
import './ProfileLayout.css';

export const OrchidManagement = () => {
    const [orchids, setOrchids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentOrchid, setCurrentOrchid] = useState(null);
    const [modalMode, setModalMode] = useState('create');

    // Fetch orchids từ API
    useEffect(() => {
        fetchOrchids();
    }, []);

    const fetchOrchids = async () => {
        try {
            setLoading(true);
            const response = await api.get('/get-all-orchids');
            setOrchids(response.data);
            setError(null);
        } catch (err) {
            setError('Không thể tải danh sách hoa lan. Vui lòng thử lại sau!');
            console.error('Error fetching orchids:', err);
        } finally {
            setLoading(false);
        }
    };

    // Lọc orchid theo từ khóa tìm kiếm
    const filteredOrchids = orchids.filter(orchid => 
        orchid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orchid.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orchid.origin.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Khởi tạo orchid mới
    const initialOrchidState = {
        name: "",
        rating: 3,
        isSpecial: false,
        image: "/assets/img/default-orchid.jpg",
        color: "",
        origin: "",
        category: "",
        marketValue: "€0",
        likes: 0,
        video: ""
    };

    // Xử lý thêm orchid mới
    const handleAddOrchid = () => {
        setCurrentOrchid(initialOrchidState);
        setModalMode('create');
        setShowModal(true);
    };

    // Xử lý cập nhật orchid
    const handleUpdateOrchid = (orchid) => {
        setCurrentOrchid(orchid);
        setModalMode('update');
        setShowModal(true);
    };

    // Xử lý xóa orchid
    const handleDeleteOrchid = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa hoa lan này?')) {
            try {
                await api.delete(`/get-all-orchids/${id}`);
                setOrchids(orchids.filter(orchid => orchid.id !== id));
                alert('Xóa hoa lan thành công!');
            } catch (err) {
                alert('Không thể xóa hoa lan. Vui lòng thử lại sau!');
                console.error('Error deleting orchid:', err);
            }
        }
    };

    // Xử lý lưu orchid (thêm mới hoặc cập nhật)
    const handleSaveOrchid = async () => {
        try {
            if (modalMode === 'create') {
                const response = await api.post('/get-all-orchids', currentOrchid);
                setOrchids([...orchids, response.data]);
                alert('Thêm hoa lan mới thành công!');
            } else {
                const response = await api.put(`/get-all-orchids/${currentOrchid.id}`, currentOrchid);
                setOrchids(orchids.map(orchid => 
                    orchid.id === currentOrchid.id ? response.data : orchid
                ));
                alert('Cập nhật hoa lan thành công!');
            }
            setShowModal(false);
        } catch (err) {
            alert('Không thể lưu thông tin hoa lan. Vui lòng thử lại sau!');
            console.error('Error saving orchid:', err);
        }
    };

    // Xử lý thay đổi giá trị trong form
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentOrchid({
            ...currentOrchid,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Loading state
    if (loading) {
        return (
            <ProfileLayout>
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Đang tải...</span>
                    </div>
                </div>
            </ProfileLayout>
        );
    }

    // Error state
    if (error) {
        return (
            <ProfileLayout>
                <div className="alert alert-danger m-4" role="alert">
                    {error}
                </div>
            </ProfileLayout>
        );
    }

    return (
        <ProfileLayout>
            <div className="container py-4 dark-mode-bg">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="dark-mode-text">Quản lý Hoa Lan</h2>
                    <Button variant="success" onClick={handleAddOrchid}>
                        <FaPlus className="me-2" /> Thêm Hoa Lan Mới
                    </Button>
                </div>

                {/* Search Bar */}
                <InputGroup className="mb-4">
                    <InputGroup.Text>
                        <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Tìm kiếm theo tên, loại, xuất xứ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>

                {/* Orchids Table */}
                <div className="table-responsive orchid-table">
                    <Table striped bordered hover>
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Origin</th>
                                <th>Color</th>
                                <th>Rating</th>
                                <th>Special</th>
                                <th>Market Value</th>
                                <th>Likes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrchids.map(orchid => (
                                <tr key={orchid.id}>
                                    <td style={{ width: '80px' }}>
                                        <img 
                                            src={orchid.image} 
                                            alt={orchid.name} 
                                            className="img-thumbnail" 
                                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/60';
                                            }}
                                        />
                                    </td>
                                    <td>{orchid.name}</td>
                                    <td>{orchid.category}</td>
                                    <td>{orchid.origin}</td>
                                    <td>
                                        <span 
                                            className="d-inline-block rounded-circle me-2" 
                                            style={{ 
                                                backgroundColor: orchid.color.toLowerCase(), 
                                                width: '20px', 
                                                height: '20px',
                                                border: '1px solid #ddd'
                                            }}
                                        ></span>
                                        {orchid.color}
                                    </td>
                                    <td>
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <FaStar 
                                                key={index} 
                                                className={index < orchid.rating ? "text-warning" : "text-muted"}
                                            />
                                        ))}
                                    </td>
                                    <td className="text-center">
                                        {orchid.isSpecial ? 
                                            <Badge bg="danger">Special</Badge> : 
                                            <Badge bg="secondary">Regular</Badge>
                                        }
                                    </td>
                                    <td className="text-primary fw-bold">{orchid.marketValue}</td>
                                    <td>{orchid.likes}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button 
                                                variant="outline-primary" 
                                                size="sm"
                                                onClick={() => handleUpdateOrchid(orchid)}
                                            >
                                                <FaEdit />
                                            </Button>
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm"
                                                onClick={() => handleDeleteOrchid(orchid.id)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {/* Create/Update Modal */}
                <Modal 
                    show={showModal} 
                    onHide={() => setShowModal(false)} 
                    size="lg"
                    centered
                    dialogClassName="custom-modal"
                >
                    <Modal.Header closeButton className="border-bottom">
                        <Modal.Title>
                            {modalMode === 'create' ? 'Thêm Hoa Lan Mới' : 'Cập Nhật Hoa Lan'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body-custom">
                        <Form>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="name" 
                                            value={currentOrchid?.name || ''} 
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="category" 
                                            value={currentOrchid?.category || ''} 
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Origin</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="origin" 
                                            value={currentOrchid?.origin || ''} 
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Color</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="color" 
                                            value={currentOrchid?.color || ''} 
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Market Value</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="marketValue" 
                                            value={currentOrchid?.marketValue || ''} 
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Rating (1-5)</Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            name="rating" 
                                            min="1" 
                                            max="5" 
                                            value={currentOrchid?.rating || 3} 
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Image URL</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="image" 
                                            value={currentOrchid?.image || ''} 
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Video URL</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="video" 
                                            value={currentOrchid?.video || ''} 
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <Form.Group className="mb-3">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Special Orchid" 
                                    name="isSpecial" 
                                    checked={currentOrchid?.isSpecial || false} 
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="border-top">
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="primary" onClick={handleSaveOrchid}>
                            {modalMode === 'create' ? 'Thêm' : 'Cập nhật'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </ProfileLayout>
    );
};