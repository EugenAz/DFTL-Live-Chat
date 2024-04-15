"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Middleware to log the request
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});
app.get('/meeting', (req, res) => {
    const filePath = path_1.default.join('fixtures', 'meetings.json');
    console.log('filePath', filePath);
    fs_1.default.readFile(filePath, (err, data) => {
        if (err) {
            res.status(404).send('File not found');
            return;
        }
        res.header('Content-Type', 'application/json');
        res.send(data);
    });
});
app.get('/meeting/:id', (req, res) => {
    const filePath = path_1.default.join('fixtures', `${req.params.id}.json`);
    fs_1.default.readFile(filePath, (err, data) => {
        if (err) {
            res.status(404).send('File not found');
            return;
        }
        res.header('Content-Type', 'application/json');
        res.send(data);
    });
});
app.listen(PORT, () => {
    console.log(`meeting-service running on http://localhost:${PORT}`);
});
