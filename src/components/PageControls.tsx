import { Button } from "./ui/button";

type PageControlsProps = {
  getDogs: (query: string) => void;
  prevPageQuery: string | null;
  nextPageQuery: string | null;
};

export default function PageControls({
  prevPageQuery,
  nextPageQuery,
  getDogs,
}: PageControlsProps) {
  return (
    <div className="flex justify-center m-4 gap-6">
      <Button
        disabled={!prevPageQuery}
        onClick={() => prevPageQuery && getDogs(prevPageQuery)}
      >
        Previous
      </Button>
      <Button
        disabled={!nextPageQuery}
        onClick={() => nextPageQuery && getDogs(nextPageQuery)}
      >
        Next
      </Button>
    </div>
  );
}
