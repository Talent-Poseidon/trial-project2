import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectList } from '@/components/admin/project-list';

const mockProjects = [
  { id: '1', name: 'Project Alpha', startDate: '2023-01-01', endDate: '2023-12-31' },
  { id: '2', name: 'Project Beta', startDate: '2023-02-01', endDate: '2023-11-30' },
];

describe('ProjectList Component', () => {
  it('renders project list correctly', () => {
    render(<ProjectList projects={mockProjects} />);

    // Check if project names are rendered
    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(screen.getByText('Project Beta')).toBeInTheDocument();
  });

  it('filters projects based on search input', () => {
    render(<ProjectList projects={mockProjects} />);

    // Simulate user typing in the search box
    fireEvent.change(screen.getByPlaceholderText('Search projects...'), {
      target: { value: 'Alpha' },
    });

    // Check if only the filtered project is displayed
    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(screen.queryByText('Project Beta')).not.toBeInTheDocument();
  });
});
