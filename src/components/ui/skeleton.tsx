const SkeletonLoader: React.FC<{ width: string; height: string }> = ({
  width,
  height,
}) => {
  return (
    <div
      className="bg-gray-200 animate-pulse rounded"
      style={{ width, height }}
    />
  );
};

export default SkeletonLoader;
