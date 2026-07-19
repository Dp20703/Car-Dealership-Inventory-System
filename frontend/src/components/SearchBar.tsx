interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  isLoading?: boolean;
}

export const SearchBar = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  isLoading = false,
}: SearchBarProps) => (
  <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
    <input
      className="tw-input"
      placeholder="Search by make..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSearch()}
      disabled={isLoading}
      aria-label="Search vehicles by make"
    />
    <button
      onClick={onSearch}
      disabled={isLoading}
      className="tw-btn-primary shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <span
            className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"
            aria-hidden="true"
          />
          Searching…
        </>
      ) : (
        "Search"
      )}
    </button>
  </div>
);
