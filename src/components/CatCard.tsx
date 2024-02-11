import Image from "next/image";
import { CatInterface } from "@/types/CatInterface";
import Link from "next/link";
import { GoStarFill, GoStar } from "react-icons/go";
import { FaCat } from "react-icons/fa";
interface Props {
  catData: CatInterface;
  fetch: () => void;
}
const CatCard: React.FC<Props> = ({ catData, fetch }) => {
  const urlRegex = /(https?:\/\/[^\s]+)/;
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
      <button
        type="button"
        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mt-2 mb-2"
        onClick={fetch}
      >
        <FaCat color="orange" /> &nbsp; Generate New Cat
      </button>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Cat Details</h2>
        <div className="grid grid-cols-2 gap-4 text-black">
          <div>
            <span className="font-semibold text-black">Name:</span>{" "}
            {catData.breed.alt_names}
          </div>
          {Object.entries(catData.breed).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className="font-semibold">{key}:</span>

              <span>
                {typeof value === "object" ? (
                  <>
                    <span>imperial:{value.imperial}</span>&nbsp;
                    <span>metric:{value.metric}</span>
                  </>
                ) : urlRegex.test(value) ? (
                  <Link
                    href={value}
                    className="text-blue-600 hover:text-blue-800 active:text-blue-400"
                  >
                    {value}
                  </Link>
                ) : typeof value === "number" ? (
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, index) =>
                      index < value ? (
                        <GoStarFill key={index} color="orange" />
                      ) : (
                        <GoStar key={index} color="gray" />
                      )
                    )}
                  </div>
                ) : (
                  value
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center text-orange-700">Random Cat Generator</div>
    </div>
  );
};

export default CatCard;
