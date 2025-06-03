
# LaptopWise - AI-Powered Laptop Price Estimator

LaptopWise is a web application designed to help users estimate the market price of laptops based on their specifications. It leverages a custom machine learning model for prediction and an AI-driven validation system to ensure the coherency of the entered specs.

## Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Key Components](#key-components)
- [Attribution](#attribution)

## Features

- **AI-Powered Price Prediction**: Utilizes a custom-trained machine learning model to predict laptop prices.
- **Detailed Specification Input**: A comprehensive form allows users to input various laptop specifications, including company, type, OS, screen details, CPU, GPU, RAM, storage, and more.
- **AI-Driven Input Validation**: Before predicting the price, an AI model (using Genkit) validates the entered specifications for logical consistency (e.g., an Apple laptop cannot run Windows).
- **Market Insights & FAQs**: Provides users with insights into factors affecting laptop prices and answers frequently asked questions.
- **Responsive Design**: User interface adapted for various screen sizes.
- **Modern UI/UX**: Built with ShadCN UI components and Tailwind CSS for a clean and modern look.

## How It Works

The user interacts with the application through a simple workflow:

1.  **Enter Specs**: The user fills out a detailed form with the laptop's specifications.
2.  **AI Validation**: The submitted specifications are first validated by an AI flow (Genkit) to check for inconsistencies or illogical combinations.
3.  **Get Estimate**: If the specs are valid, another flow calls an external API (your custom ML model) to get the price prediction.
4.  **View Result**: The estimated price is displayed to the user in INR (₹).
5.  **Gain Insights**: The user can browse a dedicated section for insights into laptop pricing and FAQs.

## Tech Stack

| Category         | Technology                                       |
| ---------------- | ------------------------------------------------ |
| **Frontend**     | Next.js (App Router), React, TypeScript          |
| **UI**           | ShadCN UI, Tailwind CSS                          |
| **AI Integration** | Genkit (for AI flows and LLM interaction)      |
| **ML Model API** | Custom Python-based model (deployed separately) |
| **Styling**      | Tailwind CSS, CSS Variables                      |
| **Fonts**        | Geist Sans, Geist Mono                           |

## Project Structure

A brief overview of the key directories:

-   `src/app/`: Next.js pages (using App Router) and root layout.
-   `src/components/`:
    -   `layout/`: Main layout components (Navbar, Footer).
    -   `sections/`: Components for different sections of the homepage (Hero, HowItWorks, Prediction, Insights).
    -   `ui/`: ShadCN UI components.
    -   Other reusable presentational components.
-   `src/ai/`:
    -   `flows/`: Genkit flows for AI-driven logic (e.g., `validate-laptop-specs.ts`, `predict-laptop-price-flow.ts`).
    -   `genkit.ts`: Genkit initialization and configuration.
-   `src/lib/`: Utility functions (`utils.ts`) and constants (`constants.ts`).
-   `src/hooks/`: Custom React hooks (e.g., `useToast.ts`, `useScrollTo.ts`).
-   `public/`: Static assets like images.

## Getting Started

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project. You might need to add API keys or other configuration details, especially for Genkit and Google AI services if used directly.
    ```env
    # Example for Google AI (if Genkit uses it)
    # GOOGLE_API_KEY=your_google_ai_api_key
    ```
    The application's Genkit setup (`src/ai/genkit.ts`) uses `googleAI()`. Ensure you have the necessary credentials or environment variables set up for it to function correctly (e.g., `GOOGLE_API_KEY` if using Gemini models).

### Running the Application

1.  **Start the Next.js development server:**
    ```bash
    npm run dev
    ```
    This will typically start the application on `http://localhost:9002`.

2.  **Start the Genkit development server (in a separate terminal):**
    Genkit flows are often run with their own development server.
    ```bash
    npm run genkit:dev
    # or for auto-reloading on changes
    npm run genkit:watch
    ```
    This allows the Next.js application to call the Genkit flows.

## Key Components

-   **Prediction Form (`src/components/PredictionForm.tsx`)**:
    The core interface for users to input laptop specifications. Uses `react-hook-form` for form handling and `zod` for schema validation.

-   **Genkit Flows (`src/ai/flows/`)**:
    -   `validate-laptop-specs.ts`: This flow takes the user-provided laptop specs and uses an LLM to validate if they are logical and error-free.
    -   `predict-laptop-price-flow.ts`: This flow takes the validated specs, prepares them into the format expected by the custom ML model, and calls the external API endpoint to get the price prediction.

-   **Custom ML Model API**:
    The price prediction itself is handled by a separately deployed machine learning model. This application interacts with it via an API.
    -   **Model Repository**: [sujeetgund/laptop-price-prediction](https://github.com/sujeetgund/laptop-price-prediction)
    -   **API Endpoint**: `https://laptop-price-prediction-api-1004676663046.us-central1.run.app/predict`

## Attribution

-   This application (LaptopWise) was developed by **Sujeet Gund**.
-   The core laptop price prediction Machine Learning model was also developed by **Sujeet Gund**.
    -   Model Source: [sujeetgund/laptop-price-prediction](https://github.com/sujeetgund/laptop-price-prediction)

---

*This README was generated with assistance from an AI coding partner.*
