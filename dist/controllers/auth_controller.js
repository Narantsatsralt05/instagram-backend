"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const dotenv = __importStar(require("dotenv"));
const models_1 = require("../models");
const app = (0, express_1.default)();
dotenv.config();
const jwtSecret = process.env.JWT_SECRET || "";
const saltRounds = Number(process.env.SALT_ROUNDS);
app.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, fullName, password, email } = req.body;
    let user = null;
    let confirmationToken = null;
    try {
        bcrypt_1.default.genSalt(saltRounds, (saltError, salt) => {
            if (saltError) {
                throw saltError;
            }
            else {
                bcrypt_1.default.hash(password, salt, (hashError, hash) => __awaiter(void 0, void 0, void 0, function* () {
                    if (hashError) {
                        throw hashError;
                    }
                    else {
                        user = new models_1.User({ username, fullName, hash, email });
                        confirmationToken = new models_1.ConfirmationTokenModel({
                            user: user._id,
                            token: crypto_1.default.randomBytes(20).toString('hex'),
                        });
                        yield user.save();
                        yield confirmationToken.save();
                        res.status(201).send({ user, token: jwt_simple_1.default.encode({ id: user._id }, jwtSecret) });
                    }
                }));
            }
        });
    }
    catch (error) {
        res.status(500).send(error);
        next(error);
    }
}));
app.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .send({ error: 'Please provide both a username/email and a password.' });
    }
    try {
        let user = yield models_1.User.findOne({
            $or: [{ username: username }, { email: email }],
        });
        console.log(user);
        if (!user || !user.password) {
            return res.status(401).send({
                error: 'The credentials you provided are incorrect, please try again.',
            });
        }
        const check = yield bcrypt_1.default.compare(password, user.password);
        console.log(user);
        if (check)
            res.json(user);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = app;
//# sourceMappingURL=auth_controller.js.map