const Line = ({ orientation = "horizontal", className = "" }) => {
  return (
    <div
      className={`bg-slate-200 absolute ${
        orientation === "horizontal" ? "h-[1px] w-full" : "w-[1px] h-full"
      } ${className}`}
    />
  );
};
