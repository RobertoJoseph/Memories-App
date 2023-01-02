
## Schema Design
---
- Course Schema
```javascript
import mongoose, { mongo } from "mongoose";
import Joi from "joi";

export const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0.0,
  },
  previewVideo: {
    type: String,
    required: true,
  },
  outlines: {
    type: [
      {
        outline: String,
        totalHours: Number,
        subtitles: [
          {
            subtitle: String,
            minutes: Number,
            videoUrl: String,
          },
        ],
        exercises: [
          {
            question: String,
            answers: [{ answer: String, correct: Boolean }],
          },
        ],
      },
    ],
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  instructor: {
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
    },
    name: String,
  },
  promotion: {
    discount: { type: Number, default: 0.0 },
    startDate: Date,
    endDate: Date,
  },
  // add instructor
  discount: [{ country: String, percent: Number }],
  ratings: [
    {
      corporateTraineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CorporateTrainee",
      },
      individualTraineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IndividualTrainee",
      },
      rating: Number,
    },
  ],
  reviews: [
    {
      corporateTraineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CorporateTrainee",
      },
      individualTraineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IndividualTrainee",
      },
      review: String,
    },
  ],
  numberOfTraineesEnrolled: { type: Number, default: 0 },
});

export function validateCourse(course) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    summary: Joi.string().min(3).required(),
    subject: Joi.string().min(3).required(),
    duration: Joi.number().required(),
    releaseDate: Joi.date().required(),
    language: Joi.string().required(),
    image: Joi.string().required(),
    rating: Joi.number(),
    outlines: Joi.array().required(),
    previewVideo: Joi.string().required(),
    price: Joi.number().required(),
    discount: Joi.array(),
  });
  return schema.validate(course, { allowUnknown: true });
}

const Course = mongoose.model("Course", courseSchema);

export default Course;

```

- Instructor
```javascript
import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";

const instructorSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
  },
  firstName: {
    type: String,
    minlength: 3,
  },
  lastName: {
    type: String,
    minlength: 3,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  wallet: {
    type: Number,
    default: 0,
  },

  country: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Prefer not to say"],
  },
  dateOfBirth: {
    type: Date,
  },
  phoneNumber: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  biography: {
    type: String,
    default: "No biography",
  },
  firstLogin: {
    type: Boolean,
    default: true,
  },
});

instructorSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { email: this.email, id: this._id, role: "instructor" },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  return token;
};

export function validateInstructor(user) {
  const schema = Joi.object({
    userName: Joi.string().min(5),
    password: Joi.string().required(),
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().min(10),
    dateOfBirth: Joi.date(),
    gender: Joi.string(),
    country: Joi.string(),
    wallet: Joi.number(),
  });
  return schema.validate(user);
}

const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;

```

- IndividualTrainee/Coorporate Trainee
```javascript
import mongoose from "mongoose";

import Joi from "joi";
import "dotenv/config";
import jwt from "jsonwebtoken";

const individualTraineeSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
  },
  gender: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
    minLength: 3,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  country: {
    type: String,
  },

  billingDetails: {
    masterCardNumber: String,
    expiryDate: Date,
    cvv: String,
    cardOwner: String,
  },

  dateOfBirth: {
    type: Date,
  },

  phoneNumber: {
    type: String,
  },

  university: {
    type: String,
  },

  address: {
    city: String,
    streetName: String,
    streetNumber: String,
  },
  courses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      title: {
        type: String,
        required: true,
      },
      summary: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      releaseDate: {
        type: Date,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        default: 0.0,
      },
      instructor: {
        instructorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Instructor",
        },
        name: String,
      },
      grades: [
        {
          score: Number,
          total: Number,
          exerciseId: mongoose.Schema.Types.ObjectId,
        },
      ],
      notes: [
        {
          subtitleId: mongoose.Schema.Types.ObjectId,
          note: [{ value: String, time: Number }],
        },
      ],
      seenContent: [
        { duration: Number, contentId: mongoose.Schema.Types.ObjectId },
      ],
    },
  ],
});

individualTraineeSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { email: this.email, id: this._id, role: "individualTrainee" },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  return token;
};

export function validate(individualTrainee) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().min(10),
    dateOfBirth: Joi.date().required(),
    password: Joi.string().required(),
    address: Joi.object(),
    country: Joi.string(),
    university: Joi.string(),
    billingDetails: Joi.object({
      masterCardNumber: Joi.string().required(),
      expiryDate: Joi.date().required(),
      cvv: Joi.string().required(),
    }),
  });
  return schema.validate(individualTrainee);
}

const IndividualTrainee = mongoose.model(
  "IndividualTrainee",
  individualTraineeSchema
);
export default IndividualTrainee;

```


