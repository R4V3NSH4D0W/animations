import Image from "next/image";

interface ImageCardProps {
  imageURL: string;
  title: string;
  launch: string;
}

function ImageCard({ imageURL, title, launch }: ImageCardProps) {
  return (
    <div className=" flex flex-col gap-5 group cursor-pointer">
      <div className=" relative  h-[400px] md:h-[650px] w-full overflow-hidden">
        <Image
          src={imageURL}
          alt={title}
          fill
          className=" object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-3"
        />
      </div>
      <div className=" flex items-center flex-col justify-center gap-2">
        <span className=" font-bold text-xs">{title}</span>
        <span className=" text-xl">{launch}</span>
        {/* <HoverFlip>
          <span className=" text-xs font-medium">View More</span>
        </HoverFlip> */}
      </div>
    </div>
  );
}

export default ImageCard;
