import React from 'react';
import { ProfileLayout } from './ProfileLayout';
import { Card, Row, Col, ListGroup, Badge, Button } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaUserCircle } from 'react-icons/fa';

export const Profile = () => {
    // Dữ liệu giả cho profile
    const profileData = {
        name: "Khoa Trần",
        email: "tkhoa1122@gmail.com",
        phone: "+84 379 920 700",
        address: "123 Nguyen Hue Street, District 1, Ho Chi Minh City",
        birthdate: "15/05/1990",
        bio: "Passionate orchid collector and enthusiast with over 10 years of experience in growing and caring for rare orchid species. I specialize in Cattleya and Phalaenopsis varieties.",
        memberSince: "January 2020",
        avatar: "assets/img/avatar.jpg",
        stats: {
            orchidsOwned: 42,
            contributions: 156,
            followers: 89,
            following: 64
        },
        recentActivity: [
            { id: 1, action: "Added a new orchid", date: "2 days ago", item: "Phalaenopsis Delight" },
            { id: 2, action: "Commented on", date: "5 days ago", item: "Vanda Blue" },
            { id: 3, action: "Liked", date: "1 week ago", item: "Cattleya Queen" },
            { id: 4, action: "Shared a post about", date: "2 weeks ago", item: "Orchid care tips" }
        ]
    };

    return (
        <ProfileLayout>
            <div className="container py-4">
                <h2 className="mb-4 dark-mode-text">My Profile</h2>
                
                <Row>
                    {/* Left Column - Profile Info */}
                    <Col md={4}>
                        <Card className="mb-4 shadow-sm">
                            <Card.Body className="text-center">
                                <div className="mb-3">
                                    <img 
                                        src={profileData.avatar} 
                                        alt="Profile Avatar" 
                                        className="rounded-circle img-fluid" 
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/150';
                                        }}
                                    />
                                </div>
                                <h4 className="dark-mode-text">{profileData.name}</h4>
                                <p className="text-muted">Orchid Enthusiast</p>
                                <p className="small text-muted">
                                    <FaCalendarAlt className="me-2" />
                                    Member since {profileData.memberSince}
                                </p>
                                <Button variant="outline-primary" size="sm" className="mt-2">
                                    <FaEdit className="me-2" />
                                    Edit Profile
                                </Button>
                            </Card.Body>
                        </Card>

                        <Card className="mb-4 shadow-sm">
                            <Card.Header className="dark-mode-bg">Contact Information</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="dark-mode-bg">
                                    <FaEnvelope className="me-2 text-primary" />
                                    {profileData.email}
                                </ListGroup.Item>
                                <ListGroup.Item className="dark-mode-bg">
                                    <FaPhone className="me-2 text-primary" />
                                    {profileData.phone}
                                </ListGroup.Item>
                                <ListGroup.Item className="dark-mode-bg">
                                    <FaMapMarkerAlt className="me-2 text-primary" />
                                    {profileData.address}
                                </ListGroup.Item>
                                <ListGroup.Item className="dark-mode-bg">
                                    <FaCalendarAlt className="me-2 text-primary" />
                                    Born: {profileData.birthdate}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>

                        <Card className="shadow-sm">
                            <Card.Header className="dark-mode-bg">Statistics</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="d-flex justify-content-between align-items-center dark-mode-bg">
                                    Orchids Owned
                                    <Badge bg="primary" pill>{profileData.stats.orchidsOwned}</Badge>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center dark-mode-bg">
                                    Contributions
                                    <Badge bg="success" pill>{profileData.stats.contributions}</Badge>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center dark-mode-bg">
                                    Followers
                                    <Badge bg="info" pill>{profileData.stats.followers}</Badge>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center dark-mode-bg">
                                    Following
                                    <Badge bg="secondary" pill>{profileData.stats.following}</Badge>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>

                    {/* Right Column - Bio and Activity */}
                    <Col md={8}>
                        <Card className="mb-4 shadow-sm">
                            <Card.Header className="dark-mode-bg">About Me</Card.Header>
                            <Card.Body className="dark-mode-bg">
                                <p className="dark-mode-text">{profileData.bio}</p>
                            </Card.Body>
                        </Card>

                        <Card className="shadow-sm">
                            <Card.Header className="dark-mode-bg">Recent Activity</Card.Header>
                            <ListGroup variant="flush">
                                {profileData.recentActivity.map(activity => (
                                    <ListGroup.Item key={activity.id} className="dark-mode-bg">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h6 className="mb-1 dark-mode-text">
                                                {activity.action} <span className="text-primary">{activity.item}</span>
                                            </h6>
                                            <small className="text-muted">{activity.date}</small>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Card.Footer className="text-center dark-mode-bg">
                                <Button variant="link" size="sm" className="dark-mode-text">View All Activity</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        </ProfileLayout>
    );
};