
# Goober

![Screenshot 2024-01-23 at 22 59 46](https://github.com/lucas-felinto/goober/assets/62717182/88be88f9-52b7-4cb9-af6e-ad514b89154b)

Goober is an ride-sharing web application, designed as a minimum viable product (MVP) that closely emulates real-world ride-sharing services. This project was built as a full-stack solution, including a front-end user interface, back-end API, real-time data handling, and a database.

## Running Live
[Live app deployed at Vercel](https://goober-6oj7.vercel.app/)

## Running Locally

```bash
  cp .env.example .env
  pnpm install
  pnpm run dev
```
## High-level Architecture
![Novo mural](https://github.com/lucas-felinto/goober/assets/62717182/747a5f0b-c6be-47a9-91dc-c035ea263dba)


## Technologies
- **Framework**: Built on the [T3 Stack](https://create.t3.gg/) stack for efficient full-stack development.
- **Real-Time Data**: Supabase client for real-time data management.
- **Database**: Supabase using Postgresql and Prisma for database operations.
- **Geolocation Service**: Google Maps API for geolocation services.
- **State Management**: React Query for efficient state syncing with backend data.
- **UI Components**: Tailwind CSS with some AI-generated components from [Vercel v0](https://v0.dev/).
- **Deployment**: Vercel for hosting the application.


## Learnings

- ### Challenges Faced: 
  - **UI Handling:** Managing ride status with numerous possible statuses 
  - **Potential Backend Over-Engineering:** There was a tendency to overthink solutions, potentially leading to more complex implementations than necessary.
- ### Key Learnings: 
  - **Google Maps API**: Geolocation and routing functionalities
  - **Supabase**: Explored the power and versatility of Supabase, particularly its real-time capabilities, enhancing the app functionalities.
  - **Tailwind CSS**: Keeping clean and responsive UI
- ### Points of Pride
  - **Clean and minimalist UI:** User-friendly interface
  - **Abstraction levels:** Facilitating code reusability and reducing redundancy
  - **First real-time application:** Successfully ventured into the realm of real-time applications
- ### Areas for Improvement
    - **Error Handling:** Handler better possibles errors
    - **Post-Ride UI Enhancement:** Lack of UI post complete ride
    - **State Management Complexity:** Faced challenges in managing the state, especially in rider UI with Maps Location API calls, indicating a need for better state management practices.
- ### Development Time
    - **Execution:** From initial design and technologies studies to the first live deploy, the project was completed within approximately 24 hours total

## Technical Decisions
- **Database Mocking and User Switching**: Implemented mock data for riders and drivers, enabling dynamic user profile switchin.
- **UI/UX Design with Vercel v0**: Chose AI tool [Vercel v0](https://v0.dev/) for rapid UI design. This tool significantly expedited the design process, allowing to focus on functionality
- **Integration of Supabase with Prisma**: Combined Supabase for real-time updates and Prisma for ORM,

