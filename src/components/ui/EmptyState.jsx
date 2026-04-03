import React from "react";
import { FolderSearch } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="h-16 w-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
        <FolderSearch className="h-8 w-8 text-primary-400/60" />
      </div>
      <h3 className="text-lg font-medium text-slate-300">No transactions found</h3>
      <p className="mt-2 text-sm text-slate-500 max-w-[250px]">
        We couldn't find any transactions matching your current filters. Try adjusting your search.
      </p>
    </div>
  );
}
