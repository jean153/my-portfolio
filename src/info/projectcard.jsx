const ProjectCard = ({ image,about,title, description, techStack}) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:scale-105 transition transform gap-2">
      <img src={image} alt={about} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 text-center">{description}</p>
      <p className="text-sm text-gray-500 text-center mt-2">{techStack}</p>
    </div>
  );
};
 
export default ProjectCard;