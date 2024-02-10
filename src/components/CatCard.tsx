import Image from "next/image";
import { CatData } from "@/pages";

const CatCard: React.FC<{ catData: CatData }> = ({ catData }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="h-60 w-60 rounded-lg overflow-hidden">
        <Image
          src={catData.url}
          alt="Random Cat"
          width={300}
          height={300}
          className="rounded-lg"
        />
      </div>
      <div className="text-center text-orange-700">Random Cat Generator</div>
    </div>
  );
};

export default CatCard;
