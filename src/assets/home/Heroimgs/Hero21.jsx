import hero from "../../../assets/HeroImgs/HeroImg.png";
import heroMobile2 from "../../../assets/Heroimgs/herommain.png";

const Hero = () => {
  return (
    <section className="w-full bg-[#f2f0f1]">
      {/* Main container with mobile-first padding for cleaner code */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10  lg:px-[100px]">
      <div className="hidden md:block relative text-black h-[663px]">
          {/* Background Image */}
          <img
            src={hero}
            alt="Models wearing stylish clothes"
            className="h-full"
          />

          {/* Absolute Overlay Container */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-16 xl:p-20 2xl:p-24">
            {/* Top Content: Heading, Paragraph, Button */}
            <div className="w-1/2 h-full flex flex-col justify-between">
              {/* Responsive heading with better breakpoints */}
              <h1 className="text-[clamp(1.25rem,3.5vw,2rem)] md:text-[clamp(1.5rem,3vw,2.25rem)] lg:text-[clamp(1.75rem,2.5vw,2.5rem)] xl:text-[clamp(2rem,2vw,2.75rem)] 2xl:text-[clamp(2.25rem,1.8vw,3rem)] font-family-integral font-semibold uppercase leading-tight tracking-tighter">
                Find Clothes <br />That Matches <br />Your Style
              </h1>
              <p className="text-[clamp(0.875rem,1.5vw,1rem)] font-family-satoshi font-extralight">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
              <button className="bg-black rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center w-[210px] h-[52px]">
                <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-white font-family-satoshi font-light">
                  Shop Now
                </p>
              </button>

              {/* Bottom Content: Stats */}
              <div className="flex gap-8 mt-8"> {/* You can retain the gap here */}
                <div>
                  <p className="text-[clamp(1.125rem,2vw,1.5rem)] font-family-satoshi font-semibold">200+</p>
                  <p className="text-[clamp(0.75rem,1vw,0.875rem)] tracking-wide font-family-satoshi font-extralight">International Brands</p>
                </div>
                <div>
                  <p className="text-[clamp(1.125rem,2vw,1.5rem)] font-family-satoshi font-semibold">2,000+</p>
                  <p className="text-[clamp(0.75rem,1vw,0.875rem)] tracking-wide font-family-satoshi font-extralight">High-Quality Products</p>
                </div>
                <div>
                  <p className="text-[clamp(1.125rem,2vw,1.5rem)] font-family-satoshi font-semibold">30,000+</p>
                  <p className="text-[clamp(0.75rem,1vw,0.875rem)] tracking-wide font-family-satoshi font-extralight">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>  

        {/* Mobile  */}
        <div className="relative w-full h-auto hidden max-[768px]:flex flex-col bg-[#f0f1f2] pt-8 px-6">
          {/* Top Content */}
          <div className="text-left">
            <h1 className="font-integral font-bold text-[clamp(1.5rem,8vw,2.25rem)] leading-tight text-black mb-4">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p className="font-satoshi text-[clamp(0.75rem,3vw,0.875rem)] text-black/60 leading-relaxed mb-6 max-w-[358px]">
              Browse through our diverse range of meticulously crafted
              garments...
            </p>
            <button className="bg-black text-white font-satoshi font-medium text-[clamp(0.875rem,3vw,1rem)] px-[clamp(2rem,8vw,3.375rem)] py-[clamp(0.75rem,3vw,1rem)] rounded-[62px] hover:bg-gray-800 transition-colors mb-4 w-full">
              Shop Now
            </button>
          </div>

          {/* Bottom Statistics */}
          <div className="bg-[#f0f1f2] backdrop-blur-sm rounded-[20px] mt-8">
            <div className="flex flex-wrap justify-center items-center gap-y-4">
              {/* First row with two items */}
              <div className="flex w-full justify-around items-center">
                <div className="text-center">
                  <h3 className="font-satoshi font-bold text-[clamp(1rem,4vw,1.25rem)] text-black">
                    200+
                  </h3>
                  <p className="font-satoshi text-[clamp(0.625rem,2.5vw,0.75rem)] text-black/60">
                    International Brands
                  </p>
                </div>
                <div className="w-[1px] h-[40px] bg-black/10"></div>
                <div className="text-center">
                  <h3 className="font-satoshi font-bold text-[clamp(1rem,4vw,1.25rem)] text-black">
                    2,000+
                  </h3>
                  <p className="font-satoshi text-[clamp(0.625rem,2.5vw,0.75rem)] text-black/60">
                    High-Quality Products
                  </p>
                </div>
              </div>
              {/* Second row with one item */}
              <div className="text-center">
                <h3 className="font-satoshi font-bold text-[clamp(1rem,4vw,1.25rem)] text-black">
                  30,000+
                </h3>
                <p className="font-satoshi text-[clamp(0.625rem,2.5vw,0.75rem)] text-black/60">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>

          {/* Hero image at the end */}
          <div className="bg-[#f0f1f2] w-auto">
            <img
              src={heroMobile2}
              alt="Hero Fashion Mobile"
              className="m-auto"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
