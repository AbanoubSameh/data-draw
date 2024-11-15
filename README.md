
# DataDraw

DataDraw is a Next.js application to make data visualization simple and intuitive. Users can upload CSV file, specify their requirements, and have the application leverage OpenAI to generate visualizations to help make sense of the data.

![alt text](./public/Data%20draw.png)

## How It Works

1. **Upload CSV**: Begin by uploading a CSV file containing your dataset.
2. **Specify Visualization Requirements**: Provide a description of the desired chart (e.g., "Show a pie chart of customer demographics by age"). The clearer your description, the more accurate the result.
3. **Generate Visualization**: DataDraw utilizes OpenAI's capabilities to interpret your instructions and generate the appropriate chart for your data.

## Getting Started

### Prerequisites

- **Node.js** and **npm** (or an alternative package manager) installed
- **OpenAI API key** (necessary for AI functionality)

### Installation and Development Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/AbanoubSameh/data-draw.git
   cd data-draw
   ```

2. **Install Dependencies**:

   Choose your preferred package manager and install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the Development Server**:

   Start the server using your package manager:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

## Configuration

To integrate OpenAI's capabilities, you need to set up your OpenAI API key:

1. Create a `.env` file in the root directory of the project.
2. Add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with your actual OpenAI API key.
