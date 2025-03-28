

type PageControlsProps = {
  loadDogs: (query: string) => void;
  prevPageQuery: string | null;
  nextPageQuery: string | null;
};

export default function PageControls({
  prevPageQuery,
  nextPageQuery,
  loadDogs,
}: PageControlsProps) {
  return (
    <div className="flex justify-between mt-4">
      <button
        disabled={!prevPageQuery}
        onClick={() => prevPageQuery && loadDogs(prevPageQuery)}
      >
        Previous
      </button>
      <button
        disabled={!nextPageQuery}
        onClick={() => nextPageQuery && loadDogs(nextPageQuery)}
      >
        Next
      </button>
    </div>
  );
}
