import LoadingUI from "@/components/Loading";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center">
      <LoadingUI />
    </div>
  );
}
