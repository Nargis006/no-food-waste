import { Heart } from 'lucide-react';

export function HeroBanner() {
  return (
    <div className="relative rounded-2xl overflow-hidden h-48 md:h-64">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')`,
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-emerald-800/70 to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-6 md:px-10">
        <div className="flex items-center gap-2 text-emerald-200 mb-2">
          <Heart className="w-5 h-5" />
          <span className="text-sm font-medium">NOFoodWaste</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
          Saving Food, Serving Humanity
        </h1>
        <p className="text-emerald-100 text-sm md:text-base max-w-xl hidden sm:block">
          Together we can make a difference. Every meal saved feeds a family in need.
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="300" cy="100" r="100" fill="white" />
          <circle cx="350" cy="250" r="80" fill="white" />
        </svg>
      </div>
    </div>
  );
}

export default HeroBanner;
