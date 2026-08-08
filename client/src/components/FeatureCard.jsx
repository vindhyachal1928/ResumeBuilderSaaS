function FeatureCard({ icon, title, description }){
    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <div className="mb-4 text-blue-600">
                {icon}
            </div>

            <h3 className="mb-2 text-xl font-semibold">
                {title}
            </h3>

            <p className="text-gray-600">
                {description}
            </p>
        </div>
    );
}

export default FeatureCard;