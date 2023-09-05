import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import axios from 'axios';
import { validateUserName } from '../utils/validation';
import { handleRateLimitError } from '../utils/axiosUtils';

const BASE_URL: string = 'https://dummy.restapiexample.com/api/v1';


/**
 * @description Get all users
 * @route GET /api/users
 * @access Public
 * @type GET
 */
export const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.get(`${BASE_URL}/employees`);
    const users = response.data.data;

    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error: any) {
    if (error.isAxiosError) {
      // Handle rate-limiting error using the utility function
      handleRateLimitError(error, res);
    } else {
      res.status(500).json({
        status: 'error',
        message: "An error occurred while fetching users. Please try again.",
      });
    }
  }
});

/**
 * @description Get one user by ID
 * @route GET /api/users/:id
 * @access Public
 * @type GET
 * @param {string} id - The user's ID
 */
export const getOneUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  try {
    const response = await axios.get(`${BASE_URL}/employee/${userId}`);
    const user = response.data.data;

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: "User not found.",
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error: any) {
    if (error.isAxiosError) {
      // Handle rate-limiting error using the utility function
      handleRateLimitError(error, res);
    } else {
      res.status(500).json({
        status: 'error',
        message: "An error occurred while fetching user details. Please try again.",
      });
    }
  }
});

/**
 * @description Create a new user
 * @route POST /api/users
 * @access Public
 * @type POST
 * @param {object} req.body - The user's data to be created
 */
/**
 * @description Create a new user
 * @route POST /api/users
 * @access Public
 * @type POST
 * @param {object} req.body - The user's data to be created
 */
export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body;

  if (!validateUserName(newUser.employee_name)) {
    res.status(400).json({
      status: 'false',
      message: "User name should be at least 2 characters long.", // Updated error message
    });
    return; // Return early to prevent further execution
  }

  try {
    // console.log('Creating user...'); // Log a message indicating the start of the operation

    const response = await axios.post(`${BASE_URL}/create`, newUser);
    const createdUser = response.data.data;

    // console.log('User created successfully:', createdUser); // Log the successful user creation with user data

    res.status(201).json({
      status: 'success',
      data: {
        createdUser
      },
    });
  } catch (error: any) {
    if (error.isAxiosError) {
      // console.error('Axios error:', error); // Log the Axios error for debugging

      // Handle rate-limiting error using the utility function
      handleRateLimitError(error, res);
    } else {
      // console.error('Error creating user:', error); // Log the error message and details

      res.status(500).json({
        status: 'false',
        message: "An error occurred while creating the user. Please try again.",
      });
    }
  }
});


/**
 * @description Update a user by ID
 * @route PUT /api/users/:id
 * @access Public
 * @type PUT
 * @param {string} id - The user's ID to be updated
 * @param {object} req.body - The updated user's data
 */
export const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  if (!validateUserName(updatedUser.employee_name)) {
    res.status(400).json({
      status: 'false',
      messsage: "User name should be at least 2 characters long."
    });
  }

  try {
    // console.log('Updating user...'); // Log a message indicating the start of the operation

   const response = await axios.put(`${BASE_URL}/update/${userId}`, updatedUser);
   const updatedUserData = response.data.data; // Get the updated user data from the response

  //  console.log('User updated successfully:', updatedUserData); // Log the successful update with updated data

   res.status(200).json({
     status: 'success',
     message: 'User updated successfully',
     updatedUserData
   });
  } catch (error: any) {
    if (error.isAxiosError) {
      // Handle rate-limiting error using the utility function
      handleRateLimitError(error, res);
    } else {
      // console.error('Error updating user:', error); // Log the error message and details

      res.status(500).json({
        status: 'error',
        message: 'An error occurred while updating the user. Please try again.',
      });
    }
  }
});

/**
 * @description Delete a user by ID
 * @route DELETE /api/users/:id
 * @access Public
 * @type DELETE
 * @param {string} id - The user's ID to be deleted
 */
export const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  try {
    await axios.delete(`${BASE_URL}/delete/${userId}`);
    // console.log(`User with ID ${userId} deleted successfully.`); // Log success message

    res.status(200).json({
      status: 'success',
      message: "User deleted successfully"
    });
  } catch (error: any) {
    if (error.isAxiosError) {
      // Handle rate-limiting error using the utility function
      handleRateLimitError(error, res);
    } else {
      // console.error('Error deleting user:', error); // Log the error message and details

      res.status(500).json({
        status: 'error',
        message: "An error occurred while deleting the user. Please try again.",
      });
    }
  }
});

