# Trinoro - Meditation & Wellness Platform

<img width="1891" height="874" alt="Screenshot 2025-07-21 160904" src="https://github.com/user-attachments/assets/f75a837d-de94-47e8-9b19-872b354ae796" />


A beautiful, feature-rich meditation and wellness application built with Next.js, featuring user authentication, streak tracking, journaling, and ambient sound mixing.

## ✨ Features

### 🧘‍♀️ **Meditation**
- **Customizable Timer**: Set your preferred meditation duration
- **Beautiful UI**: Circular progress indicator with smooth animations
- **Session Tracking**: Automatic recording of meditation sessions
- **Binaural Beats**: Advanced meditation features (coming soon)

### 🎵 **Ambient Sound Mixer**
- **Freesound Integration**: Access to thousands of ambient sounds
- **Custom Mixing**: Combine multiple sounds with individual volume control
- **Search Functionality**: Find the perfect soundscape for your session

### 📝 **Enhanced Journal**
- **Mood Tracking**: Record your emotional state with emoji indicators
- **Tag System**: Organize entries with custom tags
- **Search & Filter**: Find past entries by mood, tags, or text
- **Persistent Storage**: All entries saved to your personal database

### 🔥 **Streak Tracking**
- **Visual Calendar**: See your meditation history at a glance
- **Statistics Dashboard**: Track current streak, longest streak, total sessions
- **Progress Analytics**: Monitor your meditation journey over time
- **Achievement System**: Celebrate your milestones

### 🔐 **User Authentication**
- **Google OAuth**: Secure login with Google accounts
- **Protected Routes**: Personal data only accessible to logged-in users
- **Persistent Data**: Your progress is saved across sessions

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom gradients and animations
- **State Management**: Zustand for global state
- **Authentication**: NextAuth.js with MongoDB adapter
- **Database**: MongoDB for user data and session storage
- **Audio**: HTML5 Audio API with Freesound integration
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Google OAuth credentials
- Freesound API credentials (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trinoro
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/trinoro
   
   # NextAuth Configuration
   NEXTAUTH_SECRET=your-nextauth-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # Freesound API (optional)
   FREESOUND_CLIENT_ID=your-freesound-client-id
   FREESOUND_CLIENT_SECRET=your-freesound-client-secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── journal/       # Journal CRUD operations
│   │   ├── streak/        # Streak tracking
│   │   └── user/          # User statistics
│   ├── journal/           # Journal feature pages
│   ├── meditate/          # Meditation feature pages
│   └── streak/            # Streak tracking pages
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Database and utility functions
├── types/                 # TypeScript type definitions
└── styles/                # Global styles
```

## 🎯 Key Features Implementation

### Database Schema
- **Users**: Profile data, streak counts, meditation statistics
- **Journal Entries**: Mood, text, tags, timestamps
- **Streak Records**: Daily meditation sessions with duration tracking

### API Endpoints
- `POST /api/journal` - Create journal entries
- `GET /api/journal` - Retrieve and search entries
- `POST /api/streak` - Record meditation sessions
- `GET /api/user/stats` - Get user statistics

### Authentication Flow
1. User signs in with Google OAuth
2. User record created/updated in database
3. Session data accessible across the app
4. Protected routes ensure data privacy

## 🎨 Design Features

- **Glassmorphism**: Beautiful frosted glass effects
- **Gradient Backgrounds**: Dynamic color schemes
- **Smooth Animations**: CSS transitions and keyframes
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Complete theme support
- **Accessibility**: ARIA labels and keyboard navigation

## 🔮 Future Enhancements

- [ ] Guided meditation sessions
- [ ] Social features and community sharing
- [ ] Advanced analytics and insights
- [ ] Mobile app (PWA)
- [ ] Integration with health apps
- [ ] Custom meditation themes
- [ ] Voice-guided sessions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Freesound](https://freesound.org/) for ambient sound API
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for beautiful icons
