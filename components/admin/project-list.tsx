"use client";

import { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { Search } from "lucide-react";

interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TextInput
          placeholder="Search projects..."
          leftSection={<Search className="h-4 w-4" />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          size="sm"
          className="sm:w-64"
          classNames={{
            input: "bg-background border-border text-foreground",
          }}
        />
        <Button size="sm" variant="light" color="blue">
          Setup New Project
        </Button>
      </div>

      {/* Project List */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Project Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Start Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  End Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-foreground">
                      {p.name}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-foreground">
                      {new Date(p.startDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-foreground">
                      {new Date(p.endDate).toLocaleDateString()}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
