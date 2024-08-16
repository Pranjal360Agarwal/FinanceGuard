import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Get the directory name of the current module
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Catch all other routes and return the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));