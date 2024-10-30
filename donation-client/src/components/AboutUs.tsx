import about_us_img from "../assets/images/CaroselImage/educationalKits.jpg";
import checkPng from "../assets/images/icons/check_845646.png";
const AboutUs = () => {
  const charityItemsLeft = [
    "Charity For Education",
    "Charity For Medical Health",
    "Charity For Clean Water",
  ];

  const charityItemsRight = [
    "Charity For Pets",
    "Charity For Education",
    "Charity For Church",
  ];
  return (
    <div className="dark:bg-dark-background dark:text-dark-text">
      <div className="sm:flex sm:gap-10 pt-10 max-w-7xl m-auto pb-10 ">
        <div className="about_us_img sm:w-1/2 w-full mb-5">
          <img src={about_us_img} alt="" />
        </div>
        <div className="about_us_content md:w-1/2 ml-3">
          <h1 className="text-green-600 text-[18px] mb-5 border-b-4 border-gray-500 pb-2">
            {" "}
            Tanvir Foundation
          </h1>
          <h1 className="text-5xl font-bold mb-5">
            Helping is a Great Virtue for Every Human
          </h1>
          <p className="mb-6 text-[18px]">
            It has been determined through research that when we feel compelled
            to help, and that someone authentically needs our assistance, and
            that no trick is being played on us, we reliably do intervene.
            Interestingly, it has been found that we are less likely to help
            when evaluating the intrinsic worth of assisting others,
            transcending cultural, religious, and societal boundaries.
          </p>

          {/* Grid Layout for Charity Items with Two Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
            <div className="sm:space-y-2">
              {charityItemsLeft.map((text, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5">
                    <img
                      src={checkPng}
                      alt="Checkmark icon"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="font-semibold text-[18px]">{text}</p>
                </div>
              ))}
            </div>
            <div className="sm:space-y-2">
              {charityItemsRight.map((text, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5">
                    <img
                      src={checkPng}
                      alt="Checkmark icon"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className=" font-semibold text-[18px]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
