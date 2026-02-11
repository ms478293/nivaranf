import Image from "next/image";
export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-full bg-white z-50 ">
      <div className="loading-spinner flex justify-center items-center w-full p-8">
        {/* Video */}
        <Image
          src="/loading/render.gif"
          className=" flex w-fit h-full object-cover "
          fill
          alt="Nivaran Loading Image"
        ></Image>
      </div>

      {/* <style jsx>{`
        .loading-spinner {
          width: 800px;
          height: 800px;
          position: relative;
        }
      `}</style> */}
    </div>
  );
};