## END POINTS
---

Our Api is divided into 6 parts

### Users Router 
#### Route : `/users`


#### Add User
- Route : `/signup`
- Request Type : `post`
- Request Body : 
 ```javascript
  {
  firstName: 'Roberto',
  lastName: 'Joseph',
  email: 'robertojoseph@gmail.com',
  password: 'pass12345',
  gender:"Male",
  
 }
 ```
 
- Response Body:
 ```javascript
  {
  result: {firstName:"Roberto", lastName:"Joseph",email:"robertojoseph@gmail.com",password:"hashedPassword",gender:"Male"}, 
  token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJz
  dWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  type:"individualTrainee"
  }
  ```
#### Login User
- Route: `/signin`
- Request Type: `post`
- Request Body :
 ```javascript
 {
 email: "robertojoseph@gmail.com",
 password:"pass123"
 }
```
- Response Body:
 ```javascript
 {
 result: {
 firstName:"Roberto",
 lastName:"Joseph",
 email:"robertojoseph@gmail.com",
 password:"hashedPassword",
 gender:"Male"
          },
 token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJz
  dWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
 type:"individualTrainee"
 }
 ```

#### Forgot Password
- Route: `/sendEmail`
- Request Type: `post`
- Request Body :
 ```javascript
 {
 email: "robertojoseph@gmail.com",

 }
```


### Trainee Router 
#### Route : `/individualTrainee`


#### PayCourse 
- Route: `/payCoyrse`
- Request Type: `post`
- Request Body: 
```javascript 
       {courses, instructorId:"232325455626177171", traineeId:"232325455626177171"}
```
- Respond Body: 
```javascript
  {url: "sessionURL"}
```

#### Enroll Course
- Route: `/enrollCourse`
- Request Type: `post`
- Request Body:
```javascript
{id:"63b19f456422dcc9bbca8c35", courseId:"63b19f456422dcc9bbca8c35"}
```

#### Add Grade
- Route: `/addGrade`
- Request Type: `post`
- Request Query:
```javascript
{individualTraineeId, courseId, outlineId, score"40", total:"30"}
```

#### Get Notes
- Route: `/getNotes`
- Request Type: `get`
- Request Query:
```javascript
{ userId, courseId, lectureId }
```


#### Create PDF
- Route: `/createPdf`
- Request Type: `post`
- Request Body: 
```javascript
{notes: "Array of notes"}
```

### Instructor Router 
#### Route : `/instructor`

#### Add Course
- Route: `/addNewCourse/:id`
- Request Type: `post`
- Request Param: `id`
- Request Body:
```javascript
  {
    title,
    summary,
    subject,
    duration,
    releaseDate,
    language,
    image,
    rating,
    previewVideo,
    outline: []
    excercises:[]
    price,
}
```

#### Filter by subject and price
- Route: `filterBySubjectAndPrice/:id`
- Request Type: `get`
- Request param:
```javascript
{ subject: "ComputerScience", minPriceL: 40, maxPrice: 80 }
```

#### Update Information
- Route :`/updateInformation/:id`
- Request Type: `post`
- Request param:
```javascript
{ firstName, lastName, country, phoneNumber, biography }
```


#### Get all instructor courses
- Route: `getAllInstructorCourses/:id`
- Request Type: `get`
- Request param:
```javascript
{id:"63b19f456422dcc9bbca8c35"}
```

#### Define Promotion
- Route: `/definePromotion`
- Request Type: `post`
- Request Body:
```javascript
 { courseId, discount, startDate: "Date Value" , endDate: "Date Value" }
```


### Course Router 
#### Route : `/course`

#### Get Course
- Route: `/getCourse`
- Request Type: `get`
- Request body: 
```javsscript
{courseId:"63b19f456422dcc9bbca8c35"}
```

#### Filter All Courses
- Route: `/filterAllCourses`
- Request Type: `get`
- Request Query:
```javascript
{ subject: "ComputerScience", price: 40, rating: 80 }
```

#### Add Rating 
- Route: `/addRating`
- Request Type: `post`
- Request Query:
```javascript
{courseId, corporateTraineeId, individualTraineeId, rating}
```

#### Request Refund
- Route: `/requestRefund`
- Request Type: `post`
- Request Query:
```javascript
 {
    course,
    type,
    individualTraineeId,
    coorporateTraineeId,
    firstName,
    lastName,
    email,
    refundReason,
    refundType,
  }
```
