# Contacts App

This Contacts App is an Angular application for managing contacts. Users can add, edit, and delete contacts. It also includes a search functionality to filter contacts based on the entered search criteria.

## Features

- **Add New Contact**: Create a new contact with first name, last name, and email.
- **Edit Contact**: Edit the details of an existing contact.
- **Delete Contact**: Remove a contact from the list.
- **Search Contact**: Search for contacts by first name, last name, or email.
- **Form Validation**: Ensure valid input data with required fields and pattern checks.

## Technologies Used

- **Angular**: Framework for building the web application.
- **Angular Material**: UI component library for Angular.
- **RxJS**: Library for reactive programming.
- **Bootstrap**: Framework for responsive, mobile-first front-end web development.
- **ASP.NET Core**: Framework for building the Web API.
- **Entity Framework Core**: ORM for data access.

## Setup and Installation

### Frontend (Angular)

1. **Clone the repository:**
    ```bash
    git clone https://github.com/FlyingNanobot/InterviewProject
    ```

2. **Navigate to the project directory:**
    ```bash
    cd contacts-app
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Run the application:**
    ```bash
    ng serve
    ```

5. **Open your browser and navigate to:**
    ```
    https://localhost:4200
    ```

### Backend (ASP.NET Core Web API)

1. **Navigate to the Web API project directory:**
    ```bash
    cd WebAPI
    ```

2. **Restore dependencies:**
    ```bash
    dotnet restore
    ```

3. **Update the database:**
    ```bash
    dotnet ef database update
    ```

4. **Run the Web API:**
    ```bash
    dotnet run
    ```

### Data Repository

The backend uses a file-based repository to store contact data in a JSON file. The `ContactsRepository` class provides methods to manage the data:

- **GetAllContactsAsync**: Retrieves all contacts from the JSON file.
- **GetContactByIdAsync**: Retrieves a specific contact by ID.
- **AddContactAsync**: Adds a new contact to the JSON file.
- **UpdateContactAsync**: Updates an existing contact in the JSON file.
- **DeleteContactAsync**: Deletes a contact from the JSON file.
- **SaveToFile**: Saves the contact list to the JSON file.

The JSON file is located at `..\..\DataBase\contacts.json` relative to the project's directory. If the file does not exist, it is created with an empty array.

## Usage

### Adding a New Contact

1. Click on the **NEW** button.
2. Fill in the required details in the form.
3. Click on **Submit** to save the contact.

### Editing a Contact

1. Click on the **EDIT** button next to the contact you want to edit.
2. Update the contact details in the form.
3. Click on **Submit** to save the changes.

### Deleting a Contact

1. Click on the **DELETE** button next to the contact you want to delete.
2. Confirm the deletion in the dialog box.

### Searching for a Contact

1. Enter the search criteria in the search input box.
2. Click on the **Search** button.
3. The contacts list will be filtered based on the entered search criteria.

## Form Validation

- **First Name**: Required field.
- **Last Name**: Required field.
- **Email**: Required field with a valid email pattern. Duplicate emails are not allowed.

## Web API Endpoints

The backend Web API provides the following endpoints for managing contacts:

- **GET /api/contacts**: Retrieves all contacts.
- **POST /api/contacts**: Adds a new contact.
- **PUT /api/contacts/{id}**: Updates an existing contact.
- **DELETE /api/contacts/{id}**: Deletes a contact by ID.

### Example Request and Response

- **GET /api/contacts**

  ```json
  [
    {
      "id": 1,
      "firstName": "Satadal",
      "lastName": "Ray",
      "email": "ray.satadal94@gmail.com"
    },
    {
      "id": 2,
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane.doe@example.com"
    }
  ]

- **POST /api/contacts

  ```json
  {
    "id": 3,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  }

## Contributing
Feel free to contribute to the project by opening an issue or submitting a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any questions or suggestions, please reach out to ray.satadal94@gmail.com.