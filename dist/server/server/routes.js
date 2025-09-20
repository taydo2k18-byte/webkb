var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { createServer } from "http";
import { storage } from "./storage.js";
import { insertKbSectionSchema, insertKbArticleSchema } from "@shared/schema.js";
import { z } from "zod";
export function registerRoutes(app) {
    return __awaiter(this, void 0, void 0, function () {
        var httpServer;
        var _this = this;
        return __generator(this, function (_a) {
            // Knowledge Base Sections API
            app.get("/api/sections", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var sections, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage.getAllSections()];
                        case 1:
                            sections = _a.sent();
                            res.json(sections);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error("Error fetching sections:", error_1);
                            res.status(500).json({ error: "Failed to fetch sections" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/sections/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var section, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage.getSection(req.params.id)];
                        case 1:
                            section = _a.sent();
                            if (!section) {
                                return [2 /*return*/, res.status(404).json({ error: "Section not found" })];
                            }
                            res.json(section);
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            console.error("Error fetching section:", error_2);
                            res.status(500).json({ error: "Failed to fetch section" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/sections", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var validatedData, section, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            validatedData = insertKbSectionSchema.parse(req.body);
                            return [4 /*yield*/, storage.createSection(validatedData)];
                        case 1:
                            section = _a.sent();
                            res.status(201).json(section);
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            if (error_3 instanceof z.ZodError) {
                                return [2 /*return*/, res.status(400).json({ error: "Invalid section data", details: error_3.errors })];
                            }
                            console.error("Error creating section:", error_3);
                            res.status(500).json({ error: "Failed to create section" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.put("/api/sections/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var partialData, section, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            partialData = insertKbSectionSchema.partial().parse(req.body);
                            return [4 /*yield*/, storage.updateSection(req.params.id, partialData)];
                        case 1:
                            section = _a.sent();
                            if (!section) {
                                return [2 /*return*/, res.status(404).json({ error: "Section not found" })];
                            }
                            res.json(section);
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            if (error_4 instanceof z.ZodError) {
                                return [2 /*return*/, res.status(400).json({ error: "Invalid section data", details: error_4.errors })];
                            }
                            console.error("Error updating section:", error_4);
                            res.status(500).json({ error: "Failed to update section" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.delete("/api/sections/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var deleted, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage.deleteSection(req.params.id)];
                        case 1:
                            deleted = _a.sent();
                            if (!deleted) {
                                return [2 /*return*/, res.status(404).json({ error: "Section not found" })];
                            }
                            res.status(204).send();
                            return [3 /*break*/, 3];
                        case 2:
                            error_5 = _a.sent();
                            console.error("Error deleting section:", error_5);
                            res.status(500).json({ error: "Failed to delete section" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Knowledge Base Articles API
            app.get("/api/articles", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, sectionId, search, articles, error_6;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 7, , 8]);
                            _a = req.query, sectionId = _a.sectionId, search = _a.search;
                            articles = void 0;
                            if (!(search && typeof search === 'string')) return [3 /*break*/, 2];
                            return [4 /*yield*/, storage.searchArticles(search)];
                        case 1:
                            articles = _b.sent();
                            return [3 /*break*/, 6];
                        case 2:
                            if (!(sectionId && typeof sectionId === 'string')) return [3 /*break*/, 4];
                            return [4 /*yield*/, storage.getArticlesBySection(sectionId)];
                        case 3:
                            articles = _b.sent();
                            return [3 /*break*/, 6];
                        case 4: return [4 /*yield*/, storage.getAllArticles()];
                        case 5:
                            articles = _b.sent();
                            _b.label = 6;
                        case 6:
                            res.json(articles);
                            return [3 /*break*/, 8];
                        case 7:
                            error_6 = _b.sent();
                            console.error("Error fetching articles:", error_6);
                            res.status(500).json({ error: "Failed to fetch articles" });
                            return [3 /*break*/, 8];
                        case 8: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/articles/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var article, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage.getArticle(req.params.id)];
                        case 1:
                            article = _a.sent();
                            if (!article) {
                                return [2 /*return*/, res.status(404).json({ error: "Article not found" })];
                            }
                            res.json(article);
                            return [3 /*break*/, 3];
                        case 2:
                            error_7 = _a.sent();
                            console.error("Error fetching article:", error_7);
                            res.status(500).json({ error: "Failed to fetch article" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/articles", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var validatedData, article, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            validatedData = insertKbArticleSchema.parse(req.body);
                            return [4 /*yield*/, storage.createArticle(validatedData)];
                        case 1:
                            article = _a.sent();
                            res.status(201).json(article);
                            return [3 /*break*/, 3];
                        case 2:
                            error_8 = _a.sent();
                            if (error_8 instanceof z.ZodError) {
                                return [2 /*return*/, res.status(400).json({ error: "Invalid article data", details: error_8.errors })];
                            }
                            console.error("Error creating article:", error_8);
                            res.status(500).json({ error: "Failed to create article" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.put("/api/articles/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var partialData, article, error_9;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            partialData = insertKbArticleSchema.partial().parse(req.body);
                            return [4 /*yield*/, storage.updateArticle(req.params.id, partialData)];
                        case 1:
                            article = _a.sent();
                            if (!article) {
                                return [2 /*return*/, res.status(404).json({ error: "Article not found" })];
                            }
                            res.json(article);
                            return [3 /*break*/, 3];
                        case 2:
                            error_9 = _a.sent();
                            if (error_9 instanceof z.ZodError) {
                                return [2 /*return*/, res.status(400).json({ error: "Invalid article data", details: error_9.errors })];
                            }
                            console.error("Error updating article:", error_9);
                            res.status(500).json({ error: "Failed to update article" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.delete("/api/articles/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var deleted, error_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage.deleteArticle(req.params.id)];
                        case 1:
                            deleted = _a.sent();
                            if (!deleted) {
                                return [2 /*return*/, res.status(404).json({ error: "Article not found" })];
                            }
                            res.status(204).send();
                            return [3 /*break*/, 3];
                        case 2:
                            error_10 = _a.sent();
                            console.error("Error deleting article:", error_10);
                            res.status(500).json({ error: "Failed to delete article" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            httpServer = createServer(app);
            return [2 /*return*/, httpServer];
        });
    });
}
