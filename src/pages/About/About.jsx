import React from "react";
import { Container, Card, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import "./AboutUs.css"; // Import the CSS file

const aboutUsContent = `
# About Us

Welcome to Shivam Public School, a place of excellence in education and holistic development. With a rich history and a commitment to nurturing young minds, we stand as a beacon of knowledge and inspiration.

## Our Vision

To empower students with quality education that fosters intellectual, social, and emotional growth, enabling them to contribute positively to society.

## Our Mission

Our mission is to provide a nurturing environment that promotes curiosity, critical thinking, creativity, and personal growth. We strive to instill values of integrity, empathy, and responsibility in every student.

## Core Values

- **Excellence:** We uphold high standards of academic and personal excellence.
- **Diversity:** We celebrate diversity and respect differences among students and staff.
- **Innovation:** We encourage innovative thinking and problem-solving.
- **Collaboration:** We foster a culture of teamwork and collaboration.
- **Community:** We believe in building a strong school-community partnership.

## Our Approach

At Shivam Public School, we emphasize a well-rounded education that goes beyond textbooks. Our approach integrates academic rigor with co-curricular activities, enabling students to develop a wide range of skills and interests.

## Faculty and Staff

Our dedicated team of experienced educators is committed to providing the best possible learning experience for our students. Each member of our faculty brings a wealth of knowledge and passion to the classroom.

## Facilities

Our state-of-the-art campus is equipped with modern facilities to support academic and extracurricular activities. From well-equipped classrooms to libraries and sports facilities, we provide a conducive environment for holistic growth.

## Get in Touch

We welcome you to explore Shivam Public School further. If you have any questions or would like to learn more, please feel free to contact us. We look forward to being a part of your educational journey.

[Contact Information]
`;

const AboutUs = () => {
  return (
    <Container maxWidth="lg" className="about-us-container">
      <Typography
        variant="h1"
        align="center"
        className="about-us-heading cursive-text"
      >
        About Us
      </Typography>
      <Card className="about-us-card">
        <ReactMarkdown>{aboutUsContent}</ReactMarkdown>
      </Card>
    </Container>
  );
};

export default AboutUs;
