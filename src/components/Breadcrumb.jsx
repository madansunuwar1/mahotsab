import React from "react";

function Breadcrumb({ title, text }) {
  return (
    <>
      <section className="py-10 bg-[#fff7cb]">
        <div className="flex justify-between flex-col md:flex-row container text-center md:text-left">
          <h1 className="text-2xl md:text-6xl font-medium tracking-wider font-primary w-full md:w-7/12">
            {title}
          </h1>
          <p className="text-md md:text-xl mt-2 tracking-wide font-suse w-full md:w-2/5">
            {text}
          </p>
        </div>
      </section>
    </>
  );
}

export default Breadcrumb;
