import { jest } from '@jest/globals';
import User from '../models/user.model.js';
import Project from '../models/project.model.js';
import Task from '../models/task.model.js';
import sequelize from '../database/connection.js';
import { cleanDatabase, createTestUser, createTestProject, createTestTask } from './helpers.js';

describe('Database Models and Relationships', () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('User Model', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword123'
      };

      const user = await User.create(userData);
      
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user.password).toBe(userData.password);
    });

    it('should not allow duplicate emails', async () => {
      await User.create({
        name: 'User 1',
        email: 'duplicate@example.com',
        password: 'password123'
      });

      try {
        await User.create({
          name: 'User 2',
          email: 'duplicate@example.com',
          password: 'password456'
        });
        fail('Should have thrown an error for duplicate email');
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.name).toContain('SequelizeUniqueConstraint');
      }
    });
  });

  describe('Project Model', () => {
    it('should create a project with valid data', async () => {
      const user = await createTestUser();
      
      const projectData = {
        name: 'Test Project',
        description: 'This is a test project',
        userId: user.id
      };

      const project = await Project.create(projectData);
      
      expect(project).toBeDefined();
      expect(project.id).toBeDefined();
      expect(project.name).toBe(projectData.name);
      expect(project.description).toBe(projectData.description);
      expect(project.userId).toBe(user.id);
    });
  });

  describe('Task Model', () => {
    it('should create a task with valid data', async () => {
      const user = await createTestUser();
      const project = await createTestProject(user.id);
      
      const taskData = {
        name: 'Test Task',
        projectId: project.id
      };

      const task = await Task.create(taskData);
      
      expect(task).toBeDefined();
      expect(task.id).toBeDefined();
      expect(task.name).toBe(taskData.name);
      expect(task.projectId).toBe(project.id);
      expect(task.done).toBe(false); // default value
    });
  });

  describe('Model Relationships', () => {
    it('should establish correct relationship between User and Projects', async () => {
      const user = await createTestUser();
      
      // Create multiple projects for the user
      await createTestProject(user.id);
      await createTestProject(user.id, { name: 'Second Project' });
      
      const userWithProjects = await User.findByPk(user.id, {
        include: 'Projects'
      });
      
      expect(userWithProjects.Projects).toBeDefined();
      expect(userWithProjects.Projects.length).toBe(2);
      expect(userWithProjects.Projects[0].userId).toBe(user.id);
      expect(userWithProjects.Projects[1].userId).toBe(user.id);
    });

    it('should establish correct relationship between Project and Tasks', async () => {
      const user = await createTestUser();
      const project = await createTestProject(user.id);
      
      // Create multiple tasks for the project
      await createTestTask(project.id);
      await createTestTask(project.id, { name: 'Second Task' });
      
      const projectWithTasks = await Project.findByPk(project.id, {
        include: 'Tasks'
      });
      
      expect(projectWithTasks.Tasks).toBeDefined();
      expect(projectWithTasks.Tasks.length).toBe(2);
      expect(projectWithTasks.Tasks[0].projectId).toBe(project.id);
      expect(projectWithTasks.Tasks[1].projectId).toBe(project.id);
    });

    it('should cascade delete tasks when a project is deleted', async () => {
      const user = await createTestUser();
      const project = await createTestProject(user.id);
      
      // Create tasks for the project
      const task1 = await createTestTask(project.id);
      const task2 = await createTestTask(project.id, { name: 'Second Task' });
      
      // Delete the project
      await Project.destroy({ where: { id: project.id } });
      
      // Check if tasks were also deleted
      const task1Check = await Task.findByPk(task1.id);
      const task2Check = await Task.findByPk(task2.id);
      
      expect(task1Check).toBeNull();
      expect(task2Check).toBeNull();
    });

    it('should cascade delete projects and tasks when a user is deleted', async () => {
      const user = await createTestUser();
      const project = await createTestProject(user.id);
      const task = await createTestTask(project.id);
      
      // Delete the user
      await User.destroy({ where: { id: user.id } });
      
      // Check if project and task were also deleted
      const projectCheck = await Project.findByPk(project.id);
      const taskCheck = await Task.findByPk(task.id);
      
      expect(projectCheck).toBeNull();
      expect(taskCheck).toBeNull();
    });
  });
});
