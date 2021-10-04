"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("../models");
const app = (0, express_1.default)();
app.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new models_1.postModel(req.body);
    try {
        yield post.save();
        res.send(post);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.get('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield models_1.postModel.find({});
    try {
        res.send(posts);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = app;
//# sourceMappingURL=post_controller.js.map