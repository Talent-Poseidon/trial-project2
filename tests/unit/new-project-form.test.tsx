import { render, screen, fireEvent } from '@testing-library/react';
import NewProjectForm from '@/components/admin/new-project-form';

jest.mock('@/lib/admin/actions', () => ({
  createProject: jest.fn(),
}));

jest.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

const mockCreateProject = require('@/lib/admin/actions').createProject;
const mockToast = require('@/components/ui/use-toast').useToast().toast;

describe('NewProjectForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form fields correctly', () => {
    render(<NewProjectForm />);

    // Check if form fields are rendered
    expect(screen.getByLabelText('Project Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date')).toBeInTheDocument();
  });

  it('submits the form with correct data', async () => {
    render(<NewProjectForm />);

    // Fill the form
    fireEvent.change(screen.getByLabelText('Project Name'), { target: { value: 'New Project' } });
    fireEvent.change(screen.getByLabelText('Start Date'), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText('End Date'), { target: { value: '2023-12-31' } });

    // Submit the form
    fireEvent.click(screen.getByText('Save Project'));

    // Check if createProject was called with correct data
    expect(mockCreateProject).toHaveBeenCalledWith('New Project', '2023-01-01', '2023-12-31');

    // Check if success toast was shown
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Success',
      description: 'Project created successfully!',
    });
  });

  it('shows error toast on submission failure', async () => {
    mockCreateProject.mockImplementation(() => {
      throw new Error('Failed to create project');
    });

    render(<NewProjectForm />);

    // Fill the form
    fireEvent.change(screen.getByLabelText('Project Name'), { target: { value: 'New Project' } });
    fireEvent.change(screen.getByLabelText('Start Date'), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText('End Date'), { target: { value: '2023-12-31' } });

    // Submit the form
    fireEvent.click(screen.getByText('Save Project'));

    // Check if error toast was shown
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Failed to create project. Please try again.',
    });
  });
});
