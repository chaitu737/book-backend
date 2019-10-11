define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/books/all",
    "title": "Get all books",
    "version": "0.0.1",
    "group": "book",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The authToken for authentication. (Send authToken as query params)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   \n  {\n\t\t\"error\": false,\n\t\t\"message\": \"Book Details found\",\n\t\t\"status\": 200,\n\t\t\"data\":[\n               {\n                   \"title\": \"String\",\n                   \"description\": \"String\",\n                   \"price\": \"Number\",\n                   \"bookId\": \"String\"\n               },\n              .......\n              ]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Failed To Find Book Details\",\n  \"status\": 500,\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/book.js",
    "groupTitle": "book",
    "name": "GetApiV1BooksAll"
  },
  {
    "type": "get",
    "url": "/api/v1/books/book/:id",
    "title": "Get book by Id",
    "version": "0.0.1",
    "group": "book",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bookId",
            "description": "<p>The bookId of the book. (params)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   \n  {\n\t\t\"error\": false,\n\t\t\"message\": \"Book Details Found\",\n\t\t\"status\": 200,\n\t\t\"data\":[\n               {\n                   \"title\": \"String\",\n                   \"description\": \"String\",\n                   \"price\": \"Number\",\n                   \"bookId\": \"String\"\n               }\n              ]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Failed To Find Book Details\",\n  \"status\": 500,\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/book.js",
    "groupTitle": "book",
    "name": "GetApiV1BooksBookId"
  },
  {
    "type": "post",
    "url": "/api/v1/books/create",
    "title": "Create book",
    "version": "0.0.1",
    "group": "book",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the book. (body) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of book. (body) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>of the book. (body) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   \n  {\n\t\t\"error\": false,\n\t\t\"message\": \"Book  Created successfully\",\n\t\t\"status\": 200,\n\t\t\"data\":[\n               {\n                   \"title\": \"String\",\n                   \"price\": \"Number\",\n                   \"description\": \"String\",\n               }\n              ]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Failed to create new Issue\",\n  \"status\": 500,\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/book.js",
    "groupTitle": "book",
    "name": "PostApiV1BooksCreate"
  },
  {
    "type": "post",
    "url": "/api/v1/books/delete/:id",
    "title": "Delete book by Id",
    "version": "0.0.1",
    "group": "books",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The authToken for authentication. (Send authToken as query params)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bookId",
            "description": "<p>The bookId of the issue. (params)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   \n  {\n\t\t\"error\": false,\n\t\t\"message\": \"Successfully deleted Book\",\n\t\t\"status\": 200,\n\t\t\"data\":[\n               {\n                   \"title\": \"String\",\n                   \"description\": \"String\",\n                   \"price\": \"Number\",\n                   \"bookId\": \"String\"\n               }\n              ]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Failed To Delete Book\",\n  \"status\": 500,\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/book.js",
    "groupTitle": "books",
    "name": "PostApiV1BooksDeleteId"
  },
  {
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "Login",
    "version": "0.0.1",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   \n  {\n\t\t\"error\": false,\n\t\t\"message\": \"Login Successful\",\n\t\t\"status\": 200,\n\t\t\"data\":  {\n               \"authToken\": \"String\",\n               \"userDetails\": {\n                   \"email\": \"String\",\n                   \"username\": \"String\",\n                   \"userId\": \"String\",\n               }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Error in Login\",\n  \"status\": 500,\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "Signup",
    "group": "users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User created\",\n    \"status\": 200,\n    \"data\": {\n       \"authToken\": \"String\",\n        \"userDetails\": {\n        \"email\": \"String\",\n        \"username\": \"String\",\n        \"userId\": \"String\"\n   }\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Failed To Create User\",\n  \"status\": 500,\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  }
] });
