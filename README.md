# Digital Excellence Portfolio

A modern, performant portfolio website built with Next.js 13, featuring a booking system, contact forms, and dynamic content sections.

## 🚀 Tech Stack

- **Framework:** Next.js 13 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Form Handling:** React Hook Form + Zod
- **Icons:** Lucide React
- **Calendar:** React Day Picker
- **Email:** Resend
- **Calendar Integration:** Google Calendar API

## 📁 Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── book-meeting/      # Meeting booking endpoint
│   │   └── send-email/           # Contact form endpoint
│   ├── work/                  # Work/portfolio pages
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── ContactAndBooking.tsx  # Contact & booking section
│   ├── Footer.tsx            # Footer component
│   ├── Hero.tsx              # Hero section
│   ├── MvpProcess.tsx        # MVP process section
│   ├── Navigation.tsx        # Navigation bar
│   ├── Technologies.tsx      # Technologies section
│   └── Timeline.tsx          # Timeline section
├── lib/
│   ├── utils.ts              # Utility functions
│   └── work.ts               # Work/portfolio data
└── public/
    └── fonts/                # Custom fonts
```

## 🔑 Key Features

1. **Dynamic Portfolio Showcase**

   - Responsive grid layout
   - Project details pages
   - Custom animations

2. **Meeting Booking System**

   - Google Calendar integration
   - Email confirmations

3. **Contact Form**

   - Form validation
   - Email notifications
   - Success/error handling

4. **Interactive Sections**
   - Animated MVP process
   - Technology expertise showcase
   - Professional timeline
   - Responsive navigation

## 🛠️ Development

### Prerequisites

```bash
Node.js 20+ (LTS recommended)
```

### Environment Variables

Create a `.env` file with:

```env
NEXT_SENDGRID_API_KEY=""
NEXT_EMAIL_RECEIVER=""
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

## 📱 Responsive Design

The site is fully responsive with breakpoints:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Design System

### Colors

- Primary: `#21cd99`
- Text: Various gray shades
- Backgrounds: White and gray scales

### Typography

- Font: Inter (variable font)
- Headings: Bold weights
- Body: Regular weight

### Components

- Buttons
- Cards
- Forms
- Navigation
- Modal dialogs
- Calendar picker
- Progress indicators

## 🔒 Security

- Form validation with Zod
- API route protection
- Secure calendar integration
- Environment variable protection

## 📈 Performance

- Static page generation
- Image optimization
- Component-level code splitting
- Optimized animations
- Lazy loading

## 📦 Third-party Integrations

- Google Calendar API
- Resend for emails
- Framer Motion for animations
- Day Picker for calendar

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.
