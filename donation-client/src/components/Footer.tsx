const Footer = () => {
  return (
    <div className="text-center text-[20px] p-8">
      Copyright © {new Date().getFullYear()}{" "}
      <span className=" text-primary_color">Tanvir Foundation</span> - all
      rights reserved.
      <span className=" text-primary_color">Terms and conditions</span> |{" "}
      <span className=" text-primary_color">Privacy Policy</span>
    </div>
  );
};

export default Footer;
