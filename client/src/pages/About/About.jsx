import React from "react";
import { Container, Card, Typography } from "@mui/material";

const styles = {
  bold_pointer: "font-semibold text-[18px] laptop:text-[24px] mt-2",
};

const AboutUs = () => {
  return (
    <div className="w-full h-full bg-white">
      <div className="component-container flex flex-col gap-2 items-start">
        <p className="mb-2 laptop:mb-4 font-bold text-[30px] laptop:text-[40px]">About Us</p>

        <p>Welcome to Shivam Public School, a place of excellence in education and holistic development. With a rich history and a commitment to nurturing young minds, we stand as a beacon of knowledge and inspiration.</p>

        <p className={`${styles.bold_pointer}`}>Our Vission</p>
        <p>To empower students with quality education that fosters intellectual, social, and emotional growth, enabling them to contribute positively to society.</p>

        <p className={`${styles.bold_pointer}`}>Our mission</p>
        <p>Our mission is to provide a nurturing environment that promotes curiosity, critical thinking, creativity, and personal growth. We strive to instill values of integrity, empathy, and responsibility in every student.</p>

        <p className={`${styles.bold_pointer}`}>Core values</p>
        <div>
          <p>
            <span className="font-semibold mr-2">Excellence:</span> We uphold high standards of academic and personal excellence.
          </p>
          <p>
            <span className="font-semibold mr-2">Diversity:</span> We celebrate diversity and respect differences among students and staff.
          </p>
          <p>
            <span className="font-semibold mr-2">Innovation:</span> We encourage innovative thinking and problem-solving.
          </p>
          <p>
            <span className="font-semibold mr-2">Collaboration:</span> We foster a culture of teamwork and collaboration.
          </p>
          <p>
            <span className="font-semibold mr-2">Community:</span> We believe in building a strong school-community partnership.
          </p>
        </div>
        <p className={`${styles.bold_pointer}`}>Our Approach</p>
        <p>At Shivam Public School, we emphasize a well-rounded education that goes beyond textbooks. Our approach integrates academic rigor with co-curricular activities, enabling students to develop a wide range of skills and interests.</p>

        <p className={`${styles.bold_pointer}`}>Faculty & Staff</p>
        <p>Our dedicated team of experienced educators is committed to providing the best possible learning experience for our students. Each member of our faculty brings a wealth of knowledge and passion to the classroom.</p>

        <p className={`${styles.bold_pointer}`}>Facilities</p>
        <p>Our state-of-the-art campus is equipped with modern facilities to support academic and extracurricular activities. From well-equipped classrooms to libraries and sports facilities, we provide a conducive environment for holistic growth.</p>

        <p className={`${styles.bold_pointer}`}>Get in touch</p>
        <p className="pb-[40px]">We welcome you to explore Shivam Public School further. If you have any questions or would like to learn more, please feel free to contact us. We look forward to being a part of your educational journey.</p>
      </div>
    </div>
  );
};

export default AboutUs;
