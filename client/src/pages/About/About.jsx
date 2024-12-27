import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

const AboutUs = () => {
  // State to manage visibility of sections
  const [visibleSections, setVisibleSections] = useState({
    vision: false,
    mission: false,
    coreValues: false,
    approach: false,
    faculty: false,
    facilities: false,
    contact: false,
  });

  // Handler to set visibility after a delay
  const setVisibilityWithDelay = (section) => {
    setTimeout(() => {
      setVisibleSections((prev) => ({ ...prev, [section]: true }));
    }, 500); // Reduced to 500ms delay
  };

  // IntersectionObserver hooks for each section
  const { ref: visionRef, inView: visionInView } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) setVisibilityWithDelay("vision");
    },
  });

  const { ref: missionRef, inView: missionInView } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) setVisibilityWithDelay("mission");
    },
  });

  const { ref: coreValuesRef, inView: coreValuesInView } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) setVisibilityWithDelay("coreValues");
    },
  });

  const { ref: approachRef, inView: approachInView } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) setVisibilityWithDelay("approach");
    },
  });

  const { ref: facultyRef, inView: facultyInView } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) setVisibilityWithDelay("faculty");
    },
  });

  const { ref: facilitiesRef, inView: facilitiesInView } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) setVisibilityWithDelay("facilities");
    },
  });

  const { ref: contactRef, inView: contactInView } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) setVisibilityWithDelay("contact");
    },
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-blue-500 py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="bg-white p-8 rounded-lg shadow-xl space-y-8 font-serif">
          {/* Welcome Message */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-extrabold text-sky-800 tracking-wide leading-tight">
              Welcome to Shivam Public School
            </h1>
            <hr className="border border-gray-300" />
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              A place of excellence in education and holistic development. With
              a rich history and a commitment to nurturing young minds, we stand
              as a beacon of knowledge and inspiration.
            </p>
          </div>

          {/* Vision Section */}
          <section
            ref={visionRef}
            className={`${
              visibleSections.vision
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            } transition-all duration-500 ease-in-out`}
          >
            <h2 className="text-4xl font-semibold text-center text-sky-600 mb-6">
              Our Vision
            </h2>
            <p className="text-lg text-gray-700 text-center leading-relaxed max-w-3xl mx-auto">
              To empower students with quality education that fosters
              intellectual, social, and emotional growth, enabling them to
              contribute positively to society.
            </p>
          </section>

          {/* Mission Section */}
          <section
            ref={missionRef}
            className={`${
              visibleSections.mission
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            } transition-all duration-500 ease-in-out`}
          >
            <h2 className="text-4xl font-semibold text-center text-sky-600 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 text-center leading-relaxed max-w-3xl mx-auto">
              Our mission is to provide a nurturing environment that promotes
              curiosity, critical thinking, creativity, and personal growth. We
              strive to instill values of integrity, empathy, and responsibility
              in every student.
            </p>
          </section>

          {/* Core Values Section */}
          <section
            ref={coreValuesRef}
            className={`${
              visibleSections.coreValues
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            } transition-all duration-500 ease-in-out`}
          >
            <h2 className="text-4xl font-semibold text-center text-sky-600 mb-6">
              Core Values
            </h2>
            <ul className="list-disc text-start md:ml-24 pl-8 space-y-4 text-lg text-gray-700">
              <li>
                <strong className="text-blue-600">Excellence:</strong> We uphold
                high standards of academic and personal excellence.
              </li>
              <li>
                <strong className="text-blue-600">Diversity:</strong> We
                celebrate diversity and respect differences among students and
                staff.
              </li>
              <li>
                <strong className="text-blue-600">Innovation:</strong> We
                encourage innovative thinking and problem-solving.
              </li>
              <li>
                <strong className="text-blue-600">Collaboration:</strong> We
                foster a culture of teamwork and collaboration.
              </li>
              <li>
                <strong className="text-blue-600">Community:</strong> We believe
                in building a strong school-community partnership.
              </li>
            </ul>
          </section>

          {/* Approach Section */}
          <section
            ref={approachRef}
            className={`${
              visibleSections.approach
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            } transition-all duration-500 ease-in-out`}
          >
            <h2 className="text-4xl font-semibold text-center text-sky-600 mb-6">
              Our Approach
            </h2>
            <p className="text-lg text-gray-700 text-center leading-relaxed max-w-3xl mx-auto">
              At Shivam Public School, we emphasize a well-rounded education
              that goes beyond textbooks. Our approach integrates academic rigor
              with co-curricular activities, enabling students to develop a wide
              range of skills and interests.
            </p>
          </section>

          {/* Faculty Section */}
          <section
            ref={facultyRef}
            className={`${
              visibleSections.faculty
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            } transition-all duration-500 ease-in-out`}
          >
            <h2 className="text-4xl font-semibold text-center text-sky-600 mb-6">
              Faculty & Staff
            </h2>
            <p className="text-lg text-gray-700 text-center leading-relaxed max-w-3xl mx-auto">
              Our dedicated team of experienced educators is committed to
              providing the best possible learning experience for our students.
              Each member of our faculty brings a wealth of knowledge and
              passion to the classroom.
            </p>
          </section>

          {/* Facilities Section */}
          <section
            ref={facilitiesRef}
            className={`${
              visibleSections.facilities
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            } transition-all duration-500 ease-in-out`}
          >
            <h2 className="text-4xl font-semibold text-center text-sky-600 mb-6">
              Facilities
            </h2>
            <p className="text-lg text-gray-700 text-center leading-relaxed max-w-3xl mx-auto">
              Our state-of-the-art campus is equipped with modern facilities to
              support academic and extracurricular activities. From
              well-equipped classrooms to libraries and sports facilities, we
              provide a conducive environment for holistic growth.
            </p>
          </section>

          {/* Contact Section */}
          <section
            ref={contactRef}
            className={`${
              visibleSections.contact
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            } transition-all duration-500 ease-in-out`}
          >
            <h2 className="text-4xl font-semibold text-center text-sky-600 mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-700 text-center leading-relaxed max-w-3xl mx-auto">
              If you have any questions or would like to learn more about our
              school, please feel free to contact us. We would love to hear from
              you.
            </p>
            <div className="flex justify-center space-x-6 mt-6">
              <a
                href="mailto:shivampublic@gmail.com"
                className="text-blue-500 font-semibold p-2 rounded-md bg-slate-100 border border-gray-500 hover:bg-blue-100 hover:underline"
              >
                Email Us
              </a>
              <a
                href="tel:+912828312332"
                className="text-blue-500 font-semibold p-2 rounded-md bg-slate-100 border border-gray-500 hover:bg-blue-100 hover:underline"
              >
                Call Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
