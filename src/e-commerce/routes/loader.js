import Loader from "react-loader-spinner";

export const Loaders = () => {
  return (
    <Loader
      type="grid"
      color="black"
      height={100}
      width={100}
      timeout={5000} //3 secs
    />
  );
};
