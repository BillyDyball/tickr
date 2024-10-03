# Tickr

Tickr is a cryptocurrency tracking application that provides real-time and historical data for various cryptocurrencies. The application consists of a backend API built with ASP.NET Core and a frontend built with React and TypeScript.

## Table of Contents

- Technologies
- Setup
  - Backend
  - Frontend
- Usage
- Contributing
- License

## Technologies

### Backend

- ASP.NET Core
- Redis
- Signalr (WebSockets)

### Frontend

- Vite
- React
- Radix Ui
- Axios

## Setup

### Backend

1. **Install .NET SDK**: Ensure you have the .NET SDK installed. You can download it from [here](https://dotnet.microsoft.com/download).

2. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/tickr.git
   cd tickr
   ```

3. **Set up user secrets**:

   ```sh
   dotnet user-secrets set ConnectionString <YOUR_CONNECTION_STRING_HERE>
   dotnet user-secrets set CryptoKey <YOUR_KEY_HERE>
   ```

4. **Run the backend**:
   ```sh
   cd backend
   dotnet run
   ```

### Frontend

1. **Install Node.js**: Ensure you have Node.js installed. You can download it from [here](https://nodejs.org/).

2. **Navigate to the frontend directory**:

   ```sh
   cd frontend
   ```

3. **Install dependencies**:

   ```sh
   npm install
   ```

4. **Run the frontend**:
   ```sh
   npm run dev
   ```

## Usage

### Backend

- **Launch API**:

  ```sh
  dotnet run --launch-profile https
  ```

- **Launch API with HTTPS**:
  ```sh
  dotnet run --launch-profile https
  ```

### Frontend

- **Start development server**:

  ```sh
  npm run dev
  ```

- **Build for production**:
  ```sh
  npm run build
  ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
