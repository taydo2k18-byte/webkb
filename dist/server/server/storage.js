var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
import { users, kbSections, kbArticles } from "@shared/schema.js";
import { db } from "./db.js";
import { eq, like, or } from "drizzle-orm";
var DatabaseStorage = /** @class */ (function () {
    function DatabaseStorage() {
    }
    // User methods
    DatabaseStorage.prototype.getUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(users).where(eq(users.id, id))];
                    case 1:
                        user = (_a.sent())[0];
                        return [2 /*return*/, user || undefined];
                }
            });
        });
    };
    DatabaseStorage.prototype.getUserByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(users).where(eq(users.username, username))];
                    case 1:
                        user = (_a.sent())[0];
                        return [2 /*return*/, user || undefined];
                }
            });
        });
    };
    DatabaseStorage.prototype.createUser = function (insertUser) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insert(users).values(insertUser).returning()];
                    case 1:
                        user = (_a.sent())[0];
                        return [2 /*return*/, user];
                }
            });
        });
    };
    // KB Section methods
    DatabaseStorage.prototype.getAllSections = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(kbSections).orderBy(kbSections.order)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseStorage.prototype.getSection = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var section;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(kbSections).where(eq(kbSections.id, id))];
                    case 1:
                        section = (_a.sent())[0];
                        return [2 /*return*/, section || undefined];
                }
            });
        });
    };
    DatabaseStorage.prototype.createSection = function (section) {
        return __awaiter(this, void 0, void 0, function () {
            var newSection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insert(kbSections).values(section).returning()];
                    case 1:
                        newSection = (_a.sent())[0];
                        return [2 /*return*/, newSection];
                }
            });
        });
    };
    DatabaseStorage.prototype.updateSection = function (id, section) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedSection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .update(kbSections)
                            .set(section)
                            .where(eq(kbSections.id, id))
                            .returning()];
                    case 1:
                        updatedSection = (_a.sent())[0];
                        return [2 /*return*/, updatedSection || undefined];
                }
            });
        });
    };
    DatabaseStorage.prototype.deleteSection = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, db.delete(kbSections).where(eq(kbSections.id, id))];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, ((_a = result.rowCount) !== null && _a !== void 0 ? _a : 0) > 0];
                }
            });
        });
    };
    // KB Article methods
    DatabaseStorage.prototype.getAllArticles = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(kbArticles)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseStorage.prototype.getArticle = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(kbArticles).where(eq(kbArticles.id, id))];
                    case 1:
                        article = (_a.sent())[0];
                        return [2 /*return*/, article || undefined];
                }
            });
        });
    };
    DatabaseStorage.prototype.getArticlesBySection = function (sectionId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(kbArticles).where(eq(kbArticles.sectionId, sectionId))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseStorage.prototype.createArticle = function (article) {
        return __awaiter(this, void 0, void 0, function () {
            var newArticle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insert(kbArticles).values(article).returning()];
                    case 1:
                        newArticle = (_a.sent())[0];
                        return [2 /*return*/, newArticle];
                }
            });
        });
    };
    DatabaseStorage.prototype.updateArticle = function (id, article) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedArticle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .update(kbArticles)
                            .set(__assign(__assign({}, article), { updatedAt: new Date() }))
                            .where(eq(kbArticles.id, id))
                            .returning()];
                    case 1:
                        updatedArticle = (_a.sent())[0];
                        return [2 /*return*/, updatedArticle || undefined];
                }
            });
        });
    };
    DatabaseStorage.prototype.deleteArticle = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, db.delete(kbArticles).where(eq(kbArticles.id, id))];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, ((_a = result.rowCount) !== null && _a !== void 0 ? _a : 0) > 0];
                }
            });
        });
    };
    DatabaseStorage.prototype.searchArticles = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .select()
                            .from(kbArticles)
                            .where(or(like(kbArticles.title, "%".concat(query, "%")), like(kbArticles.content, "%".concat(query, "%"))))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return DatabaseStorage;
}());
export { DatabaseStorage };
export var storage = new DatabaseStorage();
