![CleanShot 2023-10-27 at 17 01 23](https://github.com/vitaliiHoncharuk/acme-processes/assets/24368083/f25b724d-47fe-4b9e-af44-3f2035836bfa)# Acme Processes Mapper

Acme Processes Mapper is a web application built for Acme Corporation to map out the various processes involved in the production of its goods. The app allows users to create a graph of activities where each activity, represented by a node, can be connected to one another, facilitating a visual representation of the production processes.
![CleanShot 2023-10-27 at 17 01 23](https://github.com/vitaliiHoncharuk/acme-processes/assets/24368083/aeb9f54c-7494-4cac-97cd-309e17ca39fa)

## Features

- **Activity Graph**: Create, view, and manage a graphical representation of activities and their connections.
- **Authentication**: Access to the graph feature is restricted to authenticated users with the credentials `admin / admin`.
- **Persistent Data**: Diagrams persist across browser refreshes using local storage.
- **Notification System**: Get feedback on actions within the app via a notification system.
- **Additional Functionalities**: Besides adding nodes, users can delete nodes, clear the board, lock/unlock the model, and zoom in/out on the diagram for better visualization.

## Technologies Used

- React.js (v18.2.0)
- TypeScript (v4.9.5)
- ProjectStorm's React Diagrams Library

## Installation

1. Clone the repository to your local machine.

```bash
git clone https://github.com/your-username/acme-processes.git
```

2. Navigate to the project directory.

```bash
cd acme-processes
```

3. Navigate to the project directory.


```bash
npm install
```

## Usage

Start the development server.

```bash
   npm start
```

## Testing

For coverage report, run:

```bash
npm run test:coverage
```

## Formatting and Linting

To lint the code, run:

```bash
npx eslint . --ext .ts,.tsx
```

or

```bash
npm run format
```

## Future Plans

With more time, there are several enhancements and features that could be added to improve the project further:

- **Test Coverage**: Improve test coverage and initiate the use of Cypress for more robust testing.
- **State Management**: Migrate state management from context to Redux for better scalability and easier debugging.
- **Error Handling**: Develop a comprehensive error handling system to provide better user feedback and ensure the stability of the application.
- **Labels on Activities**: Implement the ability to add labels to activities on the graph for better description and understanding.
- **Activity Name Editing**: Add the ability to change the names of activities directly within the graph.
- **Activity Removal**: Introduce an icon to remove activities directly from the graph.
- **Undo-Redo Functionality**: Implement undo-redo functionality to allow users to easily correct mistakes and revert to previous states of the graph.

These improvements aim to make the application more robust, user-friendly, and easier to maintain and debug.

## Contact

For further inquiries or assistance, please contact: [vitaliihoncharuk@gmail.com](mailto:vitaliihoncharuk@gmail.com)
