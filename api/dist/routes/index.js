"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET home page. */
router.get('/', function (req, res) {
    try {
        res.status(200).json({ userId: "1", userName: "index" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.get('/sample', function (req, res) {
    try {
        res.status(200).json({ userId: "test", userName: "sample" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.default = router;
