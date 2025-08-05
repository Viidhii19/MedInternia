import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
  // Sample data - replace with database queries
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
  
  res.json({
    success: true,
    data: users
  });
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  
  // Validate input
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required'
    });
  }
  
  // Sample response - replace with database creation
  const newUser = {
    id: Date.now(),
    name,
    email
  };
  
  res.status(201).json({
    success: true,
    data: newUser
  });
};
