'use client';

import { useState } from 'react';
import { GitBranch } from 'lucide-react';
import RepoInputDialog from '@/components/dialogs/RepoInputDialog';

export default function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GitBranch className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Git Branch Visualizer</h1>
            <p className="text-sm text-muted-foreground">
              Interactive branch and commit relationship explorer
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition"
        >
          Load Repository
        </button>
      </div>
      <RepoInputDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </header>
  );
}
