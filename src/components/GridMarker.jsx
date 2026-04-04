export default function GridMarker({ className = "" }) {
  return (
    <svg
      className={`absolute w-[14px] h-[14px] text-black z-10 pointer-events-none ${className}`}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M7 0v14M0 7h14" />
    </svg>
  );
}
