# Tanvir Foundation

A comprehensive platform to facilitate post-disaster relief efforts by centralizing donation management. Built with React, Redux, RTK Query, and React Router DOM, this project allows users to create, view, and manage donations while fostering transparency and engagement through donor testimonials, galleries, and other features.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Key Routes](#key-routes)
- [Contributing](#contributing)
- [License](#license)

## Features

### Public Routes
- **Home / Landing Page**: A homepage with a banner section, donation cards, testimonials, a carousel gallery, and mission information.
- **All Donations Page**: A grid view of donation posts.
- **Donation Detail Page**: Detailed view of a specific donation post, including an image, title, category, description, and donation amount.
- **Login / Register Pages**: Authentication pages for user login and account creation.

### Private Routes
- **Dashboard**: User-specific dashboard with:
  - **Pie Chart Visualization** of donation statistics.
  - **All Donation Posts Page**: Table view with options to edit or delete donation posts.
  - **Create Donation Post Page**: Form-based interface for creating new donation posts.

### Additional Features
- **Donation Cards**: Image, title, category, and amount for each donation post.
- **Donor Testimonials**: A slider section featuring donor feedback.
- **Responsive Design**: Mobile-first design for accessibility.
- **Framer Motion Animations**: 3-4 animations to enhance user experience.

## Technology Stack
- **Frontend**: React, Redux, RTK Query, React Router DOM, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **State Management**: Redux
- **API**: REST APIs with RTK Query for efficient data fetching
- **Form Handling**: React Hook Form
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Installation

To get started, clone the repository and install dependencies.

```bash
git clone https://github.com/your-username/disaster-relief-donation-platform.git
cd disaster-relief-donation-platform
npm install
