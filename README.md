# toDo app

## Deployment Test

### Author: John Cokos

- [tests report]()
- [front-end]()

### Setup

#### `.env` requirements

VITE_REACT_APP_SERVER
LIST_ITEMS_URL

#### Running the app

- `npm run dev`
- Endpoint:

  - Returns array of Objects

    ```javascript
    [
      {
        difficulty: 3,
        text: "Complete Homework",
        assignee: "John",
        id: "1",
        complete: false,
      }
    ];
    ```

#### Tests

- Unit Tests: `npm run test`
- Lint Tests: `npm run lint`

#### UML

(Created with [figjam](https://www.figma.com/jam))

![UML Diagram](./public/to-do-app.png)
