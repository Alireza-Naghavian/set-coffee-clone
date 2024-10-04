# Set-Coffee clone NextJs

## See demo on vercel  [click here](https://set-coffee-clone.vercel.app/)

this is an professional fullstack clone from set-coffee website
includes 41 pages,eg:product page,single product page,
category,sorting,filter products,blogs,wishlist,JWT authentication,login page,auth with otp,userpanel,
admin panel and more...


## Using



- Nextjs v.14
- React
- Typescript
- TailwindCss
- MongoDB
- React-query
- JWT

## Features
Full-stack e-commerce website
- Allows registered users to place orders, write    product reviews,added to their wishlists, and update their account information.
- Allows registered users to login with otp or email/password.
- Allows users to use practical blogs about coffee


Admin privileges

- Allows creation and update new product, categories and manage the store .

- Allows creation and update new blog and manage them .

- Allows to track sales and growth list of website

- It is allowed to create and manage the discount code in terms of the number of times it is used and the percentage of the discount

- Enables easy product discovery and sorting based on user preferences.

- Monitoring users ,their comments and tickets (answer comment tickets and chat with users)


## Installation

1.Clone or download the repository by running the following command in your terminal:

```bash
git clone https://github.com/Alireza-Naghavian/set-coffee-clone.git
```
2.Install the project dependencies using either npm or yarn:

```bash
npm install
```
or
```bash
yarn
```

3.create .env file in the root directory of the project and Define the required environment variables  . The following variables are necessary:

    
```bash
RefreshTokenSecreKey = your refreshToken key;
AccessTokenSecretKey=  your accessToken key;
LIMO_API_KEY= LIMO_API_KEY for otp auth;
NEXT_PUBLIC_ENCRYPT_TOKEN_SECRET_KEY = TOKEN_SECRET_KEY  for encrypt userBasket;
MONGODB_URI=your cloud db key for mongoDb;
NODE_ENV=development || production;
NEXT_PUBLIC_API_URL=prodction url ;
NEXT_PUBLIC_TEXT_EDITOR =TextEditor key;
```


4.Install MongoDB and MongoDB Compass on your local machine. If you already have a MongoDB instance set up, skip this step.


5.Create a new database in MongoDB Compass and create the required collections with the same names as the downloaded JSON files. Then, import the data from the downloaded files into the corresponding collections.

## Screenshots

![Screenshot 2024-09-07 104339](https://github.com/user-attachments/assets/1c32c262-cb59-45ac-a4f0-9b679cf82158)

![Screenshot 2024-09-07 104339](https://github.com/user-attachments/assets/3919fac9-a364-49c5-9d83-365295cafbb1)

<h2>category page</h2>
  
![Screenshot 2024-09-07 104339](https://github.com/user-attachments/assets/b0dce929-17ac-4a52-a75c-de7ded95347d)




<h2>product page</h2>

![Screenshot 2024-09-07 104339](https://github.com/user-attachments/assets/9bccf4cd-122c-4c8b-8c42-20d9e0ebf035)



<h2>user panel</h2>

![Screenshot 2024-09-07 104339](https://github.com/user-attachments/assets/563ed4b4-7927-4ed0-8050-f48698ab69a7)


<h2>admin panel</h2>

![Screenshot 2024-09-07 104339](https://github.com/user-attachments/assets/d9fb77cc-ce72-42bb-bb79-2a094873e902)






