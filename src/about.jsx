import React from "react";
import FunFactCard from "./info/cards";
import { funFacts } from "./info/info";

const About = () => {
  return (
    <section
      id="about"
      className="h-auto py-16 px-4 md:px-6 bg-gray-50 w-full overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-start md:gap-8 lg:gap-12 max-w-6xl mx-auto">
        {/* Profile + Bio */}
        <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col items-center space-y-4">
          <img
            src="profile.jpg"
            alt="profile picture"
            className="rounded-full w-40 h-40 object-cover border-4 shadow-lg"
          />
            <h2 className="text-3xl font-bold text-gray-800">About Me</h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center md:text-left">
           I am a software developer and data enthusiast based in Kenya, specializing in full-stack development, data analysis, and machine learning. With hands-on experience in Node.js,Python ,MySQL ,R, Reactjs,Threejs and Tailwind CSS, I build responsive, dynamic applications and data-driven solutions.
           A problem-solver with a strong foundation in algorithms, database design, and AI concepts, I am passionate about translating complex technical challenges into practical, scalable solutions. I also balance my technical work with a disciplined approach to personal growth and sports, reflecting his dedication, focus, and perseverance.
          </p>
        </div>

        {/* Fun Fact Cards - Stacked vertically */}
        <div className="md:w-1/2 w-full flex flex-col gap-6">
          {funFacts.map((fact) => (
            <FunFactCard
              key={fact.id}
              icon={fact.icon}
              title={fact.title}
              description={fact.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;