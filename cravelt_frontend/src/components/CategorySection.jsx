import { motion } from "framer-motion";


function CategoryCard({ name, icon: Icon, image, color, onClick }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="cursor-pointer"
        >
            <div className={`relative rounded-2xl overflow-hidden h-40 ${color} shadow-md hover:shadow-xl transition-all duration-300`}>
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img src={image} alt={name} className="w-full h-full object-cover opacity-30" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-white p-4">
                    <Icon className="w-10 h-10 mb-2" />
                    <h3 className="font-semibold text-lg text-center">{name}</h3>
                </div>
            </div>
        </motion.div>
    );
}
export default CategoryCard;