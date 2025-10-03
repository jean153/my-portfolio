const FunFactCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:scale-105 transition transform gap-2">
      <span className="text-purple-600 text-3xl">{icon}</span>
      <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 text-center">{description}</p>
    </div>
  );
};
 
export default FunFactCard;