# EcoTrack - Project Planning Document

**Student**: Niranjan  
**Project**: Internal Assessment - Full Stack Web Application  
**Subject**: Web Development / Computer Science  
**Submission Date**: [Your submission date]

---

## Project Proposal

### Problem Statement
Many individuals want to live more sustainably but lack tools to track and visualize their environmental impact. Existing solutions are either too complex or don't provide adequate motivation through gamification.

### Solution
EcoTrack - A user-friendly web application that allows users to:
- Log daily eco-friendly activities
- Track progress with visual analytics
- Earn points and badges for motivation
- Monitor personal environmental impact over time

---

## Technical Specifications

### Architecture
```
Client (React) ←→ REST API (Express) ←→ Database (MongoDB)
```

### Database Schema

**Users Collection:**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  totalScore: Number (default: 0),
  createdAt: Date
}
```

**Actions Collection:**
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  category: String (enum),
  points: Number,
  note: String (optional),
  date: Date (default: now)
}
```

### API Endpoints Design

**Authentication:**
- `POST /api/auth/signup` - New user registration
- `POST /api/auth/login` - User authentication

**Actions:**
- `GET /api/actions` - Fetch user's actions
- `POST /api/actions` - Create new action
- `GET /api/actions/stats` - Get analytics data

---

## User Interface Design

### Pages Structure
1. **Landing/Login** - Authentication entry point
2. **Signup** - New user registration
3. **Dashboard** - Main analytics view
4. **Add Action** - Form to log new activities

### Design Elements
- Dark theme for modern look
- Glassmorphism for depth
- Green accents for eco theme
- Responsive grid layouts
- Smooth animations

---

## Feature Breakdown

### Core Features (Must Have)
✓ User authentication system
✓ Action logging functionality
✓ Point calculation system
✓ Dashboard with statistics
✓ Data persistence

### Enhanced Features (Should Have)
✓ Data visualization (charts)
✓ Badge/level system
✓ Progress tracking
✓ Responsive design
✓ Search functionality

### Future Features (Nice to Have)
○ Social sharing
○ Leaderboards
○ Team challenges
○ Mobile app

---

## Development Timeline

**Week 1: Setup & Backend**
- [x] Initialize project structure
- [x] Set up MongoDB database
- [x] Create Express server
- [x] Implement authentication
- [x] Build API endpoints

**Week 2: Frontend Foundation**
- [x] Create React app
- [x] Build authentication pages
- [x] Set up routing
- [x] Connect to backend API

**Week 3: Core Features**
- [x] Build dashboard layout
- [x] Implement action logging
- [x] Add data visualization
- [x] Create statistics display

**Week 4: Enhancement**
- [x] Expand action categories
- [x] Improve UI design
- [x] Add gamification
- [x] Implement responsive design

**Week 5: Polish & Testing**
- [x] Bug fixes
- [x] Performance optimization
- [x] Documentation
- [x] Final testing

---

## Technical Challenges & Solutions

### Challenge 1: MongoDB Connection
**Problem**: Difficulty connecting to MongoDB Atlas  
**Solution**: Configured IP whitelist and connection string properly

### Challenge 2: State Management
**Problem**: Sharing user data across components  
**Solution**: Implemented React Context API

### Challenge 3: Chart Responsiveness
**Problem**: Charts not responsive on mobile  
**Solution**: Used ResponsiveContainer from Recharts

### Challenge 4: Action Categories
**Problem**: Limited action types seemed unrealistic  
**Solution**: Researched and expanded to 55+ actions

### Challenge 5: UI Consistency
**Problem**: Mixed design patterns looked unprofessional  
**Solution**: Created cohesive design system with consistent spacing/colors

---

## Testing Strategy

### Unit Testing
- User model validation
- Action creation logic
- Points calculation
- Badge assignment

### Integration Testing
- API endpoint responses
- Database operations
- Authentication flow

### User Testing
- Form validation
- Error handling
- Navigation flow
- Mobile responsiveness

---

## Security Considerations

1. **Password Security**
   - Implemented bcryptjs hashing
   - Never store plain text passwords

2. **Authentication**
   - JWT token-based auth
   - Tokens expire after 7 days
   - Protected routes with middleware

3. **Data Validation**
   - Input sanitization
   - Schema validation with Mongoose
   - Error handling for invalid data

4. **CORS Configuration**
   - Configured for frontend domain
   - Prevents unauthorized access

---

## Performance Optimizations

1. **Database**
   - Indexed email field for faster lookups
   - Limited action queries to 100 items
   - Aggregation for statistics

2. **Frontend**
   - Lazy loading for charts
   - Optimized re-renders with useEffect
   - Cached API responses

3. **Backend**
   - Async/await for non-blocking operations
   - Error catching for stability
   - Atomic updates for scores

---

## Learning Outcomes

### Technical Skills Gained
- Full-stack application development
- RESTful API design
- Database schema modeling
- Authentication implementation
- Data visualization
- Responsive design
- Git version control

### Soft Skills Developed
- Project planning
- Time management
- Problem-solving
- Research skills
- Documentation writing

---

## Conclusion

This project successfully demonstrates:
- Complete MERN stack implementation
- Secure user authentication
- Complex data visualization
- Modern UI/UX design
- Scalable architecture

The application provides real value by helping users track and improve their environmental impact while learning sustainable habits through gamification.

---

## References & Resources

**Documentation:**
- React Official Docs: https://react.dev
- MongoDB Manual: https://docs.mongodb.com
- Express Guide: https://expressjs.com
- Recharts Documentation: https://recharts.org

**Tutorials & Learning:**
- JWT Authentication in Node.js
- React Context API patterns
- MongoDB Atlas setup guide
- Responsive design principles

**Design Inspiration:**
- Glassmorphism UI trends
- Modern dashboard designs
- Environmental app interfaces

---

**Project Repository**: https://github.com/Niranjan070/ecotrack  
**Live Demo**: [If deployed]

---

*This document outlines the complete planning, development, and implementation process of the EcoTrack application as part of my internal assessment project.*
