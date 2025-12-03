import { ArrowRight } from "lucide-react";
import React from "react";
import ImageCard from "../shared/image-card";

const data = [
  {
    imageURL:
      "https://i.pinimg.com/736x/55/c4/d0/55c4d0f567c9f938bf719d6390975a89.jpg",
    title: "Jillan Dempsey",
    launch: "FLYK Trick MAscara Prodcut Launch",
  },
  {
    imageURL:
      "https://i.pinimg.com/736x/97/da/a0/97daa081bff94a6b032e1538b0407f12.jpg",
    title: "D.S. & Durga",
    launch: "Bistro Waters Fragnance Prodcut Launch",
  },
  {
    imageURL:
      "https://i.pinimg.com/1200x/b1/2a/4b/b12a4bd6a36f48c14157e595992d1a46.jpg",
    title: "TM Micro",
    launch: "Aire IQ Hair Dryer Launch",
  },
];

function CaseStudies() {
  return (
    <section className=" flex flex-col m-10">
      <div className=" flex flex-row  justify-between items-center">
        <span className=" text-xs font-medium">Case Studies</span>
        <div className=" flex flex-row items-center gap-5">
          <span className=" uppercase">View More Work</span>
          <ArrowRight size={16} />
        </div>
      </div>
      <div className=" grid grid-cols-3 gap-x-10 mt-10">
        {data.map((item, index) => (
          <ImageCard
            key={index}
            imageURL={item.imageURL}
            title={item.title}
            launch={item.launch}
          />
        ))}
      </div>
    </section>
  );
}

export default CaseStudies;
