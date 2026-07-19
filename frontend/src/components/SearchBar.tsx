import { useState } from "react";
import type { VehicleFilters } from "../api/vehicle.api";

interface SearchBarProps {
  filters: VehicleFilters;
  setFilters: (filters: VehicleFilters) => void;
  categories: string[];
  onSearch: () => void;
  onClear: () => void;
  isLoading?: boolean;
}

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
    <path
      d="M4 6h16M7 12h10M10 18h4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
    aria-hidden="true"
  >
    <path
      d="m6 9 6 6 6-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SearchBar = ({
  filters,
  setFilters,
  categories,
  onSearch,
  onClear,
  isLoading = false,
}: SearchBarProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const activeAdvancedCount = [
    filters?.category,
    filters?.minPrice,
    filters?.maxPrice,
  ].filter((v) => v !== undefined && v !== "").length;

  const hasAnyFilter =
    activeAdvancedCount > 0 || !!filters?.make || !!filters?.model;

  const update = (patch: Partial<VehicleFilters>) =>
    setFilters({ ...filters, ...patch });

  return (
    <div className="tw-card p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="tw-input"
          placeholder="Search by make…"
          value={filters?.make || ""}
          onChange={(e) => update({ make: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          disabled={isLoading}
          aria-label="Search by make"
        />
        <input
          className="tw-input"
          placeholder="Search by model…"
          value={filters?.model || ""}
          onChange={(e) => update({ model: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          disabled={isLoading}
          aria-label="Search by model"
        />

        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
          className="tw-btn-outline shrink-0 relative"
        >
          <FilterIcon />
          Filters
          {activeAdvancedCount > 0 && (
            <span className="tw-badge-primary !px-1.5 !py-0 text-[0.65rem] ml-1">
              {activeAdvancedCount}
            </span>
          )}
          <ChevronIcon open={showFilters} />
        </button>

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

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-border-light dark:border-border-dark animate-fade-in">
          <div>
            <label htmlFor="filter-category" className="tw-label">
              Category
            </label>
            <select
              id="filter-category"
              className="tw-input"
              value={filters?.category || ""}
              onChange={(e) => update({ category: e.target.value })}
              disabled={isLoading}
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-min-price" className="tw-label">
              Min price (₹)
            </label>
            <input
              id="filter-min-price"
              type="number"
              min={0}
              className="tw-input"
              placeholder="0"
              value={filters?.minPrice ?? ""}
              onChange={(e) => update({ minPrice: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="filter-max-price" className="tw-label">
              Max price (₹)
            </label>
            <input
              id="filter-max-price"
              type="number"
              min={0}
              className="tw-input"
              placeholder="No limit"
              value={filters?.maxPrice ?? ""}
              onChange={(e) => update({ maxPrice: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              disabled={isLoading}
            />
          </div>
        </div>
      )}

      {hasAnyFilter && (
        <div className="flex justify-end mt-3">
          <button
            type="button"
            onClick={onClear}
            disabled={isLoading}
            className="text-sm font-medium text-text-muted dark:text-text-darkMuted hover:text-red-500 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};
