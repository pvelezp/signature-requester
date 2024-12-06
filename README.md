# Signature Requester Project

This is a web application built with **Next.js 14** using the **App Router**, designed for optimized React environment. It allows users to upload documents, send them to specific emails for signing, and get notifications once the document is signed or declined.

The application leverages modern front-end technologies and follows best practices for clean, maintainable code. Below is a summary of the technologies used, features, and practices followed throughout the project.

You can see the deployed app here: https://velez-sign-requester.netlify.app

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running)
- [Testing](#testing)
- [Features](#installation)
- [Tech Stack](#tech-stack)
- [Best Practices Followed](#best-practices-followed)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pvelezp/marvel-app.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

## Running the Application

1. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Testing

### Running Tests

1. To run the tests, use the following command:

   ```bash
   npm run test
   ```

   or

   ```bash
   yarn test
   ```

2. Tests are written using Jest and React Testing Library and are located alongside their respective components.

## Features

- **Document Upload**: Upload documents and send them for signature to one or more email addresses.
- **Sign/Decline Notifications**: Users are notified when the document is signed or declined.
- **PDF Preview**: Preview documents before sending them using `pdfjs-dist`.
- **Dynamic Table**: View uploaded documents and their statuses using a highly customizable and performant table built with `tanstack/react-table`.
- **Responsive UI**: Fully responsive design built with **Tailwind CSS** for styling.
- **Optimized File Input**: Use of **React Dropzone** for optimized file upload.
- **Form Handling**: **React Hook Form** for seamless form management.
- **Reusability**: **Shadcn UI** components for consistent and reusable UI elements.
- **State Management**: **Context API** is used for global state management, making data accessible across components.
- **Testing**: Unit and integration tests using **Jest** and **React Testing Library** ensure the reliability of the app.

## Tech Stack

- **Next.js 14** with **App Router**: Provides a modern, optimized React environment.
- **TypeScript**: Strongly typed code for better tooling and developer experience.
- **Tailwind CSS**: Utility-first CSS framework for fast and flexible styling.
- **Shadcn UI**: Reusable, customizable components for consistent UI patterns.
- **Context API**: For state management and data flow across components.
- **Jest** and **React Testing Library**: For unit and integration testing.
- **React Dropzone**: For efficient and user-friendly file upload.
- **React Hook Form**: For easy and scalable form handling.
- **pdfjs-dist**: To render and preview PDF files in the browser.
- **Tanstack React Table**: For building highly customizable and performant tables.

## Best Practices Followed

1. **Optimized React Environment**:

   - The app is built with Next.js 14 for optimal performance, leveraging its advanced features like App Router for routing and server-side rendering.

2. **Type Safety with TypeScript**:

   - The project uses TypeScript to ensure type safety, which improves maintainability and reduces bugs.

3. **State Management with Context API**:

   - The Context API is used for global state management, providing a clean way to share state across components without prop drilling.

4. **Test-Driven Development**:

   - **Jest** and **React Testing Library** are used for unit and integration testing, ensuring that components behave as expected and the app is robust against regressions.

5. **Responsive Design**:

   - Tailwind CSS allows for a flexible, mobile-first design approach, ensuring the app looks great on all devices.

6. **Reusable UI Components**:

   - **Shadcn UI** components are utilized for consistent, reusable, and accessible UI elements, ensuring a streamlined design system.

7. **Efficient File Upload**:

   - **React Dropzone** is integrated for optimized file handling, ensuring smooth and efficient file uploads, especially for larger files.

8. **Efficient PDF Preview**:

   - The `pdfjs-dist` library is used to render PDFs directly in the browser, offering a seamless document preview experience before sending it out for signatures.

9. **Customizable Table with Tanstack**:

   - The app uses **Tanstack React Table** to display documents with customizable columns, sorting, and pagination, providing a robust table experience.

10. **Form Handling**:
    - **React Hook Form** is used for handling forms in a way that’s both simple and scalable, making it easier to manage form validation and submission.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
