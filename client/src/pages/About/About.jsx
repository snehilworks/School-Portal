import React from "react";

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen bg-blue-300 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl text-center font-bold text-gray-900 mb-6">
            About Us
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            Welcome to Shivam Public School, a place of excellence in education
            and holistic development. With a rich history and a commitment to
            nurturing young minds, we stand as a beacon of knowledge and
            inspiration.
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl text-center font-semibold text-gray-900 mb-2">
                Our Vision
              </h2>
              <p className="text-gray-700">
                To empower students with quality education that fosters
                intellectual, social, and emotional growth, enabling them to
                contribute positively to society.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-center font-semibold text-gray-900 mb-2">
                Our Mission
              </h2>
              <p className="text-gray-700">
                Our mission is to provide a nurturing environment that promotes
                curiosity, critical thinking, creativity, and personal growth.
                We strive to instill values of integrity, empathy, and
                responsibility in every student.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-center font-semibold text-gray-900 mb-2">
                Core Values
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <span className="font-semibold">Excellence:</span> We uphold
                  high standards of academic and personal excellence.
                </li>
                <li>
                  <span className="font-semibold">Diversity:</span> We celebrate
                  diversity and respect differences among students and staff.
                </li>
                <li>
                  <span className="font-semibold">Innovation:</span> We
                  encourage innovative thinking and problem-solving.
                </li>
                <li>
                  <span className="font-semibold">Collaboration:</span> We
                  foster a culture of teamwork and collaboration.
                </li>
                <li>
                  <span className="font-semibold">Community:</span> We believe
                  in building a strong school-community partnership.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-center font-semibold text-gray-900 mb-2">
                Our Approach
              </h2>
              <p className="text-gray-700">
                At Shivam Public School, we emphasize a well-rounded education
                that goes beyond textbooks. Our approach integrates academic
                rigor with co-curricular activities, enabling students to
                develop a wide range of skills and interests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-center font-semibold text-gray-900 mb-2">
                Faculty & Staff
              </h2>
              <p className="text-gray-700">
                Our dedicated team of experienced educators is committed to
                providing the best possible learning experience for our
                students. Each member of our faculty brings a wealth of
                knowledge and passion to the classroom.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-center font-semibold text-gray-900 mb-2">
                Facilities
              </h2>
              <p className="text-gray-700">
                Our state-of-the-art campus is equipped with modern facilities
                to support academic and extracurricular activities. From
                well-equipped classrooms to libraries and sports facilities, we
                provide a conducive environment for holistic growth.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-center font-semibold text-gray-900 mb-2">
                Get in Touch
              </h2>
              <p className="text-gray-700">
                We welcome you to explore Shivam Public School further. If you
                have any questions or would like to learn more, please feel free
                to contact us. We look forward to being a part of your
                educational journey.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
