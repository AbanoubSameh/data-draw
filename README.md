# DataDraw

DataDraw is a Next.js application to make data visualization simple and intuitive. Users can upload CSV files, specify their requirements, and have the application leverage OpenAI to generate visualizations to help make sense of the data.
![alt text](./public/Data%20draw.png)

## How It Works

1. **Upload CSV**: Start by uploading a CSV file with your dataset.
2. **Specify Requirements**: Describe the type of visualization you want using simple, natural language (e.g., "Show a bar chart of total sales by region"). The more accurate your description is, the better result you will get.
3. **AI-Powered Visualization**: DataDraw will use OpenAI's capabilities to analyze your requirements and generate a suitable chart.

## Getting Started

### Prerequisites

- Node.js and npm installed
- An OpenAI API key (required for AI integration)

### Development

1. Clone the repository:

   ```bash
   git clone https://github.com/AbanoubSameh/data-draw.git
   cd data-draw


2. run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
