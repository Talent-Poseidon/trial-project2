import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { createProject } from '@/lib/admin/actions';
import { useToast } from '@/components/ui/use-toast';

interface ProjectFormInputs {
  projectName: string;
  startDate: string;
  endDate: string;
}

const NewProjectForm: React.FC = () => {
  const { handleSubmit, control, formState: { errors } } = useForm<ProjectFormInputs>();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<ProjectFormInputs> = async data => {
    try {
      await createProject(data.projectName, data.startDate, data.endDate);
      toast({
        title: 'Success',
        description: 'Project created successfully!',
      });
    } catch (error) {
      console.error('Failed to create project:', error);
      toast({
        title: 'Error',
        description: 'Failed to create project. Please try again.',
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormItem>
        <FormLabel>Project Name</FormLabel>
        <FormControl asChild>
          <input
            type="text"
            {...control.register('projectName', { required: 'Project name is required' })}
            className="input"
          />
        </FormControl>
        {errors.projectName && <FormMessage>{errors.projectName.message}</FormMessage>}
      </FormItem>

      <FormItem>
        <FormLabel>Start Date</FormLabel>
        <FormControl asChild>
          <input
            type="date"
            {...control.register('startDate', { required: 'Start date is required' })}
            className="input"
          />
        </FormControl>
        {errors.startDate && <FormMessage>{errors.startDate.message}</FormMessage>}
      </FormItem>

      <FormItem>
        <FormLabel>End Date</FormLabel>
        <FormControl asChild>
          <input
            type="date"
            {...control.register('endDate', { required: 'End date is required' })}
            className="input"
          />
        </FormControl>
        {errors.endDate && <FormMessage>{errors.endDate.message}</FormMessage>}
      </FormItem>

      <Button type="submit">Save Project</Button>
    </Form>
  );
};

export default NewProjectForm;
