export const BackgroundImageDisplayCard = ({
  title,
  description,
  imgUrl,
  type = "normal",
}: {
  title: string;
  description: string;
  imgUrl: string;
  type?: "normal" | "titleBelow" | "titleAbove";
}) => {
  if (type == "normal") {
    return (
      <div
        style={{ backgroundImage: `url(${imgUrl})` }}
        className="w-full h-96 bg-contain bg-no-repeat lg:bg-cover lg:bg-center lg:bg-fixed"
      >
        <div className="mx-auto grid max-w-screen-xl px-4 py-32 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="mb-5 lg:text-7xl text-3xl font-extrabold tracking-tight text-primary-main">
              {title}
            </h1>
            <p className="mb-3 font-normal text-xs text-white dark:text-white">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (type == "titleBelow") {
    return (
      <>
        <div
          style={{ backgroundImage: `url(${imgUrl})` }}
          // className="w-full h-96 bg-cover bg-no-repeat lg:bg-cover lg:bg-center lg:bg-fixed"
          className="w-full h-96 bg-cover bg-no-repeat lg:bg-cover lg:bg-center bg-fixed"
        >
          <div className="mx-auto grid max-w-screen-xl px-4 py-32 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
            <div className="mr-auto place-self-center lg:col-span-7">
              <p className="mb-3 font-normal text-xs text-white dark:text-white"></p>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (type === "titleAbove") {
    return (
      <>
        <h1 className="mb-5 mx-auto flex justify-center my-2 lg:text-7xl text-3xl font-extrabold tracking-tight text-primary-main">
          {title}
        </h1>
        <div
          style={{ backgroundImage: `url(${imgUrl})` }}
          className="w-full h-96 bg-contain bg-no-repeat lg:bg-cover lg:bg-center lg:bg-fixed"
        ></div>
        <div className="mb-3 font-normal text-3xl text-black text-center">
          {description}
        </div>
      </>
    );
  }
};
