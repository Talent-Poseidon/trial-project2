import { test, expect } from '@playwright/test';

test.describe('Project Page', () => {
  test.beforeEach(async ({ page }) => {
    // Assuming there's a login function to authenticate as admin
    await page.goto('/auth/login');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
  });

  test('should display project list and setup new project form', async ({ page }) => {
    await page.goto('/admin/projects');

    // Check for the presence of the project management header
    await expect(page.locator('h1')).toHaveText('Project Management');

    // Check for the new project form
    await expect(page.locator('form')).toBeVisible();

    // Check if the project list table is visible
    await expect(page.locator('table')).toBeVisible();
  });

  test('should allow creating a new project', async ({ page }) => {
    await page.goto('/admin/projects');

    // Fill the new project form
    await page.fill('input[name="projectName"]', 'New Test Project');
    await page.fill('input[name="startDate"]', '2023-01-01');
    await page.fill('input[name="endDate"]', '2023-12-31');
    await page.click('button[type="submit"]');

    // Verify the project creation confirmation using toast
    await page.waitForSelector('text=Project created successfully!');
  });

  test('should allow searching projects', async ({ page }) => {
    await page.goto('/admin/projects');

    // Fill the search input
    await page.fill('input[placeholder="Search projects..."]', 'Test Project');

    // Verify the search results
    const projectNames = await page.locator('table tbody tr td:first-child').allTextContents();
    expect(projectNames.every(name => name.includes('Test Project'))).toBeTruthy();
  });
});
