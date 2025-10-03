import React from "react";
import ProjectCard from "./info/projectcard";
import { MyProjects } from "./info/projectinfo";

const Projects =() => {
    return(
        <section 
        id="projects"
         className="h-auto py-16 px-4 md:px-6 bg-white w-full overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
                Selected Projects
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                A preview of some of my recent work, showcasing my skills in web development, data analysis and Machine learning integration.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MyProjects.map((project) => (
                <ProjectCard
                    key={project.id}
                    image={project.image}
                    about={project.about}
                    title={project.title}
                    description={project.description}
                    techStack={project.techStack}
                />
            ))}
        </div>
           
            </section>
    )
}
export default Projects;